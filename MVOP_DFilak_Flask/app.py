from flask import Flask, request, jsonify, json
import numpy as np
from pyDecision.algorithm import topsis_method, waspas_method
from flask_cors import CORS

import scipy.sparse.linalg as sc
import matplotlib.pyplot as plt
from graphviz import Digraph
from numpy import *

app = Flask(__name__)

CORS(app, origins="http://localhost:4200")  # Allow requests from Angular app at localhost:4200

def graph(scores, b):
    """ scores is the matrix with the scores, and b
    is a string describing the score
    """
    s = Digraph('Actions', node_attr = {'shape':
        'plaintext'})
    s.body.extend(['rankdir = LR'])
    x = sort(scores)
    y = argsort(scores)
    l = []
    for i in y:
        s.node('action' + str(i), '''<
        <TABLE BORDER="0" CELLBORDER="1"
            CELLSPACING="0" CELLPADDING="4">
          <TR>
            <TD COLSPAN="2" bgcolor="grey" >Action
                ''' + str(y[i] + 1) + '''</TD>
          </TR>
          <TR>
            <TD>'''+ b +'''</TD>
            <TD>''' + str(x[i]) + '''</TD>
          </TR>
        </TABLE>>''')
    k = []
    for q in range(len(scores) - 1):
        k.append(['action' + str(q + 1), 'action'
            + str(q)])
    print(k)
    s.edges(k)
    s.view()

# Plot final rank
def plot(a, b):
    """ a is the matrix with the scores, and b
    is a string describing the method
    """
    scores = a
    yaxes_list = [0.2] * size(scores, 0)
    plt.plot(yaxes_list, scores, 'ro')
    frame1 = plt.gca()
    frame1.axes.get_xaxis().set_visible(False)
    plt.axis([0, 0.7, min(scores) - 0.05,
        max(scores) + 0.05])
    plt.title(b + " results")
    plt.ylabel("Scores")
    plt.legend()
    plt.grid(True)
    z1 = []
    for i in range(size(scores, 0)):
        z1.append('   (Action ' + str(i + 1) + ')')
    z = [str(a) + b for a, b in zip(scores, z1)]
    for X, Y, Z in zip(yaxes_list, scores, z):
        plt.annotate('{}'.format(Z), xy = (X, Y),
            xytext=(10, -4), ha = 'left',
            textcoords = 'offset points')
    plt.show()


# normalized column sum method
def norm(x):
    """ x is the pairwise comparison matrix for the 
    criteria or the alternatives
    """
    k = array(sum(x, 0))
    z = array([[round(x[i, j] / k[j], 3) 
        for j in range(x.shape[1])]
        for i in range(x.shape[0])])
    return z

# geometric mean method
def geomean(x):
    """ x is the pairwise comparison matrix for the
    criteria or the alternatives
    """
    z = [1] * x.shape[0]
    for i in range(x.shape[0]):
        for j in range(x.shape[1]):
            z[i] = z[i] * x[i][j]
        z[i] = pow(z[i], (1 / x.shape[0]))
    return z

# AHP method: it calls the other functions
def ahp(PCM, PCcriteria, m, n, c):
    """ PCM is the pairwise comparison matrix for the
    alternatives,  PCcriteria is the pairwise comparison 
    matrix for the criteria, m is the number of the 
    alternatives, n is the number of the criteria, and 
    c is the method to estimate a priority vector (1 for 
    eigenvector, 2 for normalized column sum, and 3 for
    geometric mean)
    """
    # calculate the priority vector of criteria
    if c == 1: # eigenvector
        val, vec = sc.eigs(PCcriteria, k = 1, which = 'LM')
        eigcriteria = real(vec)
        w = eigcriteria / sum(eigcriteria)
        w = array(w).ravel()
    elif c == 2: # normalized column sum
        normPCcriteria = norm(PCcriteria)
        w = array(sum(normPCcriteria, 1) / n)
    else: # geometric mean
        GMcriteria = geomean(PCcriteria)
        w = GMcriteria / sum(GMcriteria)
    # calculate the local priority vectors for the 
    # alternatives
    S = []
    for i in range(n):
        if c == 1: # eigenvector
            val, vec = sc.eigs(PCM[i * m:i * m + m, 0:m],
                k = 1, which = 'LM')
            eigalter = real(vec)
            s = eigalter / sum(eigalter)
            s = array(s).ravel()
        elif c == 2: # normalized column sum
            normPCM = norm(PCM[i*m:i*m+m,0:m])
            s = array(sum(normPCM, 1) / m)
        else: # geometric mean
            GMalternatives = geomean(PCM[i*m:i*m+m,0:m])
            s = GMalternatives / sum(GMalternatives)
        S.append(s)
    S = transpose(S)

    # calculate the global priority vector for the
    # alternatives
    v = S.dot(w.T)

    return v

