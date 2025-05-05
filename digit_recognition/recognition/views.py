from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.conf import settings
import numpy as np
from PIL import Image
import os
import tensorflow as tf 

class PredictDigitView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({"error": "Aucune image reçue."}, status=400)

        image = Image.open(image_file).convert("L") 
        image = image.resize((28, 28), Image.Resampling.LANCZOS)

        image_array = np.array(image).astype("float32") / 255.0
        image_array = image_array.reshape(1, 28, 28, 1)

        model_path = os.path.join(settings.BASE_DIR, 'ai/cnn_mnist_model.h5')
        model = tf.keras.models.load_model(model_path)

        prediction = model.predict(image_array)
        predicted_digit = int(np.argmax(prediction))

        return Response({"prediction": predicted_digit})
