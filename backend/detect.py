from ultralytics import YOLO
import cv2

model = YOLO("yolov8s.pt")  
def detect_objects():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Camera not opened")
        return []

    for _ in range(10):
        cap.read()
    ret, frame = cap.read()
    if not ret:
        cap.release()
        return []
    results = model(frame, conf=0.3)
    objects = []
    for r in results:
        if r.boxes is None:
            continue
        for box in r.boxes:
            cls = int(box.cls[0])
            label = model.names[cls]
            objects.append(label)
    cap.release()
    print("Detected:", objects)
    return list(set(objects))
