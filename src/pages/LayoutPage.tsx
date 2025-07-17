import { useNavigate } from "react-router-dom";
import { usePhotoStore } from "../store/usePhotoStore";

export default function LayoutPage() {
  const navigate = useNavigate();
  const setLayout = usePhotoStore((state) => state.setLayout);

  const handleSelect = (photoCount: number) => {
    setLayout(photoCount);
    navigate("/CapturePage");
  };

  return (
    <div className="min-h-screen px-2 py-1 sm:px-5 bg-[#E8E8E8]">
      <div className="p-1 rounded-b-2xl bg-[#BBBFCA]">
        <div className="flex flex-col gap-1 min-h-fit text-center rounded rounded-b-2xl ">
          <div className="py-4 font-bold text-lg border-4 bg-[#F4F4F2]  border-white rounded">
            CHOOSE YOUR LAYOUT
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex p-5 sm:justify-evenly items-center bg-[#F4F4F2] border-4 border-white rounded rounded-b-2xl">
            {/* Layout A - 3 Photos */}
            <button
              onClick={() => handleSelect(3)}
              className="min-h-auto max-w-50 flex flex-col gap-1 hover:scale-105 transition"
            >
              <img src="/images/1.png" alt="Layout A" className="w-100" />
              <div className="text-sm">
                <span className="text-[#FEBA17] font-bold">Layout A</span> <br />
                <span>3 Photos</span>
              </div>
            </button>

            {/* Layout B - 2 Photos */}
            <button
              onClick={() => handleSelect(2)}
              className="min-h-auto max-w-50 flex flex-col gap-1 hover:scale-105 transition"
            >
              <img src="/images/3.png" alt="Layout B" className="w-100" />
              <div className="text-sm">
                <span className="text-[#FEBA17] font-bold">Layout B</span> <br />
                <span>2 Photos</span>
              </div>
            </button>

            {/* Layout C - 4 Photos */}
            <button
              onClick={() => handleSelect(4)}
              className="min-h-auto max-w-50 flex flex-col gap-1 hover:scale-105 transition"
            >
              <img src="/images/2.png" alt="Layout C" className="w-100" />
              <div className="text-sm">
                <span className="text-[#FEBA17] font-bold">Layout C</span> <br />
                <span>4 Photos</span>
              </div>
            </button>

            {/* Layout D - 6 Photos */}
            <button
              onClick={() => handleSelect(6)}
              className="min-h-auto max-w-50 flex flex-col gap-1 hover:scale-105 transition"
            >
              <img src="/images/4.png" alt="Layout D" className="w-100" />
              <div className="text-sm">
                <span className="text-[#FEBA17] font-bold">Layout D</span> <br />
                <span>6 Photos</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
