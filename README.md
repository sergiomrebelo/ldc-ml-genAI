# Computational Design Laboratory: Machine Learning and Generative AI

A collection of hands-on tutorials exploring machine learning (ML) and generative AI as materials for computational design. The examples use model outputs such as labels, confidence scores, keypoints, masks, and generated content to create visual, spatial, and sonic interactions.

This tutorial was developed for the Computational Design Laboratory course unit in the MSc in [Design and Multimedia](https://dm.dei.uc.pt/) at the Faculty of Sciences and Technology, University of Coimbra, Portugal.

Examples developed and compiled by Sérgio M. Rebelo, with assistance from Tiago Martins and João M. Cunha.

## Topics

1. [Getting Started](01-getting-started/README.md) — introductory classification examples in p5.js/ml5.js, Python, Processing Java Mode, and TouchDesigner.
2. [Detection and Tracking](02-detection-and-tracking/README.md) 🚧 — face, body, hand, object, and depth examples; this section is still being completed.
3. [Transform](03-transform/README.md) 🚧 — experiments mapping model outputs to visual behavior; work in progress.
4. [Train and Customize](04-train-and-customize/README.md) 🚧 — Teachable Machine and TensorFlow.js activities; work in progress.
5. [Remix](05-remix/README.md) 🚧 — prompts and starter sketches for combining techniques; work in progress.
6. [Generative AI](06-generative-ai/README.md) 🚧 — local models, ComfyUI, and generative systems; work in progress.

🚧 marks sections that are still being developed. These folders are currently excluded from version control and may not be present in repository checkouts until they are ready to publish.

## Getting started

Start with the [Getting Started guide](01-getting-started/README.md), then choose an implementation for your tool. Examples are separate projects and may have different dependencies and setup steps; follow the README inside each example folder.

## Working with model outputs

Treat model predictions as uncertain inputs to a designed system. Inspect labels, scores, and spatial outputs before mapping them to color, scale, position, movement, sound, or composition. Consider how the interaction should behave when confidence is low, predictions change quickly, or the model returns no result.

Facial-expression models classify visible patterns; their output is not reliable evidence of a person's internal emotional state. Avoid committing identifiable student images or personal recordings. Check the licenses and limitations of models, datasets, libraries, and external resources before sharing work.

## Repository guidance

- Keep examples small, runnable, and documented with their dependencies and model sources.
- Pin library versions in teaching examples where practical; avoid floating `latest` versions.
- Do not commit virtual environments, local model caches, secrets, or personal data.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md). The repository code is offered under the [MIT License](LICENSE); model weights, data, and third-party resources may have different terms.

## References

- [ml5.js](https://ml5js.org/) and [ml5.js documentation](https://docs.ml5js.org/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [MediaPipe](https://developers.google.com/edge/mediapipe)
- [Ollama](https://ollama.com/)
- [ComfyUI](https://github.com/comfyanonymous/ComfyUI)
- [Workshop CV repository](https://github.com/sergiomrebelo/workshop-cv)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
For inquiries, open an issue or contact the project maintainers at [sergiorebelo@me.com](mailto:sergiorebelo@me.com).
