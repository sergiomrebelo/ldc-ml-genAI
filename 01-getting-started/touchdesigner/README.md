# Machine Learning with TouchDesigner

This folder contains TouchDesigner projects and components for exploring machine learning as a material for computational design. The examples use a minimal classifier and MediaPipe vision tasks to turn image and movement data into inputs for visual systems.

Examples and documentation by **Sérgio M. Rebelo**.

## Projects and components

- `hello-world.toe` — introductory TouchDesigner project.
- `MediaPipe TouchDesigner.toe` and `MediaPipe TouchDesigner.3.toe` — projects using the MediaPipe TouchDesigner component.
- `toxes/` — external `.tox` components used by the projects, including `MediaPipe.tox`, `face_detector.tox`, `face_tracking.tox`, `pose_tracking.tox`, `object_tracking.tox`, `image_classification.tox`, and `image_segmentation.tox`.

The MediaPipe component runs vision tasks in TouchDesigner’s embedded Chromium browser and sends the results back into TouchDesigner. It provides a video TOP, data outputs for the vision tasks, and helper components to interpret and display the results. Depending on the selected task, it can demonstrate face detection and landmarks, hand and gesture tracking, pose tracking, object detection, image classification, and image segmentation.

## Open the MediaPipe example

1. Download the latest `release.zip` from the [MediaPipe TouchDesigner releases](https://github.com/torinmb/mediapipe-touchdesigner/releases).
2. Unzip the download and open `MediaPipe TouchDesigner.toe` in TouchDesigner.
3. Select a webcam in the MediaPipe component’s parameters and enable the task and preview overlay you want to explore.
4. To use the component in another project, drag in `MediaPipe.tox` and enable **External .tox**. Keep the external `.tox` files with the project so TouchDesigner can find them.

The MediaPipe project uses a webcam feed up to 720p in the current setup. On macOS, allow TouchDesigner camera access under **System Settings → Privacy & Security → Camera**. For a visual introduction, see the [MediaPipe TouchDesigner tutorial video](https://www.youtube.com/watch?v=Cx4Ellaj6kk).

## Apple Silicon (M1) and Face Track CHOP

The built-in **Face Track CHOP** is unsupported on macOS. It relies on NVIDIA’s AR SDK and an NVIDIA RTX GPU, so it cannot run on an M1 Mac. If this operator shows an unsupported/error state while the webcam input is working, the cause is the operator’s platform and hardware requirements. See Derivative’s [Face Track CHOP documentation](https://docs.derivative.ca/Face_Track_CHOP) and [TouchDesigner system requirements](https://docs.derivative.ca/System_Requirements).

Use the MediaPipe TouchDesigner component described above for face tracking on macOS. It is a separate project and runs its vision tasks through the embedded browser; it does not make the NVIDIA-dependent Face Track CHOP available on Mac.

## TouchDesigner build compatibility

The `.toe` and `.tox` files may have been saved in a newer TouchDesigner build than the one installed on your computer. For example, opening a component saved in build `2023.11880` with build `2023.11510` produces a version warning. Install the same or a newer TouchDesigner build where possible. Opening in an older build may cause compatibility problems; if you choose to proceed, keep a backup and do not overwrite the original until you have confirmed that it works.

## Backups

Keep local or automatic backups in `backup/` inside this folder. That directory is ignored by Git; the example `.toe` projects and `.tox` components remain trackable.
