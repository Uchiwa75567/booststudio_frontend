import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          <span className="text-red-500">BOOST</span>
          <span className="text-white">STUDIO</span>
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;