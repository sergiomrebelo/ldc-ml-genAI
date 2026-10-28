# Transform Model Outputs
This folder collects browser-based machine learning (ML) examples for computational design. Each sketch maps a model output—such as a class label, hand keypoint, or object detection—to a visual property. These mappings are design choices that shape how the model's output is experienced.

## Examples

| Example | What it demonstrates | Main library/model |
| --- | --- | --- |
| [Classification to Color](classification-to-color/) | Map an image-classification label to hue and its confidence to background saturation. | p5.js, ml5.js `imageClassifier` / MobileNet |
| [Hand to Drawing](hand-to-drawing/) | Track the index-finger tip and turn its movement into a persistent drawing trail. | p5.js, ml5.js `handPose` |
| [Detection to Typography](detection-to-typography/) | Place detected object labels over the video and map bounding-box width to text size. | p5.js, ml5.js `objectDetection` / COCO-SSD |

## Libraries and references

- [ml5.js documentation](https://docs.ml5js.org/) and [official examples](https://github.com/ml5js/ml5-next-gen/tree/main/examples)
- [p5.js](https://p5js.org/)
