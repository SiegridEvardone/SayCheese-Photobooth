import { useRef, useState } from "react";
import { usePhotoStore } from "../store/usePhotoStore";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const stickerList = [
  "/stickers/s1.png",
  "/stickers/s2.png",
  "/stickers/s3.png",
  "/stickers/s4.png",
  
];

const backgroundList = [null, ...Array.from({ length: 10 }, (_, i) => `/stripBackgrounds/b${i + 1}.jpg`)];

export default function CustomizationPage() {
  const {
    photos,
    frameColor,
    selectedSticker,
    selectedBackground,
    showDateTime,
    layout,
    setFrameColor,
    toggleDateTime,
    setSelectedSticker,
    setSelectedBackground,
    resetPhotos,
  } = usePhotoStore();

  const navigate = useNavigate();
  const stripRef = useRef<HTMLDivElement>(null);
  const currentDateTime = new Date().toLocaleString();
  const [titleColor, setTitleColor] = useState("#000000");
  const [dateColor, setDateColor] = useState("#000000");

  const retakeAndGoBack = () => {
    resetPhotos();
    navigate("/CapturePage");
  };

const downloadStrip = async () => {
  if (!stripRef.current) return;

  // Wait for all images to load
  const images = stripRef.current.querySelectorAll('img');
  await Promise.all(Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve; // Resolve on error to avoid blocking
    });
  }));

  const element = stripRef.current;
  const style = window.getComputedStyle(element);
  
  // Calculate dimensions including padding
  const width = Math.ceil(parseFloat(style.width));
  const height = Math.ceil(parseFloat(style.height));

  const canvas = await html2canvas(element, {
    useCORS: true,
    backgroundColor: null,
    scale: 2, // high-resolution
    width,
    height,
  });

  const link = document.createElement("a");
  link.download = "saycheese-strip.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};


  return (
    <div className="min-h-screen bg-[#E8E8E8] py-1 px-2 sm:px-5">
      <div className="flex flex-col bg-[#BBBFCA] rounded-b-2xl p-1 gap-1">
        <div className="border-4 border-white rounded bg-[#F4F4F2] p-2 sm:p-4">
          <h1 className="text-base sm:text-xl font-bold text-center">Customize Your Photo Strip</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-1">
          {/* Left Panel */}
          <div className="flex-1 flex flex-col gap-1 w-full min-h-full">
            <div className="bg-[#F4F4F2] border-4 rounded  border-white p-5">
              <p className="font-semibold ">Frame Background:</p>
              <input
                type="color"
                value={frameColor}
                onChange={(e) => setFrameColor(e.target.value)}
                className="w-full h-5 cursor-pointer"
              />
            </div>

            <div className="bg-[#F4F4F2] border-4 rounded  border-white p-5">
              <p className="font-semibold mb-2 ">Backgrounds:</p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {backgroundList.map((bg, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedBackground(bg)}
                    className={`w-10 h-10 flex items-center justify-center cursor-pointer border-2 rounded ${
                      selectedBackground === bg ? "border-yellow-500" : "border-transparent"
                    }`}
                    style={{
                      backgroundImage: bg ? `url(${bg})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: bg ? "transparent" : "#ccc",
                    }}
                  >
                    {!bg && <span className="text-xs  text-gray-800">None</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F4F4F2] border-4 rounded  border-white p-5">
              <p className="font-semibold mb-2 ">Sticker (1 only):</p>
              <div className="grid grid-cols-4 gap-2">
                {stickerList.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="sticker"
                    onClick={() => setSelectedSticker(selectedSticker === src ? null : src)}
                    className={`w-12 h-12 cursor-pointer transition rounded ${
                      selectedSticker === src ? "ring-4 ring-yellow-400" : ""
                    }`}
                  />
                ))}
              </div>
              {selectedSticker && (
                <button
                  onClick={() => setSelectedSticker(null)}
                  className="mt-2 bg-red-400 hover:bg-red-500 text-white text-xs px-3 py-1 rounded shadow"
                >
                  Remove Sticker
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 bg-[#F4F4F2] border-4 rounded  border-white p-5 ">
              <div>
                <input
                  type="checkbox"
                  checked={showDateTime}
                  onChange={toggleDateTime}
                  className="accent-yellow-500"
                />
                <label className="font-semibold ml-2">Show Date & Time</label>
              </div>
              <div className="flex gap-2">
                <div>
                  <p className="text-xs">Title Color:</p>
                  <input
                    type="color"
                    value={titleColor}
                    onChange={(e) => setTitleColor(e.target.value)}
                    className="w-full h-5 cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-xs">Date Color:</p>
                  <input
                    type="color"
                    value={dateColor}
                    onChange={(e) => setDateColor(e.target.value)}
                    className="w-full h-5 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex grow gap-2 items-end bg-[#F4F4F2] border-4 rounded sm:rounded-bl-2xl border-white p-5">
              <div className="flex gap-2">
                <button
                onClick={retakeAndGoBack}
                className="bg-red-400 hover:bg-red-500 text-xs sm:text-base font-bold py-2 px-6 rounded shadow w-fit"
              >
                  Retake
                </button>
                <button
                  onClick={downloadStrip}
                  className="bg-yellow-500 hover:bg-yellow-600 text-xs sm:text-base font-bold py-2 px-6 rounded shadow w-fit"
                >
                  Save
                </button>
              </div>
            
            </div>
          </div>

          {/* Right Panel (Strip Preview) */}
          <div className="flex-1 flex justify-center items-center min-h-full w-full bg-[#F4F4F2] border-4 rounded border-white rounded-b-2xl sm:rounded-bl p-5">
            <div className="flex justify-center">
              <div
                ref={stripRef}
                className="relative box-border flex flex-col items-center gap-2 w-60 p-2"
                style={{
                  backgroundColor: selectedBackground ? undefined : frameColor,
                  backgroundImage: selectedBackground ? `url(${selectedBackground})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Sticker Full Overlay */}
                {selectedSticker && (
                  <img
                    src={selectedSticker}
                    alt="sticker-overlay"
                    className="absolute top-0 left-0 w-full h-full object-fill z-50 pointer-events-none"
                  />
                )}

                {/* Photos */}
                <div className="flex flex-col items-center gap-2 w-full">
                  {layout === 6 ? (
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`photo-${index}`}
                          className="w-full h-auto object-cover object-center"
                          style={{ aspectRatio: "auto",
                            filter: "selectedFilter",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`photo-${index}`}
                        className="w-full h-auto object-cover object-center"
                        style={{ aspectRatio: "auto",
                          filter: "selectedFilter",
                        }}
                      />
                    ))
                  )}
                </div>

                {/* Title & Date inside bottom of strip */}
                <div
                  className="w-full text-center mt-2 py-2"
                >
                  <h2 className="text-sm font-bold" style={{ color: titleColor }}>
                    SayCheese! Photobooth
                  </h2>
                  {showDateTime && (
                    <p className="text-xs font-mono mt-1" style={{ color: dateColor }}>
                      {currentDateTime}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
