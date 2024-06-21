from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

dado = []

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': dado}
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    global dado
    
    # Recebe o número do corpo da requisição JSON
    numero = request.json.get('numero')
    
    if numero is not None:
        dado.append(numero)  # Adiciona o número à lista
        data = {'message': f'Número {numero} recebido e armazenado.'}
        return jsonify(data)
    else:
        return jsonify({'error': 'Número não fornecido.'}), 400


if __name__ == '__main__':
    app.run(debug=True)
