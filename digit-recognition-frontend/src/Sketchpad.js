import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./SketchPad.css";

const SketchPad = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 280;
    canvas.height = 280;
    canvas.style.width = "280px";
    canvas.style.height = "280px";

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 15;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const predictDigit = async () => {
    const canvas = canvasRef.current;
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    const formData = new FormData();
    formData.append("image", blob, "drawing.png");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
  };

  return (
    <div className="container">
      <h1>Reconnaissance de Chiffres Manuscrits</h1>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "1px solid #000", backgroundColor: "white" }}
      />
      <div className="buttons">
        <button onClick={predictDigit}>Prédire</button>
        <button onClick={clearCanvas}>Effacer</button>
      </div>
      {prediction !== null && <h2>Prédiction : {prediction}</h2>}
    </div>
  );
};

export default SketchPad;
