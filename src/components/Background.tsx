import React from 'react';

export const Background = ({ isLightMode }: { isLightMode: boolean }) => (
  <div className="fixed inset-0 z-0 bg-black pointer-events-none">
    {/* Subtle Grid Pattern */}
    <div className={`absolute inset-0 bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] ${isLightMode ? 'bg-[linear-gradient(to_right,rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.2)_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]'}`}></div>
    {/* Main Top Glow */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full opacity-40 mix-blend-screen"></div>
    {/* Bottom Right Glow for depth */}
    <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full opacity-30 mix-blend-screen"></div>
    {/* Left Side Glow */}
    <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full opacity-20 mix-blend-screen"></div>
  </div>
);
