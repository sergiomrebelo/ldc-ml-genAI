# Computational Design Laboratory: Machine Learning and Generative AI

A collection of hands-on tutorials exploring machine learning (ML) and generative AI as materials for computational design. The examples use model outputs such as labels, confidence scores, keypoints, masks, and generated content to create visual, spatial, and sonic interactions. They include introductory examples, detection and tracking, transformations of model outputs, and model-training workflows.

This tutorial was developed for the Computational Design Laboratory course unit in the MSc in [Design and Multimedia](https://dm.dei.uc.pt/) at the Faculty of Sciences and Technology, University of Coimbra, Portugal.

Examples developed and compiled by Sérgio M. Rebelo, Tiago Martins and João M. Cunha.

## Topics

1. [Getting Started](01-getting-started/README.md) — setup guidance and introductory ML examples in p5.js/ml5.js, Python, Processing Java Mode, and TouchDesigner.
2. [Detection and Tracking](02-detection-and-tracking/README.md) — browser examples for body pose and segmentation, hand pose, face mesh and expression, object detection, depth estimation, image and sound classification, and sentiment analysis.
3. [Transform](03-transform/README.md) — experiments mapping model outputs to visual behavior, including color, drawing, and typography.
4. [Train and Customise](04-train/README.md) — examples of training classifiers and regressors with ml5.js, using MobileNet feature extraction, and loading an image model trained with Teachable Machine.
6. Generative AI 🚧 — local models, ComfyUI, and generative systems; **next class.**


## Getting Started

Start with the [Getting Started guide](01-getting-started/README.md), then choose an implementation for your tool. Examples are separate projects and may have different dependencies and setup steps; follow the README inside each example folder.

## Working with Model Outputs

Treat model predictions as uncertain inputs to a designed system. Inspect labels, scores, and spatial outputs before mapping them to color, scale, position, movement, sound, or composition. Consider how the interaction should behave when confidence is low, predictions change quickly, or the model returns no result.

Facial-expression models classify visible patterns; their output is not reliable evidence of a person's internal emotional state. Avoid committing identifiable student images or personal recordings. Check the licenses and limitations of models, datasets, libraries, and external resources before sharing work.

## Repository Guidance

- Keep examples small, runnable, and documented with their dependencies and model sources.
- Pin library versions in teaching examples where practical; avoid floating `latest` versions.
- Do not commit virtual environments, local model caches, secrets, or personal data.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md). The repository code is offered under the [MIT License](LICENSE); model weights, data, and third-party resources may have different terms.

## References

- [ml5.js](https://ml5js.org/) and [ml5.js documentation](https://docs.ml5js.org/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [MediaPipe](https://developers.google.com/edge/mediapipe)
<!-- 
- [Ollama](https://ollama.com/)
- [ComfyUI](https://github.com/comfyanonymous/ComfyUI)
-->
- [Workshop CV repository](https://github.com/sergiomrebelo/workshop-cv)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
For inquiries, open an issue or contact the project maintainers at [srebelo@dei.uc.com](mailto:srebelo@dei.uc.com).
