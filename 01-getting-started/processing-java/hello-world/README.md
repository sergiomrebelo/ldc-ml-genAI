# Face Detection with Processing Java Mode

This example uses Deep Vision for Processing to detect faces and estimate age and gender labels. It is a small computer-vision “hello world” for exploring how model outputs can become part of a visual interaction.

Example by **Sérgio M. Rebelo**. Related material: [workshop-cv](https://github.com/sergiomrebelo/workshop-cv).

## Requirements

- Processing 4 with Java Mode
- Processing Video library
- Deep Vision for Processing library
- A webcam and permission for Processing to access it

Install Deep Vision through Processing's Contribution Manager or follow the [library installation instructions](https://github.com/cansik/deep-vision-processing). The first run downloads model files and may take longer than subsequent runs.

## Run

Open `hello_world.pde` in Processing and run the sketch. The sketch opens the default camera, draws a rectangle around each detected face, and displays the model's estimated age and gender labels.

If the camera does not start, check macOS camera permissions under **System Settings → Privacy & Security → Camera**, then restart Processing. The example uses Processing Video's default camera selection rather than a platform-specific GStreamer pipeline.

## Interpreting the Output

Age and gender are model estimates, not verified personal attributes. The model's gender categories do not establish a person's gender identity. Test how lighting, pose, camera quality, and face position affect its output, and consider whether an interaction should use these predictions at all.

The Deep Vision API is under development, and its face-detection-to-attribute pipeline is not fully documented. This sketch follows the library's network setup pattern and `runByDetections()` pipeline example; check it against the installed release if the API changes.
