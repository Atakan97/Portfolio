import React, { useEffect, useRef } from 'react';

// This component creates a parallax background effect that moves slightly when the user moves the mouse.
const ParallaxBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth / 5;
      const windowHeight = window.innerHeight / 5;
      const mouseX = e.clientX / windowWidth;
      const mouseY = e.clientY / windowHeight;

      bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    };

    // Listen for mouse movement on window
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1]">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute top-[-5%] left-[-5%] w-[110%] h-[110%] bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      <div className="absolute inset-0 bg-background/80 z-10" />
    </div>
  );
};

export default ParallaxBackground;
