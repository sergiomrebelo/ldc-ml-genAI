"""Computational Design Laboratory companion service.

Author: Sérgio M. Rebelo
Related workshop: https://github.com/sergiomrebelo/workshop-cv

Tiny local HTTP service for the Processing image-classifier sketch.

Install: python -m pip install flask pillow tensorflow tensorflow-hub numpy
Run:     python classifier_service.py data/example.jpg
Then click the Processing window. This intentionally classifies a fixed image.
"""
import sys
from flask import Flask, jsonify
from PIL import Image
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub

app = Flask(__name__)
IMAGE_PATH = sys.argv[1] if len(sys.argv) > 1 else "data/example.jpg"
MODEL = hub.load("https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/5")
LABELS_PATH = tf.keras.utils.get_file(
    "ImageNetLabels.txt",
    origin="https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt",
)
with open(LABELS_PATH, encoding="utf-8") as labels_file:
    LABELS = [line.strip() for line in labels_file]

@app.get("/classify")
def classify():
    # This model expects RGB pixels in [0, 1] and returns logits for
    # 1001 classes (ImageNet's 1000 labels plus background at index 0).
    image = Image.open(IMAGE_PATH).convert("RGB").resize((224, 224))
    image_array = np.asarray(image, dtype=np.float32) / 255.0
    x = tf.convert_to_tensor(image_array[None, ...])
    logits = MODEL(x)
    probabilities = tf.nn.softmax(logits, axis=-1).numpy()[0]
    idx = int(np.argmax(probabilities))
    label = LABELS[idx] if idx < len(LABELS) else f"Unknown class {idx}"
    return jsonify(label=label, class_index=idx, score=float(probabilities[idx]))

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8765)
