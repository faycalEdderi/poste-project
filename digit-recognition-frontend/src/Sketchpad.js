import React, { useState } from 'react';
import { SketchField } from 'react-sketch';
import axios from 'axios';

function Sketchpad() {
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = () => {
    const canvas = document.getElementById('sketch');
    const imageData = canvas.toDataURL('image/png');

    axios.post('http://127.0.0.1:8000/api/predict/', { image: imageData })
      .then(response => {
        setPrediction(response.data.prediction);
      })
      .catch(error => console.log('Erreur de prédiction:', error));
  };

  return (
    <div>
      <SketchField id="sketch" width="280" height="280" />
      <button onClick={handleSubmit}>Soumettre</button>
      {prediction && <h2>Prédiction : {prediction}</h2>}
    </div>
  );
}

export default Sketchpad;