def calculate_topsis(weights, criterion_type, dataset):

    # Ensure the inputs are in the correct format
    if not isinstance(weights, list) or not all(isinstance(w, (int, float)) for w in weights):
        raise ValueError("Weights must be a list of numbers.")
    if not isinstance(criterion_type, list) or not all(c in ['max', 'min'] for c in criterion_type):
        raise ValueError("Criterion types must be a list of 'max' or 'min' strings.")
    if not isinstance(dataset, np.ndarray):
        raise ValueError("Dataset must be a numpy ndarray.")

    # Call the TOPSIS method
    relative_closeness = topsis_method(dataset, weights, criterion_type, graph=False, verbose=False)
    return relative_closeness

def calculate_wsm(weights, criterion_type, dataset, lambda_value):

    # Ensure the inputs are in the correct format
    if not isinstance(weights, list) or not all(isinstance(w, (int, float)) for w in weights):
        raise ValueError("Weights must be a list of numbers.")
    if not isinstance(criterion_type, list) or not all(c in ['max', 'min'] for c in criterion_type):
        raise ValueError("Criterion types must be a list of 'max' or 'min' strings.")
    if not isinstance(dataset, np.ndarray):
        raise ValueError("Dataset must be a numpy ndarray.")
    if not isinstance(lambda_value, float) or not (0 <= lambda_value <= 1):
        raise ValueError("Lambda value must be a float between 0 and 1.")
    
    wsm, wpm, waspas = waspas_method(dataset, criterion_type, weights, lambda_value, graph = False)
    rounded_wsm = []

    # WSM
    for i in range(0, wsm.shape[0]):
        rounded_wsm.append(round(wsm[i], 4))  # Append the rounded value to the list
    
    return rounded_wsm

def calculate_promethee(weights, criterion_type, dataset):
    num_alternatives, num_criteria = dataset.shape

    # Normalize dataset for maximization and minimization criterion_type
    normalized = np.zeros_like(dataset, dtype=float)
    for j in range(num_criteria):
        if criterion_type[j] == 'max':
            normalized[:, j] = (dataset[:, j] - dataset[:, j].min()) / (dataset[:, j].max() - dataset[:, j].min())
        elif criterion_type[j] == 'min':
            normalized[:, j] = (dataset[:, j].max() - dataset[:, j]) / (dataset[:, j].max() - dataset[:, j].min())
        else:
            raise ValueError("Criterion_type must be 'max' or 'min'.")

    # Calculate preference indices
    pairwise_preference = np.zeros((num_alternatives, num_alternatives))
    for i in range(num_alternatives):
        for k in range(num_alternatives):
            if i != k:
                for j in range(num_criteria):
                    pairwise_preference[i, k] += weights[j] * (normalized[i, j] - normalized[k, j])

    # Compute positive and negative flows
    positive_flows = np.sum(pairwise_preference.clip(min=0), axis=1)
    negative_flows = np.sum(pairwise_preference.clip(max=0), axis=1)

    # Compute net flows
    net_flows = positive_flows + negative_flows

    return net_flows.tolist()

@app.route('/calculate_topsis', methods=['POST'])
def calculate_topsis_endpoint():
    # Get the JSON data from the request
    data = request.get_json()

    # Extract weights, criterion_type, and dataset
    weights = data.get('weights')
    criterion_type = data.get('criterion_type')
    dataset = np.array(data.get('dataset'))

    try:
        # Calculate the TOPSIS result
        result = calculate_topsis(weights, criterion_type, dataset)
        return jsonify({"result": result.tolist()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/calculate_wsm', methods=['POST'])
def calculate_wsm_endpoint():
    # Get the JSON data from the request
    data = request.get_json()

    # Extract weights, criterion_type, and dataset
    weights = data.get('weights')
    criterion_type = data.get('criterion_type')
    dataset = np.array(data.get('dataset'))

    # Lambda ==> part of library, 0.5 is default (what we need)
    lambda_value = 0.5

    try:
        # Calculate the TOPSIS result
        result = calculate_wsm(weights, criterion_type, dataset, lambda_value)
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/calculate_promethee', methods=['POST'])
def calculate_promethee_endpoint():
    # Get the JSON data from the request
    data = request.get_json()

    # Extract weights, criterion_type, and dataset
    weights = data.get('weights')
    criterion_type = data.get('criterion_type')
    dataset = np.array(data.get('dataset'))

    try:
        # Calculate the PROMETHEE result
        result = calculate_promethee(weights, criterion_type, dataset)
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/calculate_ahp', methods=['POST'])
def calculate_ahp_endpoint():
    # Get the JSON data from the request
    data = request.get_json()

    try:

        # Extract PCcriteria
        PCcriteria = np.array(data["PCcriteria"])

        # Extract PCM matrices dynamically from alternatives_array
        alternatives_array = data["alternatives_array"]

        # Convert the matrices into numpy arrays and stack them vertically
        arrays = [np.array(alternatives_array[key]) for key in sorted(alternatives_array.keys())]

        # Stack the arrays vertically
        allPCM = np.vstack(arrays)

        # the number of the alternatives
        m = len(arrays)

        # the number of the criteria
        n = len(PCcriteria)

        # normalized sum...
        c = 2

        # call ahp method
        scores = ahp(allPCM, PCcriteria, m, n, c)

        return jsonify({"result": scores.tolist()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='localhost', debug=True)
