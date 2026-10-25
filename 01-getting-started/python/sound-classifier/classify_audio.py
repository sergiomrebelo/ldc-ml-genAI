"""
Computational Design Laboratory: Getting Started with ML (sound classifier)
Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
October 2026

Run a pretrained YAMNet sound-event classifier on an audio file.

Install: python -m pip install tensorflow tensorflow-hub soundfile
Run:     python classify_audio.py path/to/audio.wav
"""

import sys
import csv
import urllib.request
import numpy as np
import soundfile as sf
import tensorflow as tf
import tensorflow_hub as hub
from scipy.signal import resample_poly

YAMNET_URL = "https://tfhub.dev/google/yamnet/1"
LABELS_URL = "https://raw.githubusercontent.com/tensorflow/models/master/research/audioset/yamnet/yamnet_class_map.csv"

def load_class_names() -> list[str]:
    """Download and read YAMNet's official AudioSet class map."""
    with urllib.request.urlopen(LABELS_URL) as response:
        rows = csv.DictReader(response.read().decode("utf-8").splitlines())
        return [row["display_name"] for row in rows]

def main(path: str) -> None:
    waveform, sample_rate = sf.read(path, dtype="float32")
    if waveform.ndim > 1:
        waveform = waveform.mean(axis=1)
    if sample_rate != 16000:
        # tf.audio.resample is not available in every TensorFlow release.
        # scipy.signal.resample_poly performs polyphase resampling directly.
        divisor = np.gcd(sample_rate, 16000)
        waveform = resample_poly(waveform, 16000 // divisor, sample_rate // divisor).astype("float32")
    model = hub.load(YAMNET_URL)
    scores, _, _ = model(waveform)
    mean_scores = tf.reduce_mean(scores, axis=0)
    class_names = load_class_names()
    for index in tf.argsort(mean_scores, direction="DESCENDING")[:5].numpy():
        class_name = class_names[int(index)]
        print(f"{class_name:30s}  class {int(index):3d}  score {float(mean_scores[index]):.3f}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python classify_audio.py path/to/audio.wav")
    main(sys.argv[1])
