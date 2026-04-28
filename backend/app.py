from flask import Flask, jsonify
from flask_cors import CORS
from detect import detect_objects
from voice import speak_text
import threading

app = Flask(__name__)
CORS(app)
def speak_async(text):
    threading.Thread(target=speak_text, args=(text,)).start()
@app.route("/detect")
def detect():
    objects = detect_objects()
    print("Detected objects:", objects)
    if objects:
        speak_async("I can see " + ", ".join(objects))
    return jsonify({"objects": objects})
if __name__ == "__main__":
    app.run(debug=True)
