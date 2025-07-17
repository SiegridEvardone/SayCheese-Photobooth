export default function About () {
  return(
    <div className="min-h-screen py-1 px-2 sm:px-5 bg-[#E8E8E8]">
      <div className="flex flex-col p-1 rounded-b-2xl gap-1 bg-[#BBBFCA]">
        <div className="border-4 border-white rounded p-6 sm:p-12 bg-[#F4F4F2]">
          <p className="text-lg sm:text-xl font-bold">ABOUT</p>
          <p className="text-xs md:text-base text-gray-700 font-thin">Say cheese—anytime, anywhere! Our online photobooth lets you snap fun, photobooth-style pics right from your browser. No downloads, no sign-ups—just click, pose, and go! Pick from 100+ frame colors, add quirky stickers, and download your high-res photo strip in seconds. It’s fast, fun, and made for sharing—your creative photo playground is just a tap away!</p>
        </div>
        <div className="border-4 border-white rounded rounded-b-2xl p-6 sm:p-12 bg-[#F4F4F2]">
          <p className="text-lg sm:text-xl font-bold">FAQ</p>
          <p>How to Use This Site:</p>
          <ol className="text-xs md:text-base text-gray-700 font-thin list-decimal list-inside mb-2">
            <li>Pick a Layout – Choose your favorite photo strip layout.</li>
            <li>Enable Camera Access – Allow the site to use your camera.</li>
            <li>Strike a Pose – Each photo has a 3-second countdown, so get ready!</li>
            <li>Review Your Shots – Happy with the result? Click “Done”. Want a redo? Hit “Retake”.</li>
            <li>Customize Your Strip – Add stickers, change the border color (even use custom colors!), or include the date.</li>
            <li>Download & Share – Click “Download” to save your photobooth creation!</li>
          </ol>
          <p>Can I use this on mobile?</p>
          <p className="text-xs md:text-base text-gray-700 font-thin mb-2">Yes! The app is now fully optimized for mobile devices and works in both portrait and landscape mode.</p>
          <p>Can I customize the photobooth strip?</p>
          <p className="text-xs md:text-base text-gray-700 font-thin mb-2">Absolutely! We’ve listened to your requests, and now you can personalize your photo strip with custom border colors, sticker overlays, date overlays, and even change the color of the logo and the date.</p>
          <p>Can I choose my preferred layout?</p>
          <p className="text-xs md:text-base text-gray-700 font-thin mb-2">Yes! You can select from four different layouts: 2, 3, 4 or 6-photo strips to match your style. </p>
          <p>Why is the screen black even after allowing camera access?</p>
          <p className="text-xs md:text-base text-gray-700 font-thin mb-2">Your camera permissions might be blocked. Go to: Settings → Privacy & Security →  Camera
            Turn on: "Let apps access your camera" and "Let desktop apps access your camera".</p>
          <p>Why does my camera feed start black?</p>
          <p className="text-xs md:text-base text-gray-700 font-thin mb-2">That’s intentional! The app waits until you accept camera permissions before displaying the video feed.</p>
          <p>Do you store my photos or data?</p>
          <p className="text-xs md:text-base text-gray-700 font-thin">Nope! Your photos stay on your device and never get uploaded or stored anywhere. Everything happens locally in your browser, so you have full control over your images. </p>
        </div>
      </div>
    </div>
  );
};