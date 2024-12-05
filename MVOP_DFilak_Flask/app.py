from flask import Flask, request, jsonify
import numpy as np
from pyDecision.algorithm import topsis_method
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

if __name__ == '__main__':
    app.run(host='localhost', debug=True)
