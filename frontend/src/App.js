import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const detect = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://127.0.0.1:5000/detect");

      console.log("API RESPONSE:", res.data);

      setObjects(res.data.objects || []);
      setLoading(false);

    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    detect();
    const interval = setInterval(detect, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="container">
    <h1 className="title">🤖 ThinkVerse AI Assistant</h1>

    <p className="status">
      {loading ? "🔄 Detecting..." : "✅ Live Detection Running"}
    </p>

    <div className="card">
      <h2>Detected Objects</h2>

      {objects.length > 0 ? (
        objects.map((obj, index) => (
          <p key={index} className="object">🔍 {obj}</p>
        ))
      ) : (
        <p className="waiting">Waiting for detection...</p>
      )}
    </div>
  </div>
);
}

export default App;
