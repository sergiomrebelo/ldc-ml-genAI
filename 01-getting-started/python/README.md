# Machine Learning with Python

This folder contains two small, independent examples for exploring image and sound classification as materials for computational design. Both use pretrained models locally after downloading their model files on first use.

Examples and documentation by **Sérgio M. Rebelo**.

## Requirements

- Python 3
- One shared virtual environment for the examples in this folder, created at `01-getting-started/python/.venv`.
- Internet access on the first run to download model files and labels.

## Create a virtual environment

Create the environment once in this `python` folder. Both examples use it, so activate it before installing or running either one.

From `01-getting-started/python/`, create and activate it (skip the first command if `.venv` already exists here):

```bash
python3 -m venv .venv
source .venv/bin/activate
```

When the environment is active, its name usually appears at the start of the terminal prompt. You only need to create `.venv` once. In a later terminal session, activate it from this folder with `source .venv/bin/activate`. If your terminal is inside an example subfolder, use `source ../.venv/bin/activate` instead.

On Windows, create it from this `python` folder with `py -m venv .venv`. Activate it in PowerShell from this folder with:

```powershell
.venv\Scripts\Activate.ps1
```

From an example subfolder, use `..\.venv\Scripts\Activate.ps1` in PowerShell. In Command Prompt, activate from this folder with `.venv\Scripts\activate.bat` or from an example folder with `..\.venv\Scripts\activate.bat`. To leave the environment on macOS, Linux, PowerShell, or Command Prompt, run:

```bash
deactivate
```

## Image classification — MobileNet / ImageNet

Folder: [`image-classifier/`](image-classifier/)

The script resizes an image to 224 × 224, converts it to RGB, scales pixel values to `[0, 1]`, and runs the pretrained MobileNet V2 model from TensorFlow Hub. It prints the five highest scoring ImageNet classes with their names and softmax-normalized probabilities. On first use, TensorFlow downloads the matching ImageNet labels file as well as the model files.

The earlier values such as `9.102` were raw logits, not percentages or probabilities. The script now applies softmax, so displayed probabilities are between 0% and 100% and sum to approximately 100% across all 1,000 classes. These are model outputs, not calibrated guarantees that the prediction is correct.

From `01-getting-started/python/`, with this folder's `.venv` active:

```bash
source .venv/bin/activate
python -m pip install "setuptools<81" tensorflow tensorflow-hub pillow numpy
python image-classifier/classify_image.py image-classifier/data/example.jpg
```

Run this command while your terminal is in `01-getting-started/python/`. If the terminal is already inside `image-classifier/`, activate the shared environment with `source ../.venv/bin/activate` and run `python classify_image.py data/example.jpg`.

The `setuptools<81` pin avoids the `pkg_resources` deprecation warning emitted by TensorFlow Hub 0.16.1 and keeps `pkg_resources` available for compatibility. If you see `ModuleNotFoundError: No module named 'pkg_resources'`, the traceback may show that the system Python is being used instead of this virtual environment. Confirm that `(.venv)` appears in the prompt, then run the script using the environment's interpreter explicitly:

```bash
.venv/bin/python image-classifier/classify_image.py image-classifier/data/example.jpg
```

The included sample images are in `image-classifier/data/`.

**Design prompt:** how could labels or scores control color, scale, layout, or motion? What changes when the image has an unexpected background or contains several objects?

## Sound classification — YAMNet / AudioSet

Folder: [`sound-classifier/`](sound-classifier/)

The script loads an audio file, converts stereo to mono, resamples it to 16 kHz when needed, and runs the pretrained YAMNet sound-event model. It reports the top five AudioSet class names, indices, and scores. It downloads YAMNet's official class map from the TensorFlow Models repository on each run. Resampling uses SciPy so it works with TensorFlow releases that do not include `tf.audio.resample`.

From `01-getting-started/python/`, with this folder's `.venv` active:

```bash
source .venv/bin/activate
python -m pip install "setuptools<81" tensorflow tensorflow-hub soundfile scipy
python sound-classifier/classify_audio.py sound-classifier/data/bell.wav
```

The example audio files are in `sound-classifier/data/`: `bell.wav`, `lion.wav`, and `noise.wav`. To try another one, replace `bell.wav` in the command. You can also supply a path to another WAV file. The script converts stereo to mono and resamples as needed.

**Design prompt:** choose one detected sound category and map its score to a visual state. Compare silence, background noise, and overlapping sounds.

## Shared notes

- Each script runs inference on a supplied file; neither script records from a live camera or microphone.
- Model files are downloaded from TensorFlow Hub on first use. Some model downloads may require working SSL certificates and access to the model host.
- Model scores are outputs of the model and should not automatically be read as calibrated confidence.
- Do not commit personal recordings or identifiable images. Use images and audio with appropriate permissions.
- Related material: [Sérgio M. Rebelo's computer-vision workshop](https://github.com/sergiomrebelo/workshop-cv).
