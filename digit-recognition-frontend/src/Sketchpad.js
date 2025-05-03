import React, { useRef, useState } from "react";
import axios from "axios";

function SketchPad() {
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState(null);

  const predictDigit = async () => {
    const canvas = canvasRef.current;
    const blob = await new Promise(resolve =>
      canvas.toBlob(resolve, "image/png")
    );
    const formData = new FormData();
    formData.append("image", blob, "drawing.png");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width="280" height="280" style={{border: "1px solid black"}} />
      <button onClick={predictDigit}>Prédire</button>
      {prediction !== null && <h2>Prédiction : {prediction}</h2>}
    </div>
  );
}

export default SketchPad;
