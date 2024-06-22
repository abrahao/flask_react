from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Lista para armazenar as tarefas
tarefas = []

@app.route('/api/data', methods=['GET'])
def get_data():
    # Retorna todas as tarefas armazenadas
    data = {'message': tarefas}
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def create_task():
    # Obtém os dados do corpo da requisição
    data = request.get_json()
    
    # Cria uma nova tarefa com um ID único e a descrição fornecida
    task = {'id': len(tarefas) + 1, 'description': data['description']}
    
    # Adiciona a nova tarefa à lista de tarefas
    tarefas.append(task)
    
    # Retorna a nova tarefa e o status 201 (Created)
    return jsonify(task), 201

if __name__ == '__main__':
    app.run(debug=True)
