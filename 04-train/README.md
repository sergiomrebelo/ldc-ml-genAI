# Train and Customise Models

This folder collects examples for training or adapting ML models for computational design. Students provide labeled examples, train a model, and use its predictions as inputs for visual and interactive systems. The examples compare training a small neural network from structured data, adapting a pretrained image model, and using a model trained with [Teachable Machine](https://teachablemachine.withgoogle.com/).

## Examples

| Example | What it demonstrates | Main library/model |
| --- | --- | --- |
| [Neural Network: Color Classification](ml5-train/) | Train a neural network on RGB values and classify slider-selected colors. | ml5.js `neuralNetwork` |
| [Feature Extractor: Image Classification](ml5-fe-classifier/) | Collect webcam examples for two custom classes and train a classifier using MobileNet features. | ml5.js `featureExtractor` / MobileNet |
| [Feature Extractor: Image Regression](ml5-fe-regressor/) | Pair webcam images with a continuous slider value, train a regressor, and map its prediction to circle size. | ml5.js `featureExtractor` / MobileNet |
| [Teachable Machine: Image Classification](tm-image/) | Use an exported Teachable Machine model to classify a webcam view as an empty or occupied room. | ml5.js `imageClassifier` / Teachable Machine |

## Training Concepts

- **Feature extraction** uses a pretrained model such as MobileNet to turn an image into a compact set of visual features. The example then trains a smaller task-specific model using those features and the labels or values collected by the student. This reuses a model's learned visual representation instead of learning all image features from the beginning.
- **Training** adjusts a model's trainable parameters using examples. In the feature-extractor examples, the pretrained MobileNet provides image features while the task-specific prediction layer learns from the collected samples. In the `neuralNetwork` color example, the network learns from the supplied RGB values and labels.
- **Classification** predicts a category, such as `red-ish`, `green-ish`, or `blue-ish`. **Regression** predicts a continuous numeric value, such as a value between 0 and 1 that can control a visual parameter.
- **Epoch** is one pass through the complete training dataset. More epochs give the model more opportunities to learn from the examples, but do not guarantee better predictions; excessive training can make a model fit its training examples too closely.
- **Batch size** is the number of training examples processed before the model updates its parameters. Smaller batches make more frequent updates; larger batches process more examples per update.
- **Learning rate** controls the size of each parameter update during training. A rate that is too high can make training unstable, while one that is too low can make learning very slow. It is only set explicitly in examples that expose this option.

The predictions depend on the examples collected. Test with new inputs that were not used for training, vary the lighting and viewpoint, and note where the model is uncertain or makes mistakes. Avoid committing personal recordings or identifiable images.

## Teachable Machine

[Teachable Machine](https://teachablemachine.withgoogle.com/) can train image, sound, and pose models in the browser and export them for use in other projects. This folder currently includes an image-classification example; the same tool can also be used to train a sound classifier. See the [Teachable Machine image example](tm-image/) for the current model-loading sketch.

Other places to explore datasets and pretrained models include [Roboflow](https://roboflow.com/), and [Kaggle Models](https://www.kaggle.com/models).

The [Awesome Teachable Machine list](https://github.com/SashiDo/awesome-teachable-machine) features creative projects and code examples built with Teachable Machine.

## Libraries and References

- [ml5.js documentation](https://docs.ml5js.org/), including [`neuralNetwork`](https://docs.ml5js.org/#/reference/neural-network), [`featureExtractor`](https://docs.ml5js.org/#/reference/feature-extractor), and [Teachable Machine image classifiers](https://docs.ml5js.org/#/reference/image-classifier-tm)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- [p5.js](https://p5js.org/)
