import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/ocr'); // Navigate to the OCR parsing page
  };

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-100"
    >
      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 text-center max-w-2xl bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
          Aadhaar OCR
        </h1>
        <p className="text-gray-700 text-md mb-8">
          Extract your Aadhaar details easily and securely using our advanced OCR technology. Just upload the
          front and back images of your Aadhaar card, and we'll handle the rest.
        </p>

        <div className="mb-8 flex justify-center">
          <iframe className="h-72" src="https://lottie.host/embed/fc3bf61a-2796-40f5-94de-3b4bb1749edc/B1KxEpdPs5.json"></iframe>
        </div>

        {/* Call to Action Button */}
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-3 px-10 rounded-full text-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
