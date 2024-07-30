from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Mock data (replace with database queries in a real application)
trainers = [
    {"id": 1, "name": "John Doe", "specialty": "Yoga", "experience": "5 years"},
    {"id": 2, "name": "Jane Smith", "specialty": "HIIT", "experience": "7 years"},
    {"id": 3, "name": "Mike Johnson", "specialty": "Pilates", "experience": "3 years"}
]

classes = [
    {"id": 1, "name": "Morning Yoga", "trainer_id": 1, "duration": "60 minutes", "level": "Beginner"},
    {"id": 2, "name": "Afternoon HIIT", "trainer_id": 2, "duration": "45 minutes", "level": "Intermediate"},
    {"id": 3, "name": "Evening Pilates", "trainer_id": 3, "duration": "60 minutes", "level": "All Levels"}
]

users = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/trainers', methods=['GET'])
def get_trainers():
    return jsonify(trainers)

@app.route('/api/classes', methods=['GET'])
def get_classes():
    return jsonify(classes)

@app.route('/api/schedule', methods=['GET'])
def get_schedule():
    # This is a simplified schedule. You might want to implement more complex logic here.
    return jsonify(classes)

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    if 'name' in data and 'email' in data:
        new_user = {
            "id": len(users) + 1,
            "name": data['name'],
            "email": data['email']
        }
        users.append(new_user)
        return jsonify({"message": "User registered successfully", "user": new_user}), 201
    return jsonify({"error": "Invalid data"}), 400

if __name__ == '__main__':
    app.run(debug=True)
