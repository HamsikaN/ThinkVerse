import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const detect = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://127.0.0.1:5000/detect");

      console.log("API RESPONSE:", res.data); // debug

      setObjects(res.data.objects || []);
      setLoading(false);

    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  // auto detect every 5 sec
  useEffect(() => {
    detect();
    const interval = setInterval(detect, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ThinkVerse AI Assistant</h1>

      <p>{loading ? "Detecting..." : "Live Detection Running..."}</p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        <h2>Detected Objects</h2>

        {objects.length > 0 ? (
          objects.map((obj, index) => (
            <p key={index}>🔍 {obj}</p>
          ))
        ) : (
          <p>Detecting...</p>   // ✅ no "No objects detected" bug
        )}
      </div>
    </div>
  );
}

export default App;