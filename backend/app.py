from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Lista para armazenar as tarefas
tarefas = []

# Rota para listar todas as tarefas (GET)
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'message': tarefas})

# Rota para criar uma nova tarefa (POST)
@app.route('/api/data', methods=['POST'])
def create_task():
    data = request.get_json()

    if 'description' not in data:
        return jsonify({'error': 'Descrição é necessária'}), 400

    task = {
        'id': len(tarefas) + 1,
        'description': data['description']
    }

    tarefas.append(task)
    return jsonify(task), 201

# Rota para atualizar uma tarefa existente (PUT)
@app.route('/api/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()

    if 'description' not in data:
        return jsonify({'error': 'Descrição é necessária'}), 400
    
    for task in tarefas:
        if task['id'] == id:
            task['description'] = data['description']
            return jsonify(task)

    return jsonify({'error': 'Tarefa não encontrada'}), 404

# Rota para deletar uma tarefa existente (DELETE)
@app.route('/api/data/task/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tarefas
    task_to_delete = next((task for task in tarefas if task['id'] == id), None)

    if task_to_delete is None:
        return jsonify({'error': 'Tarefa não encontrada'}), 404

    tarefas = [task for task in tarefas if task['id'] != id]
    return jsonify({'message': 'Tarefa excluída com sucesso'}), 200

if __name__ == '__main__':
    app.run(debug=True)
