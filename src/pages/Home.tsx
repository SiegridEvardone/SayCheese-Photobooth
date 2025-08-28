import HeroImage from "../assets/images/HeroImage.png";
import { Link } from "react-router-dom";

export default function Home() {
  return(
    <div className="min-h-screen bg-[#E8E8E8] px-2 sm:px-5 py-1">
      <div className="p-1 rounded-b-2xl bg-[#BBBFCA] h-vh">
        <div className="flex flex-col justify-center sm:flex-row gap-1 rounded-b-2xl h-full">
          <div className="flex-1 border-4 rounded sm:rounded-bl-2xl p-6 sm:p-12 border-white bg-[#F4F4F2]">
            <div className=" max-w-120 h-fit max-h-110 mx-auto border-2 border-dashed p-5 ">
              <img src={HeroImage} className="w-100 max-h-100 object-contain mx-auto" alt="Strips Image" />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between border-4 border-white rounded rounded-b-2xl sm:rounded-br-2xl sm:rounded-bl bg-[#F4F4F2] p-6 sm:p-12 gap-2 sm:gap-4">
            <p className="flex-none text-4xl font-black lg:text-5xl">Ready, Set, Post!</p>
            <div className="flex-1">
              <p className="lg:text-3xl lg:my-4">Whether it's a party or just for fun —
              bring your moments to life with 
              <span className="text-[#FEBA17] font-bold"> SayCheese!</span> Photobooth.</p>
              <div className="mt-1 sm:text-lg">
                <p>✨ Easy to Use</p>
                <p>🎨 Customize Everything</p>
                <p>📥 Download Instantly</p>
              </div>
             
            </div>
            <button className="mt-auto w-fit border border-b-2 shadow-xl rounded-4xl px-6 py-1 lg:mt-6 lg:text-2xl text-[#E0AB3E] font-bold bg-[#FFF5ED]"><Link to='/LayoutPage'>Start</Link></button>
          </div>
        </div>
      </div>
      
    </div>
  );
};