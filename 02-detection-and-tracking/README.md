# Detection and Tracking

This folder collects browser-based ML examples for computational design. Some models return locations, landmarks or masks; others assign labels to images, sounds or text. Their outputs can become inputs for visual and interactive systems, but should be interpreted as model estimates rather than facts.

## Examples

| Example | What it demonstrates | Main library/model |
| --- | --- | --- |
| [Body Pose](body-pose/) | Detect body keypoints and use their positions in a sketch. | ml5.js `bodyPose` / MoveNet |
| [Body Segmentation](body-segmentation/) | Separate a person from the background with a pixel mask. | ml5.js `bodySegmentation` |
| [Hand Pose](hand-pose/) | Track hand landmarks and finger keypoints. | ml5.js `handPose` |
| [Face Mesh](face-mesh/) | Visualize facial landmarks and geometry. | ml5.js `faceMesh` |
| [Facial Expression](facial-expression/) | Display face detections and expression-category scores. | Human 3.3.6, TensorFlow.js |
| [Object Detection](object-detection/) | Locate and label objects in the camera image. | ml5.js `objectDetector` / COCO-SSD |
| [Depth Estimation](depth-estimation/) | Estimate relative depth from an image or video frame. | ml5.js `depthEstimation` / MiDaS |
| [Image Classification](image-classifier/) | Predict ImageNet labels for a selected image. | ml5.js  / MobileNet |
| [Sound Classification](sound-classifier/) | Recognize speech commands and other audio categories from the microphone. | ml5.js / SpeechCommands18w |
| [Sentiment Analysis](sentiment-analysis/) | Estimate sentiment polarity for entered text. | ml5.js / movieReviews |


## Facial expression and responsible use

The facial-expression example uses the [Human library](https://github.com/vladmandic/human), which supports face detection and expression-category predictions in the browser. Predictions such as “happy” or “sad” describe patterns recognized by the model; they are not reliable measurements of a person's internal emotional state, identity, intention or consent. 

## Libraries and references

- [ml5.js documentation](https://docs.ml5js.org/) and [official examples](https://github.com/ml5js/ml5-next-gen/tree/main/examples)
- [Human library](https://github.com/vladmandic/human) and [model repository](https://github.com/vladmandic/human-models)
- [p5.js](https://p5js.org/)
