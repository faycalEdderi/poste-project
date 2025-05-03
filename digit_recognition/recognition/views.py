from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.conf import settings
import joblib
import numpy as np
from PIL import Image
import io
import os

class PredictDigitView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({"error": "Aucune image reçue."}, status=400)

        # Charger l'image
        image = Image.open(image_file).convert("L").resize((28, 28))
        image_array = np.array(image).reshape(1, -1)

        # Charger le modèle
        model_path = os.path.join(settings.BASE_DIR, 'ai/random_forest_mnist.pkl')
        model = joblib.load(model_path)

        # Prédire
        prediction = model.predict(image_array)
        return Response({"prediction": int(prediction[0])})
