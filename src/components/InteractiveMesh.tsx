import React, { useRef, useEffect } from 'react';

export const InteractiveMesh = ({ isLightMode }: { isLightMode: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      let animationFrameId: number;
      let width = 0;
      let height = 0;
      
      // Mesh configuration
      const points: {x: number, y: number, z: number}[] = [];
      const numPoints = 180;
      const sphereRadius = 400;
      
      // Initialize points on a sphere (Fibonacci Spiral) for even distribution
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      for (let i = 0; i < numPoints; i++) {
          const theta = 2 * Math.PI * i / goldenRatio;
          const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
          
          points.push({
              x: sphereRadius * Math.sin(phi) * Math.cos(theta),
              y: sphereRadius * Math.sin(phi) * Math.sin(theta),
              z: sphereRadius * Math.cos(phi)
          });
      }
  
      let mouseX = 0;
      let mouseY = 0;
      let rawMouseX = -1000;
      let rawMouseY = -1000;
      let currentRotationX = 0;
      let currentRotationY = 0;
  
      const handleResize = () => {
          width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
          height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      };
      handleResize();
  
      const handleMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          rawMouseX = x;
          rawMouseY = y;
          
          // Normalize mouse position for rotation target
          mouseX = (x - width / 2) * 0.0008;
          mouseY = (y - height / 2) * 0.0008;
      };
  
      const animate = () => {
          ctx.clearRect(0, 0, width, height);
          
          // Smooth rotation interpolation
          currentRotationY += (mouseX - currentRotationY) * 0.05;
          currentRotationX += (mouseY - currentRotationX) * 0.05;
  
          // Add subtle constant rotation
          const time = Date.now() * 0.0001;
          const rotationY = currentRotationY + time;
          const rotationX = currentRotationX;
  
          const center = { x: width / 2, y: height / 2 };
          
          // Project 3D points to 2D
          const projectedPoints = points.map(point => {
              // Rotate around Y axis
              let x = point.x * Math.cos(rotationY) - point.z * Math.sin(rotationY);
              let z = point.x * Math.sin(rotationY) + point.z * Math.cos(rotationY);
              
              // Rotate around X axis
              let y = point.y * Math.cos(rotationX) - z * Math.sin(rotationX);
              z = point.y * Math.sin(rotationX) + z * Math.cos(rotationX);
  
              // Perspective projection
              const scale = 800 / (800 + z);
              let x2d = x * scale + center.x;
              let y2d = y * scale + center.y;
              
              let distToMouse = 10000;
              // Mouse repulsion interaction
              const dx = x2d - rawMouseX;
              const dy = y2d - rawMouseY;
              distToMouse = Math.sqrt(dx * dx + dy * dy);
              const interactionRadius = 250;
              
              if (distToMouse < interactionRadius) {
                  const force = (interactionRadius - distToMouse) / interactionRadius;
                  // Push points away from mouse
                  x2d += (dx / distToMouse) * force * 40;
                  y2d += (dy / distToMouse) * force * 40;
              }
              
              return { x: x2d, y: y2d, z: z, scale: scale, distToMouse };
          });
  
          // Draw Connections (Edges)
          const connectionDist = 130;
          ctx.lineWidth = 1.5;
          for (let i = 0; i < projectedPoints.length; i++) {
              for (let j = i + 1; j < projectedPoints.length; j++) {
                  const d = Math.sqrt(
                      Math.pow(projectedPoints[i].x - projectedPoints[j].x, 2) + 
                      Math.pow(projectedPoints[i].y - projectedPoints[j].y, 2)
                  );
                  
                  // Draw line if points are close enough
                  if (d < connectionDist) { 
                      const alpha = 1 - (d / connectionDist);
                      
                      let finalAlpha;
                      // Highlight lines near the mouse
                      const mouseInfluence1 = Math.max(0, 1 - (projectedPoints[i].distToMouse / 250));
                      const mouseInfluence2 = Math.max(0, 1 - (projectedPoints[j].distToMouse / 250));
                      const avgMouseInfluence = (mouseInfluence1 + mouseInfluence2) / 2;
                      
                      const baseAlpha = alpha * 0.25;
                      finalAlpha = baseAlpha + (avgMouseInfluence * 0.5);
                      
                      ctx.strokeStyle = `rgba(59, 130, 246, ${finalAlpha})`; // Subtle blue
                      ctx.beginPath();
                      ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
                      ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
                      ctx.stroke();
                  }
              }
          }
  
          // Draw Nodes (Points)
          projectedPoints.forEach(p => {
               const depthAlpha = (p.z + sphereRadius) / (2 * sphereRadius); // Depth fading
               
               let alpha, size;
               const mouseInfluence = Math.max(0, 1 - (p.distToMouse / 250));
               alpha = Math.min(1, depthAlpha * 0.8 + mouseInfluence * 0.8);
               // Make points larger near mouse
               size = (1.5 + mouseInfluence * 2.5) * p.scale;
               
               ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`; // Blue-400
               ctx.beginPath();
               ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
               ctx.fill();
          });
  
          animationFrameId = requestAnimationFrame(animate);
      };
  
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      animate();
  
      return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleMouseMove);
          cancelAnimationFrame(animationFrameId);
      };
    }, [isLightMode]);
  
    return <canvas ref={canvasRef} className={`absolute inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-500 opacity-90`} />;
  };
