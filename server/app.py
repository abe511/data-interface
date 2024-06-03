from flask import Flask, request, jsonify
from flask_cors import CORS
from uuid import uuid4
import json


app = Flask(__name__)
CORS(app)

with open("db.json") as db_file:
  db = db_file.read()
  data = json.loads(db)


@app.route("/api/data/entities", methods=["GET"])
def get_entities():
  return jsonify(data)


@app.route("/api/data/entity", methods=["POST"])
def create_entity():
  new_entity = request.json
  new_entity["id"] = str(uuid4())
  data.append(new_entity)
  return jsonify(new_entity), 201


@app.route("/api/data/entity/<string:id>", methods=["GET"])
def get_entity(id):
  for i in range(len(data)):
    if(data[i]["id"] == id):
      return jsonify(data[i])
  return jsonify({"error": "Entity not found"}), 404


@app.route("/api/data/entity/<string:id>", methods=["PUT"])
def update_entity(id):
  item = request.json
  for i in range(len(data)):
    if(data[i]["id"] == id):
      data[i] = item
      return jsonify(item)
  return jsonify({"error": "Entity not found"}), 404


@app.route("/api/data/entity/<string:id>", methods=["DELETE"])
def remove_entity(id):
  global data
  data = [entity for entity in data if entity["id"] != id]
  return jsonify({"success": "Entity removed"})


if __name__  == "__main__":
  app.run(debug=True)
