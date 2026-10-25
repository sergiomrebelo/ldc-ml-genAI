# Image Classifier — Processing Java Mode

Example by **Sérgio M. Rebelo**. Related material: [workshop-cv](https://github.com/sergiomrebelo/workshop-cv).

The Processing sketch displays a prediction returned by a small Python service. The service uses a pretrained MobileNet model from TensorFlow Hub to classify the sample image at `data/example.jpg`. It converts the model's logits to probabilities with softmax and maps the winning class index to the official 1001-entry ImageNet labels list. The model expects RGB pixel values in the `[0, 1]` range.

## Run

From this folder, run:

```bash
./run.sh
```

The script activates the local `.venv`, installs dependencies (including `setuptools<82` for TensorFlow Hub compatibility), and starts the service with:

```bash
python classifier_service.py data/example.jpg
```

Keep the terminal running. Then open `image_classifier.pde` in Processing Java Mode and run the sketch. Click the sketch to request a prediction. The model and ImageNet labels download on first run. The displayed score is the model's softmax probability for its top class; it is not a guarantee that the prediction is correct.

## Author and reference

Example by **Sérgio M. Rebelo**. Related material: [workshop-cv](https://github.com/sergiomrebelo/workshop-cv).

## Design prompt

The sketch maps the top predicted class score to circle size. What changes if size represents the class index, or if each class maps to a different color instead?
