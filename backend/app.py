from flask import Flask, jsonify
from flask_cors import CORS
from detect import detect_objects

app = Flask(__name__)
CORS(app)

@app.route("/detect")
def detect():
    objects = detect_objects()
    return jsonify({"objects": objects})

if __name__ == "__main__":
    app.run(debug=True)