/*  Computational Design Laboratory: Image Classification Processing Java example
 *  Author: Sérgio M. Rebelo <srebelo@dei.uc.pt>
 *  Oct 2026
 *
 *  Processing Java Mode Image Classifier Example (with Python server)
 *  Minimal visual receiver for a local classifier service.
 *  The Python companion server sends one JSON result per request.
 */

import processing.net.*;
import processing.data.*;

String label = "Start classifier_service.py, then click to classify";
float score = 0;

void setup() {
  size(700, 420);
  textFont(createFont("SansSerif", 20));
  pixelDensity(2);
}

void draw() {
  background(18);
  fill(255);
  text("Image classification", 30, 45);
  fill(80, 220, 190);
  ellipse(width/2, height/2, 80 + score*180, 80 + score*180);
  fill(255);
  text("Top prediction: " + label, 30, height-70);
  text("Model score: " + nf(score*100, 1, 1) + "%", 30, height-38);
}

void mousePressed() {
  String response = "";
  try {
    String[] lines = loadStrings("http://127.0.0.1:8765/classify");
    if (lines != null) response = join(lines, "");
  }
  catch (Exception e) {
    println(e);
  }
  if (response.length() > 0) {
    JSONObject data = parseJSONObject(trim(response));
    if (data != null) {
      label = data.getString("label", "unknown");
      score = constrain(data.getFloat("score", 0), 0, 1);
    }
  } else {
    label = "No response: check the Python service";
  }
}
