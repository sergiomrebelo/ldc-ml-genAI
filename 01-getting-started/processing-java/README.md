# Machine Learning with Processing (Java Mode)

This collection introduces machine-learning examples in Processing Java Mode. The sketches explore two approaches: running pretrained vision models directly in Processing and using a local Python service to run an image classifier. They are small computational-design examples: inspect the model output, map it to a visual variable, and question what that mapping communicates.

Examples and documentation by **Sérgio M. Rebelo**. Related workshop material: [workshop-cv](https://github.com/sergiomrebelo/workshop-cv).

## Examples

### Face detection with estimated age and gender labels

Project and instructions: [`hello-world/`](hello-world/README.md)

This Processing sketch uses the [Deep Vision for Processing](https://github.com/cansik/deep-vision-processing) library to detect face regions, then run pretrained age and gender attribute classifiers on each face. It draws the detected face and displays the returned labels.

**Requirements:** Processing 4 with Java Mode, Processing Video, Deep Vision for Processing, and a webcam. Install Deep Vision through Processing's Contribution Manager or follow the library's current installation instructions. The first run downloads model files and may take longer than subsequent runs. Run `hello_world.pde` in Processing.

The sketch uses Processing Video's default camera selection instead of a Linux-specific GStreamer pipeline. If no camera starts, check OS camera permissions and select a camera supported by Processing Video.

**Interpretation:** age and gender outputs are model estimates, not verified personal attributes. The model's gender categories do not establish a person's gender identity. Test how lighting, pose, camera quality, and face position affect results, and consider whether an interaction should use these predictions at all.

Deep Vision describes its API as under development, and its face-detection-to-attribute pipeline is not fully documented. The sketch follows the library's network setup pattern and `runByDetections()` pipeline example; check it against the installed release if the API changes.

### Image classification with MobileNet

Code and service: [`image-classifier/`](image-classifier/)

The Processing sketch requests a prediction from a local Python service. The service runs a pretrained MobileNet model from TensorFlow Hub on `data/example.jpg`. It scales RGB pixel values to `[0, 1]`, converts model logits to probabilities with softmax, and maps the winning class index to the ImageNet label list.

From the `image-classifier` folder, run:

```bash
./run.sh
```

Keep the service terminal open. Then open `image_classifier.pde` in Processing and click the sketch to request a result. The script installs dependencies in a local `.venv`; the model and labels download on first run. The displayed score is the model's probability for its top class, not a guarantee that the prediction is correct.

## Processing machine-learning libraries

- **[Deep Vision](https://github.com/cansik/deep-vision-processing)** offers pretrained computer-vision networks, including face and object detection, age and gender attribute classification, pose, segmentation, and depth estimation. It is useful for applying existing vision models to images or camera input.
- **[Weka4P](https://howieliang.github.io/Weka4P/)** connects Processing with Weka and supports data collection, model training, evaluation, and interactive visualization. Its published release was tested with Processing 3.5.4; check compatibility before using it with Processing 4.
- **[Creative Machine](https://github.com/jjeongin/creative-machine)** is a Processing machine-learning library with pretrained vision examples, including object and face detection, landmarks, and pose estimation. Its GitHub README describes installation through Processing's Contribution Manager.

Deep Vision and Creative Machine focus on using pretrained vision models. Weka4P supports a data-collection, training, and evaluation workflow. Choose based on what students should explore.
