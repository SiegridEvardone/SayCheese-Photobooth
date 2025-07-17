import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { usePhotoStore } from "../../store/usePhotoStore";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function WebcamLayout() {
  const webcamRef = useRef<Webcam>(null);
  const { layout, addPhoto, resetPhotos, photos } = usePhotoStore();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      addPhoto(imageSrc);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    resetPhotos(); // clear any previous session
    setCurrentIndex(0);
    setCountdown(3);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown !== null && currentIndex < layout) {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        capturePhoto();
        setCountdown(3); // restart for next photo
      }
    }

    if (currentIndex >= layout) {
      setCountdown(null);
      // Redirect or show preview button here
    }

    return () => clearTimeout(timer);
  }, [countdown, currentIndex]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="rounded-lg border-4 border-yellow-400"
      />

      {countdown !== null && (
        <div className="text-4xl font-bold mt-4 animate-pulse">{countdown}</div>
      )}

      <div className="flex gap-2 mt-4">
        {Array.from({ length: layout }).map((_, idx) => (
          <div
            key={idx}
            className={`w-16 h-16 border-2 ${
              photos[idx] ? "border-green-400" : "border-gray-500"
            } rounded bg-gray-800`}
          >
            {photos[idx] && (
              <img src={photos[idx]} alt={`shot-${idx}`} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
