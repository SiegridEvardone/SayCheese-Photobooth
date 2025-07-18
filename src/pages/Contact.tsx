import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        serviceID,     
        templateID,  
        formRef.current,
        publicKey     
      )
       .then(
      () => {
        setSent(true);
        alert("Message sent successfully!");
      },
      () => {
        alert("Something went wrong. Please try again.");
      }
    );
};
  return (
    <div className="min-h-screen py-1 px-2 sm:px-5 bg-[#E8E8E8]">
      <div className="rounded-b-2xl p-1 min-h-screen bg-[#BBBFCA]">
        <div className="flex flex-col gap-1 sm:flex-row min-h-screen">

          {/* Left Text Panel */}
          <div className="flex-1 rounded sm:rounded-bl-2xl p-6 sm:p-12 border-4 border-white bg-[#F4F4F2] min-h-full">
            <p className="sm:text-xl font-bold mb-2">Contact</p>
            <p className="text-gray-700 text-xs md:text-base">
              We’d love to hear from you! Got a question, suggestion, or ran into an issue?
              Don’t hesitate to reach out — your feedback helps me improve SayCheese!
            </p>
            {sent && (
              <p className="text-green-600 font-semibold mt-3">Message sent successfully!</p>
            )}
          </div>

          {/* Right Form Panel */}
          <div className="flex-1 rounded rounded-b-2xl sm:rounded-bl p-6 sm:p-12 border-4 border-white bg-[#F4F4F2] min-h-full">
            <form ref={formRef} onSubmit={sendEmail} className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-semibold text-sm">Name:</label>
              <input name="name" type="text" required className="border p-2 mb-3 rounded focus:outline-[#FEBA17] bg-white" placeholder="Enter your name" />

              <label htmlFor="email" className="mb-1 font-semibold text-sm">Email:</label>
              <input name="email" type="email" required className="border p-2 mb-3 rounded focus:outline-[#FEBA17] bg-white" placeholder="Enter your email address" />

              <label htmlFor="message" className="mb-1 font-semibold text-sm">Message:</label>
              <textarea name="message" required className="border p-2 mb-4 rounded focus:outline-[#FEBA17] bg-white" placeholder="Enter your message here..."></textarea>

              <button type="submit" className="border border-b-2 shadow-md w-fit px-4 py-2 rounded bg-[#FEBA17] font-bold text-black hover:bg-yellow-400 transition">
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
