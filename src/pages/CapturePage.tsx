import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { usePhotoStore } from "../store/usePhotoStore";
import { IoIosArrowRoundBack } from "react-icons/io";

const videoConstraints = {
  width: 600,
  height: 440,
  facingMode: "user",
};

const filters = [
  { label: "None", className: "filter-none" },
  { label: "Grayscale", className: "filter-grayscale" },
  { label: "Sepia", className: "filter-sepia" },
  { label: "Bright", className: "filter-bright" },
  { label: "Dim", className: "filter-dim" },
  { label: "Contrast", className: "filter-contrast" },
  { label: "Invert", className: "filter-invert" },
  { label: "Hue Shift", className: "filter-hue" },
  { label: "Warm Tone", className: "filter-warm" },
  { label: "Cool Tone", className: "filter-cool" },
  { label: "Retro", className: "filter-retro" },
  { label: "Soft Blur", className: "filter-soft-blur" },
  { label: "Cyberpunk", className: "filter-cyber" },
];

const canvasFilterMap: Record<string, string> = {
  "filter-none": "none",
  "filter-grayscale": "grayscale(100%)",
  "filter-sepia": "sepia(100%)",
  "filter-bright": "brightness(150%)",
  "filter-dim": "brightness(70%)",
  "filter-contrast": "contrast(200%)",
  "filter-invert": "invert(100%)",
  "filter-hue": "hue-rotate(90deg)",
  "filter-warm": "sepia(30%) saturate(150%)",
  "filter-cool": "contrast(85%) brightness(120%)",
  "filter-retro": "sepia(60%) contrast(85%) brightness(110%)",
  "filter-soft-blur": "blur(3px)",
  "filter-cyber": "hue-rotate(290deg) contrast(120%) brightness(140%)",
};

export default function CapturePage() {
  const webcamRef = useRef<Webcam | null>(null);
  const countdownAudioRef = useRef<HTMLAudioElement | null>(null);
  const shutterAudioRef = useRef<HTMLAudioElement | null>(null);

  const navigate = useNavigate();
  const { layout, addPhoto, photos, resetPhotos } = usePhotoStore();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("filter-none");

  useEffect(() => {
    countdownAudioRef.current = new Audio("/sounds/countdown.wav");
    shutterAudioRef.current = new Audio("/sounds/shutter.mp3");
  }, []);

  const playBeep = () => {
    const audio = countdownAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch((err) => console.warn("Beep error:", err));
    }
  };

  const playShutterSound = () => {
    const audio = shutterAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch((err) => console.warn("Shutter error:", err));
    }
  };

  const capturePhoto = () => {
    if (countdownAudioRef.current) {
      countdownAudioRef.current.pause();
      countdownAudioRef.current.currentTime = 0;
    }

    const video = webcamRef.current?.video;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Apply canvas filter
    ctx.filter = canvasFilterMap[selectedFilter] || "none";

    // Mirror if needed
    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    addPhoto(imageData);
    playShutterSound();
  };

  useEffect(() => {
    resetPhotos();
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown !== null && currentIndex < layout) {
      if (countdown > 1) {
        playBeep();
        timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else if (countdown === 1) {
        playBeep();
        timer = setTimeout(() => {
          setCountdown(null);
          capturePhoto();

          if (currentIndex + 1 < layout) {
            setTimeout(() => {
              setCurrentIndex((prev) => prev + 1);
              setCountdown(3);
            }, 1500);
          } else {
            setCurrentIndex((prev) => prev + 1);
          }
        }, 1000);
      }
    }

    return () => clearTimeout(timer);
  }, [countdown, currentIndex, layout]);

  const startCapture = () => {
    setStarted(true);
    setCountdown(3);
  };

  const toggleMirror = () => {
    setIsMirrored((prev) => !prev);
  };

  const handleRetake = () => {
    setStarted(false);
    resetPhotos();
    setCurrentIndex(0);
    setCountdown(null);
  };

  const handleDone = () => {
    navigate("/customizePage");
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8] px-2 py-1 sm:px-5">
      <div className="p-1 flex flex-col gap-1 bg-[#BBBFCA] rounded-b-2xl">
        <div className="border-4 border-white rounded p-6 sm:p-12 bg-[#F4F4F2] ">
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <div>
              <button
                onClick={() => navigate("/LayoutPage")}
                className="flex items-center cursor-pointer mb-1 font-bold"
              >
                <span><IoIosArrowRoundBack /></span>
                <p className="m-0 text-xs">back</p>
              </button>
              <div className="relative overflow-visible">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  mirrored={isMirrored}
                  className={`rounded-lg border-4 border-yellow-400 shadow-xl ${selectedFilter}`}
                />

                {countdown !== null && countdown > 0 && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 transform text-white text-4xl sm:text-8xl font-extrabold z-50 animate-bounce drop-shadow-lg">
                    {countdown}
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-center mt-2">
                {!started && (
                  <button
                    onClick={startCapture}
                    className="text-nowrap bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm sm:text-base sm:px-4 sm:py-2 py-1 px-2 rounded shadow cursor-pointer"
                  >
                    Start Capture
                  </button>
                )}
                <button
                  onClick={toggleMirror}
                  className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded shadow cursor-pointers"
                >
                  {isMirrored ? "<|>" : "<|>"}
                </button>
                {started && currentIndex >= layout && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleRetake}
                      className="border-2 border-red-400 hover:bg-red-500 text-black text-sm sm:text-base font-bold py-2 px-5 rounded shadow cursor-pointer"
                    >
                      Retake
                    </button>
                    <button
                      onClick={handleDone}
                      className="border-2 border-green-600 hover:bg-green-600 text-black text-sm sm:text-base font-bold py-2 px-5 rounded shadow"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 place-items-center sm:place-items-start">
              {Array.from({ length: layout }).map((_, i) => (
                <div
                  key={i}
                  className={`w-30 h-20 rounded border-2 ${
                    photos[i] ? "border-green-500" : "border-gray-300"
                  } bg-gray-100 overflow-hidden`}
                >
                  {photos[i] && (
                    <img
                      src={photos[i]}
                      alt={`shot-${i}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-1 text-center">
          <p className="p-2 bg-[#F4F4F2] border-4 border-white rounded font-bold">Filters</p>
          <div className="flex flex-wrap gap-3 rounded rounded-b-2xl justify-center p-2 border-4 border-white bg-[#F4F4F2]">
            {filters.map((f) => (
              <button
                key={f.className}
                onClick={() => setSelectedFilter(f.className)}
                className={`py-1 px-3 border rounded text-xs ${
                  selectedFilter === f.className
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

        
      

      
    </div>
  );
}
