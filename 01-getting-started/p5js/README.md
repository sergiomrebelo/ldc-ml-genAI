# Image and Sound Classification with p5.js and ml5.js

This folder contains two browser sketches for exploring machine learning with p5.js and ml5.js:

Examples and documentation by **Sérgio M. Rebelo**.

- [`sound-classifier/`](sound-classifier/) listens to microphone input with the `SpeechCommands18w` model and displays the top predicted sound label and confidence score.
- [`image-classifier/`](image-classifier/) classifies webcam frames with the `MobileNet` model and displays up to three predicted labels and confidence scores.

## Run

Serve the sketch folder from `localhost` instead of opening its `index.html` as a `file://` URL. From the folder of the example you want to run, start a local server:

```bash
python -m http.server 8000
```

Open `http://localhost:8000` in a browser and grant microphone or camera access when prompted.

## Reference

The examples use the ml5.js 1.x API. For the library documentation, visit [ml5.js](https://ml5js.org/).
