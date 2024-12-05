from flask import Flask, request, jsonify
import numpy as np
from pyDecision.algorithm import topsis_method, waspas_method
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins="http://localhost:4200")  # Allow requests from Angular app at localhost:4200

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

if __name__ == '__main__':
    app.run(host='localhost', debug=True)
