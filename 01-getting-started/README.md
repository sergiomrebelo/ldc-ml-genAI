# Getting Started: Machine Learning for Computational Design

This section brings together shared setup guidance and small machine-learning (ML) examples implemented with creative coding tools. The focus is on using model outputs—labels, scores, face attributes, landmarks, and masks—as material for computational design: map them to visual parameters, compare how they behave, and question what they represent.

Course material by **Sérgio M. Rebelo**.

## Run browser examples

Browser sketches that use a camera or microphone should be served from `localhost` or HTTPS. Opening `index.html` directly as a `file://` URL may prevent device access.

From the example's folder, start a local server:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. Grant camera or microphone access only for examples that need it. Use a still image or prerecorded sound where available.

## ml5.js and TensorFlow.js

[ml5.js](https://docs.ml5js.org/) provides a higher-level JavaScript interface to selected ML models and tools for the browser, building on [TensorFlow.js](https://www.tensorflow.org/js). Use ml5.js for the introductory browser examples; use TensorFlow.js directly when an example needs lower-level model or tensor operations.

The browser classifier sketches in this section currently load the ml5.js 1.x line from the CDN (`ml5@1`). For reproducible results, pin a specific 1.x release in the `index.html`, for example:

```html
<script src="https://unpkg.com/ml5@1.4.0/dist/ml5.min.js"></script>
```

Check the [ml5.js documentation](https://docs.ml5js.org/#/reference/overview) for the API and options supported by the selected version. Avoid mixing older pre-1.0 tutorials and APIs into these sketches.

## Understand model outputs

Models return different kinds of output: labels and scores, keypoints, segmentation masks, depth maps, or bounding boxes. Inspect these outputs before mapping them into a design interaction.

**Design prompt:** what should the system do when a model is uncertain, changes its prediction rapidly, or returns no result?

## Examples by tool

- [p5.js and ml5.js](p5js/README.md) — webcam image classification with MobileNet and microphone sound classification with SpeechCommands18w.
- [Python](python/README.md) — pretrained MobileNet image classification and [YAMNet](https://github.com/tensorflow/models/tree/master/research/audioset/yamnet) sound-event classification.
- [Processing Java Mode](processing-java/README.md) — face detection with estimated age and gender labels using [Deep Vision for Processing](https://github.com/cansik/deep-vision-processing), plus MobileNet image classification via a local Python service. This folder also introduces [Weka4P](https://howieliang.github.io/Weka4P/) and the [Creative Machine library](https://jjeongin.github.io/creative-machine/).
- [TouchDesigner](touchdesigner/README.md) — a hello-world project and [MediaPipe](https://developers.google.com/edge/mediapipe/solutions/guide) components for face, hand, pose, object, image classification, and segmentation tasks.

Each tool folder has its own installation and run instructions. These are parallel implementations, not one shared runtime: each tool uses libraries and model formats suited to that environment. Start with a single input and inspect how the model output changes; then connect it to a visual property such as colour, scale, position, or motion.

## Related materials

For more specific material on computer-vision approaches, see the [workshop-cv repository](https://github.com/sergiomrebelo/workshop-cv).

