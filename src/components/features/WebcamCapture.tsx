import { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function WebcamCapture() {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log("Captured Image:", imageSrc);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="rounded-lg"
      />
      <button
        onClick={capture}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
      >
        Capture Photo
      </button>
    </div>
  );
}
