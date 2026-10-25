/*
 * Computational Design Laboratory: Getting Started with ML
 * Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
 * Oct 2026
 *
 * Processing Java Mode Hello World example
 * Face detection with estimated age and gender presentation labels using
 * Deep Vision for Processing. These are model predictions, not verified
 * personal attributes. In particular, the model's gender labels are limited
 * and should not be treated as a person's gender identity.
 *
 * Example based on Deep Vision Library
 * Related workshop: https://github.com/sergiomrebelo/workshop-cv
 * Deep Vision: https://github.com/cansik/deep-vision-processing
 */

import ch.bildspur.vision.*;
import ch.bildspur.vision.network.*;
import ch.bildspur.vision.result.*;
import processing.video.Capture;

Capture camera;
DeepVision vision;
CascadeClassifierNetwork faceNetwork;
GenderNetwork genderNetwork;
AgeNetwork ageNetwork;

ResultList<ObjectDetectionResult> detections;
ResultList<ClassificationResult> genderPredictions;
ResultList<ClassificationResult> agePredictions;
String status = "Loading models...";
int lastInferenceTime = 0;

void setup() {
  size(640, 480);
  textSize(14);

  vision = new DeepVision(this);
  faceNetwork = vision.createCascadeFrontalFace();
  genderNetwork = vision.createGenderClassifier();
  ageNetwork = vision.createAgeClassifier();

  // Downloads model files the first time they are used, then loads the networks.
  faceNetwork.setup();
  genderNetwork.setup();
  ageNetwork.setup();

  // Uses Processing Video's default camera rather than a Linux-only GStreamer pipeline.
  String[] cameras = Capture.list();
  if (cameras.length == 0) {
    status = "No camera found. Check Processing Video permissions.";
    return;
  }
  camera = new Capture(this, 640, 480);
  camera.start();
  status = "Camera ready";
}

void captureEvent(Capture source) {
  source.read();
}

void draw() {
  background(25);
  if (camera == null || camera.width == 0) {
    fill(255);
    text(status, 16, 28);
    return;
  }

  image(camera, 0, 0, width, height);
  // Run the three networks at a lower rate than the display loop to reduce load.
  if (millis() - lastInferenceTime > 250) {
    detections = faceNetwork.run(camera);
    genderPredictions = genderNetwork.runByDetections(camera, detections);
    agePredictions = ageNetwork.runByDetections(camera, detections);
    lastInferenceTime = millis();
  }

  if (detections == null) return;

  noFill();
  stroke(70, 240, 180);
  strokeWeight(2);

  for (int i = 0; i < detections.size(); i++) {
    ObjectDetectionResult face = detections.get(i);
    rect(face.getX(), face.getY(), face.getWidth(), face.getHeight());

    String ageLabel = i < agePredictions.size() ? agePredictions.get(i).getClassName() : "age unavailable";
    
    String genderLabel = i < genderPredictions.size() ? genderPredictions.get(i).getClassName() : "gender unavailable";

    fill(0, 190);
    noStroke();
    rect(face.getX(), max(0, face.getY() - 24), face.getWidth(), 24);
    fill(255);
    text("Estimated age: " + ageLabel + " | model gender label: " + genderLabel,
      face.getX() + 4, max(16, face.getY() - 7));
    noFill();
    stroke(70, 240, 180);
  }

  windowTitle("Getting Started with ML: Hello World");
}
