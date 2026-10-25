"""
Computational Design Laboratory: Getting Started with ML (image classifier)
Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
October 2026

Minimal local image classifier using TensorFlow Hub's MobileNet model.

Install: python -m pip install tensorflow tensorflow-hub pillow numpy
Run:     python classify_image.py path/to/image.jpg
"""
import sys
import numpy as np
from PIL import Image
import tensorflow as tf
import tensorflow_hub as hub

MODEL_URL = "https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/5"
LABELS_URL = "https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt"

def main(path: str) -> None:
    image = Image.open(path).convert("RGB").resize((224, 224))
    tensor = tf.convert_to_tensor(np.asarray(image), dtype=tf.float32)[None, ...] / 255.0
    model = hub.load(MODEL_URL)
    logits = model(tensor).numpy()[0]

    # TensorFlow's ImageNet labels include a background entry at index 0,
    # while this MobileNet model returns 1,000 scores for indices 0–999.
    # Offset by one when looking up the human-readable label.
    labels_path = tf.keras.utils.get_file("ImageNetLabels.txt", LABELS_URL)
    with open(labels_path, encoding="utf-8") as labels_file:
        labels = [line.strip() for line in labels_file]

    probabilities = tf.nn.softmax(logits).numpy()
    for index in probabilities.argsort()[-5:][::-1]:
        label_index = int(index) + 1
        label = labels[label_index] if label_index < len(labels) else f"Unknown label (class {index})"
        print(f"{label:30s}  class {index:4d}  probability {probabilities[index] * 100:5.1f}%")
    print("Probabilities are softmax-normalized model outputs, not calibrated guarantees of correctness.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python classify_image.py path/to/image.jpg")
    main(sys.argv[1])
