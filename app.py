from flask import Flask, request, jsonify 
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)
# ================= DB CONNECTION =================
client = MongoClient("mongodb://localhost:27017/")#Connect to MongoDB server port 27017
db = client["taskdb"]                             #Access the "taskdb" database (will be created if it doesn't exist)
collection = db["tasks"]                          #Access the "tasks" collection within the "taskdb" database (will be created if it doesn't exist)
# ================= HELP FUNCTION =================
def serialize(task):                              #Define a helper function to convert MongoDB document
    return {
        "id": str(task["_id"]),
        "title": task["title"],
        "completed": task["completed"]
    }
# ================= APIs =================
# 🔹 GET tasks
@app.route("/tasks", methods=["GET"])           #Define a route for GET requests
def get_tasks():                                
    tasks = list(collection.find())
    return jsonify([serialize(t) for t in tasks])

# 🔹 ADD task
@app.route("/tasks", methods=["POST"])          #Define a route for POST requests to add a new task
def add_task():
    data = request.json
    new_task = {
        "title": data.get("title"),
        "completed": False
    }
    result = collection.insert_one(new_task)
    new_task["_id"] = result.inserted_id

    return jsonify(serialize(new_task))

# 🔹 UPDATE task (EDIT + TOGGLE)    
@app.route("/tasks/<id>", methods=["PUT"])       #Define a route for PUT requests to update
def update_task(id):
    data = request.json
    update_data = {}
    if "title" in data:
        update_data["title"] = data["title"]

    if "completed" in data:
        update_data["completed"] = data["completed"]

    updated = collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": update_data},
        return_document=True
    )
    return jsonify(serialize(updated))

# 🔹 DELETE task
@app.route("/tasks/<id>", methods=["DELETE"])       #Define a route for DELETE requests to delete
def delete_task(id):
    collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Deleted"})

# ================= RUN =================
if __name__ == "__main__":                          #Run the Flask application in debug mode on port 5000
    app.run(debug=True, port=5000)

#To run the server:

#1.python -m pip install flask
#2.python -m pip install flask-cors
#3.python -m pip install pymongo
#4.python -m pip install python-dotenv
#5.python app.py