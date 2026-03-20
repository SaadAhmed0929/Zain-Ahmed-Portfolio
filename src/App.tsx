import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView, animate } from 'framer-motion';
import { 
  Wind, 
  Activity, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Download, 
  Mail, 
  Linkedin, 
  Github, 
  Menu, 
  X, 
  ExternalLink, 
  MapPin, 
  GraduationCap, 
  Terminal, 
  MousePointer2, 
  ChevronRight, 
  PenTool, 
  Wrench, 
  BookOpen, 
  Code2, 
  Briefcase, 
  User, 
  Send,
  Sun,
  Moon,
  Check,
  Loader2,
  ArrowUp
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  focusArea: string;
  description: string;
  specs: string[];
  image: string;
  link?: string;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  pdf: string;
  description: string;
  skills: string[];
  link?: string;
}

// --- Data ---
const DATA = {
  name: "Zain Ahmed",
  title: "Mechanical Engineer",
  subtitle: "Simulation Specialist",
  tagline: "Bridging theoretical physics and engineering reality through advanced CFD & FEA.",
  location: "Lahore, Pakistan",
  social: {
    email: "zainbinwaqas7@gmail.com",
    linkedin: "#",
    github: "#"
  },
  education: [
    {
      degree: "M.Sc. Thermal Power",
      school: "UET Lahore",
      grade: "3.92 CGPA",
      year: "2024"
    },
    {
      degree: "B.Sc. Mechanical Eng.",
      school: "UET Lahore",
      grade: "3.71 CGPA",
      year: "2021"
    }
  ],
  experience: [
    {
      id: 1,
      role: "Fellowship Trainee",
      company: "Energy Centre of Excellence | Quaid-e-Azam Thermal Power Plant | Bhikki",
      period: "2025",
      description: "Completed GE-approved training on Gas/Steam Turbines and HRSG operations. Practiced signal tracing via Mark VIe HMIs and investigated auxiliary pump vibrations."
    },
    {
      id: 2,
      role: "Graduate Assistant",
      company: "Mechanical Engineering Department | UET | Lahore",
      period: "Sept 2024 - Sept 2025",
      description: "Guided students in FEA lab simulations and delivered lectures on emissions. Developed departmental financial analyses and assisted in preparing institutional performance reports."
    },
    {
      id: 3,
      role: "Maintenance Engineering Intern",
      company: "Fatimafert Limited | Sheikhupura",
      period: "July 2023 - Aug 2023",
      description: "Assisted with gas turbine maintenance planning and site monitoring. Investigated pump bearing failures and conducted plant safety assessments."
    },
    {
      id: 4,
      role: "Manufacturing Engineering Intern",
      company: "Pak Elektron Limited Unit-2 | Kasur",
      period: "June 2023 - July 2023",
      description: "Developed manufacturing process flow charts for deep freezers and assisted in creating an electronic tracking system for foaming operations."
    }
  ] as Experience[],
  projects: [
    {
      id: 1,
      title: "Heat Shield Enclosure",
      category: "Thermal Analysis",
      focusArea: "Thermodynamics",
      description: "Designed an insulation layer for circuitry to maintain <85°C for 10 minutes in a 450°C furnace environment. Achieved <2.5°C error vs experimental data.",
      specs: ["Ansys Fluent", "Conjugate Heat Transfer", "Aerogel"],
      image: "/Projects/project1.png",
      link: "#"
    },
    {
      id: 2,
      title: "Spirometer Flow Analysis",
      category: "CFD",
      focusArea: "Aerodynamics",
      description: "Optimized blade orientation to maximize flow velocity. Validated laminar flow assumptions and pressure drop calculations at sensor interface.",
      specs: ["Laminar Flow", "Turbomachinery", "Optimization"],
      image: "/Projects/project2.png", 
      link: "#"
    },
    {
      id: 3,
      title: "Universal Coupling FEA",
      category: "Structural Analysis",
      focusArea: "Structural Integrity",
      description: "Static structural analysis of a coupling assembly under 170 MN/m torque. Identified max stress concentration of 300 MPa at shaft key.",
      specs: ["Static Structural", "Von Mises Stress", "Mesh Convergence"],
      image: "/Projects/project3.png",
      link: "#"
    },
    {
      id: 4,
      title: "Clock Escapement Motion",
      category: "Multi-body Dynamics",
      focusArea: "Turbomachinery",
      description: "Motion study of a pendulum-operated escapement mechanism. Analyzed stepwise acceleration and kinematic precision of the gear train.",
      specs: ["SolidWorks Motion", "Kinematics", "Mechanism Design"],
      image: "/Projects/project4.png",
      link: "#"
    }
  ] as Project[],
  certifications: [
    {
      id: 101,
      title: "M.Sc. Thermal Power",
      issuer: "UET Lahore",
      date: "2024",
      pdf: "/Certificates/M.Sc. Thermal Power.pdf",
      description: "Master of Science in Thermal Power Engineering, focusing on advanced thermodynamics, heat transfer, and power plant optimization.",
      skills: ["Thermodynamics", "Heat Transfer", "Power Plants"],
      link: "#"
    },
    {
      id: 102,
      title: "B.Sc. Mechanical Engineering",
      issuer: "UET Lahore",
      date: "2021",
      pdf: "/Certificates/B.Sc. Mechanical Engineering.pdf",
      description: "Bachelor of Science in Mechanical Engineering. Core coursework in fluid mechanics, structural analysis, and mechanical design.",
      skills: ["Fluid Mechanics", "Structural Analysis", "Mechanical Design"],
      link: "#"
    },
    {
      id: 1,
      title: "D652 Steam Turbine Operations",
      issuer: "QATPL - ECOE",
      date: "1st March - 11th July 2025",
      pdf: "/Certificates/D652 Steam Turbine Operations.pdf",
      description: "Comprehensive training on the core operations of the D652 Steam Turbine, covering standard procedures, monitoring, and performance optimization in a thermal power setting.",
      skills: ["Steam Turbine", "Operations", "D652"],
      link: "#"
    },
    {
      id: 2,
      title: "Combined Cycle Operations",
      issuer: "QATPL - ECOE",
      date: "8th Dec 2025 - 7th Jan 2026",
      pdf: "/Certificates/Combined Cycle Operations.pdf",
      description: "Specialized operational training for combined cycle power plants, focusing on the efficient integration of gas and steam turbine cycles.",
      skills: ["Combined Cycle", "Power Plant", "Operations"],
      link: "#"
    },
    {
      id: 3,
      title: "Heat Recovery Steam Generator Operations",
      issuer: "QATPL - ECOE",
      date: "20th Jan - 28th Feb 2025",
      pdf: "/Certificates/Heat Recovery Steam Generator Operations.pdf",
      description: "Detailed study and practical methodologies for managing and operating Heat Recovery Steam Generators (HRSG) to maximize thermal efficiency.",
      skills: ["HRSG", "Steam Generator", "Thermal Efficiency"],
      link: "#"
    },
    {
      id: 4,
      title: "9HA.01 Gas Turbine Operations (Advanced)",
      issuer: "QATPL - ECOE",
      date: "1st June - 31st July 2025",
      pdf: "/Certificates/9HA.01 Gas Turbine Operations (Advanced).pdf",
      description: "Advanced-level training on the operation, critical monitoring, and operational optimization of the high-efficiency 9HA.01 Gas Turbine.",
      skills: ["Gas Turbine", "Advanced Operations", "9HA.01"],
      link: "#"
    },
    {
      id: 5,
      title: "9HA.01 Gas Turbine Maintenance",
      issuer: "QATPL - ECOE",
      date: "1st July 2025 - 5th Dec 2025",
      pdf: "/Certificates/9HA.01 Gas Turbine Maintenance.pdf",
      description: "Extensive maintenance training covering inspection, mechanical repair, and preventative upkeep strategies for the 9HA.01 Gas Turbine.",
      skills: ["Maintenance", "Gas Turbine", "Diagnostics"],
      link: "#"
    },
    {
      id: 6,
      title: "ALSPA Steam Turbine Control System Fundamentals",
      issuer: "QATPL - ECOE",
      date: "1st July - 30th Sep 2025",
      pdf: "/Certificates/ALSPA Steam Turbine Control System Fundamentals.pdf",
      description: "Foundational principles and operational techniques for managing the ALSPA Control System used in regulating steam turbine parameters.",
      skills: ["ALSPA", "Control Systems", "Fundamentals"],
      link: "#"
    },
    {
      id: 7,
      title: "Mark VIe Control System Maintenance Extended",
      issuer: "QATPL - ECOE",
      date: "1st Aug - 31st Oct 2025",
      pdf: "/Certificates/Mark VIe Control System Maintenance Extended.pdf",
      description: "Extended technical program focusing on the maintenance, hardware diagnostics, and systematic upkeep of the Mark VIe Control System.",
      skills: ["Mark VIe", "Maintenance", "Hardware"],
      link: "#"
    },
    {
      id: 8,
      title: "D652 Steam Turbine Operations (Advanced)",
      issuer: "QATPL - ECOE",
      date: "14th July - 5th Sep 2025",
      pdf: "/Certificates/D652 Steam Turbine Operations (Advanced).pdf",
      description: "Advanced techniques and complex operational scenarios for managing the D652 Steam Turbine safely and efficiently under varying loads.",
      skills: ["Steam Turbine", "Advanced Operations", "D652"],
      link: "#"
    },
    {
      id: 9,
      title: "Balance of Plant Operations",
      issuer: "QATPL - ECOE",
      date: "8th Sep - 30th Sep 2025",
      pdf: "/Certificates/Balance of Plant Operations.pdf",
      description: "Operational training encompassing the auxiliary systems and supporting mechanical components that form the Balance of Plant in a combined cycle facility.",
      skills: ["Balance of Plant", "Auxiliary Systems", "Operations"],
      link: "#"
    },
    {
      id: 10,
      title: "Mark VIe Control System Troubleshooting (Advanced)",
      issuer: "QATPL - ECOE",
      date: "3rd Nov - 5th Dec 2025",
      pdf: "/Certificates/Mark VIe Control System Troubleshooting (Advanced).pdf",
      description: "Advanced diagnostic skills and troubleshooting methodologies for rapidly resolving complex software and hardware issues in the Mark VIe Control System.",
      skills: ["Mark VIe", "Troubleshooting", "Diagnostics"],
      link: "#"
    },
    {
      id: 11,
      title: "D652 Steam Turbine Maintenance",
      issuer: "QATPL - ECOE",
      date: "1st Oct 2025 - 9th Jan 2026",
      pdf: "/Certificates/D652 Steam Turbine Maintenance.pdf",
      description: "In-depth mechanical training for the D652 Steam Turbine, encompassing preventative care, major teardowns, and mechanical servicing.",
      skills: ["Maintenance", "Steam Turbine", "Mechanical"],
      link: "#"
    },
    {
      id: 12,
      title: "Boiler - (Part 1 of 4) Inspection Fundamentals",
      issuer: "QATPL - ECOE",
      date: "8th Dec 2025 - 7th Jan 2026",
      pdf: "/Certificates/Boiler - (Part 1 of 4) Inspection Fundamentals.pdf",
      description: "Foundational knowledge, safety protocols, and essential practices for the thorough inspection and assessment of industrial boilers.",
      skills: ["Boiler", "Inspection", "Safety"],
      link: "#"
    },
    {
      id: 13,
      title: "9HA.01 Gas Turbine Operations",
      issuer: "QATPL - ECOE",
      date: "1st Feb - 30th May 2025",
      pdf: "/Certificates/9HA.01 Gas Turbine Operations.pdf",
      description: "Core operational training for the 9HA.01 Gas Turbine, heavily focusing on start-up sequences, standard operations, and shutdown procedures.",
      skills: ["Gas Turbine", "Operations", "9HA.01"],
      link: "#"
    },
    {
      id: 14,
      title: "Generator Operation and Excitation",
      issuer: "QATPL - ECOE",
      date: "1st March - 30th June 2025",
      pdf: "/Certificates/Generator Operation and Excitation.pdf",
      description: "Comprehensive overview of power generator operations, focusing on electrical excitation systems, voltage regulation, and grid stability.",
      skills: ["Generator", "Excitation", "Electrical Systems"],
      link: "#"
    }
  ] as Certification[]
};

const SKILLS = [
  {
    category: "Simulation (CFD/FEA)",
    icon: <Wind size={20} className="text-blue-400" />,
    items: ["Ansys Fluent", "Ansys Mechanical", "COMSOL Multiphysics", "Abaqus", "Star-CCM+", "OpenFOAM", "SimScale"]
  },
  {
    category: "Design & Modeling",
    icon: <PenTool size={20} className="text-purple-400" />,
    items: ["SolidWorks", "SpaceClaim", "AutoCAD", "PTC Creo", "Fusion 360", "DesignModeler"]
  },
  {
    category: "Computation & Code",
    icon: <Terminal size={20} className="text-green-400" />,
    items: ["MATLAB", "Python", "NumPy", "Pandas", "C++", "Fortran", "Linux/Bash"]
  },
  {
    category: "Tools & Standards",
    icon: <Wrench size={20} className="text-orange-400" />,
    items: ["LaTeX", "Git", "MS Office Suite", "ASME Standards", "Technical Writing", "Project Management"]
  }
];

// --- Components ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Random increment for organic feel
        const diff = Math.random() * 15;
        const next = Math.min(prev + diff, 100);
        
        if (next === 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); // Wait a bit at 100% before finishing
        }
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-black flex items-center justify-center overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
        {/* Large Background Number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <motion.span 
              className="text-[25vw] font-bold text-zinc-900/40 font-mono tracking-tighter leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
                {Math.round(progress)}
            </motion.span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo/Icon - Interlocking circles */}
            <div className="relative w-20 h-20 flex items-center justify-center">
                 <motion.div 
                    className="absolute w-12 h-12 border-2 border-white rounded-full"
                    style={{ x: -8 }}
                    animate={{ x: [-8, 0, -8], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 />
                 <motion.div 
                    className="absolute w-12 h-12 border-2 border-blue-500 rounded-full mix-blend-screen"
                    style={{ x: 8 }}
                    animate={{ x: [8, 0, 8], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 />
            </div>

            {/* Text */}
            <div className="text-center flex flex-col items-center gap-4">
                <h1 className="text-white text-xs md:text-sm font-bold tracking-[0.6em] uppercase pl-2">
                    Zain Ahmed
                </h1>
                
                {/* Progress Bar */}
                <div className="h-[1px] w-24 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-blue-500 box-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
            </div>
        </div>
    </motion.div>
  );
};

const CustomCursor = () => {
    // Use MotionValues to track mouse position directly without triggering React re-renders
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Create a smooth spring animation for the trailing circle
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only run on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const updateMousePosition = (e: MouseEvent) => {
            // Update MotionValues directly
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if element or any parent is clickable/interactive
            const isClickable = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer';
            
            setIsHovering(!!isClickable);
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [isVisible, cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Main Dot - Instant tracking */}
            <motion.div 
                className="absolute top-0 left-0 w-2.5 h-2.5 bg-white rounded-full mix-blend-difference"
                style={{ 
                    x: cursorX, 
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%" 
                }}
                animate={{ 
                    scale: isHovering ? 0 : 1
                }}
                transition={{ duration: 0.1 }} 
            />
            {/* Trailing Ring - Spring physics */}
            <motion.div 
                className="absolute top-0 left-0 w-8 h-8 border rounded-full border-blue-400"
                style={{ 
                    x: cursorXSpring, 
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{ 
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    borderColor: isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};

const Background = ({ isLightMode }: { isLightMode: boolean }) => (
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

const InteractiveMesh = ({ isLightMode }: { isLightMode: boolean }) => {
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

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300 backdrop-blur-sm mb-6">
        <span className="flex relative h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        {children}
    </div>
);

// --- Contact Modal Component ---
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setIsSuccess(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] m-auto w-full max-w-lg h-fit max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
             <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <X size={18} />
             </button>

             {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                           <Send size={32} />
                        </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
                    <p className="text-zinc-400 max-w-xs">Thank you for reaching out. I will review your message and get back to you shortly.</p>
                    <button onClick={resetForm} className="mt-6 px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors">
                        Close
                    </button>
                </div>
             ) : (
                <>
                    <div className="mb-8">
                        <Badge>Contact</Badge>
                        <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                        <p className="text-zinc-400">Have a project in mind? Let's discuss how we can work together.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-700" placeholder="Your Name" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-700" placeholder="your@email.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Message</label>
                            <textarea required rows={4} className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-700 resize-none" placeholder="Tell me about your project..."></textarea>
                        </div>

                        <button 
                            disabled={isSubmitting}
                            className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-2xl mt-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                        >
                            {isSubmitting ? "Sending..." : <>Send Message <ArrowRight size={18} /></>}
                        </button>
                    </form>
                </>
             )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onContactClick, onProjectsClick }: { onContactClick: () => void, onProjectsClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Career', href: '#experience' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          flex items-center gap-2 p-2 rounded-full border transition-all duration-300
          ${isScrolled 
            ? 'bg-zinc-900/80 border-zinc-800 backdrop-blur-xl shadow-lg shadow-black/50' 
            : 'bg-zinc-900/50 border-white/10 backdrop-blur-md'
          }
        `}
      >
        <div className="px-4 py-1">
            <span className="font-bold text-white tracking-tight">
                {isScrolled ? "Zain" : "Zain Ahmed"}
                <span className="text-blue-500">.</span>
            </span>
        </div>

        <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              link.name === 'Projects' ? (
                <button
                  key={link.name}
                  onClick={onProjectsClick}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                  {link.name}
                </button>
              ) : (
                <a 
                    key={link.name} 
                    href={link.href} 
                    className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                    {link.name}
                </a>
              )
            ))}
        </div>

        <div className="flex items-center gap-2 pr-1">
             <button onClick={onContactClick} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Contact
             </button>
             <button 
                className="md:hidden p-2 text-zinc-300 bg-zinc-800 rounded-full"
                onClick={() => setIsMobileMenuOpen(true)}
             >
                <Menu size={18} />
             </button>
        </div>
      </motion.nav>

       {/* Mobile Menu Overlay */}
       <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-20 z-[60] bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 origin-top"
          >
             <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-sm font-mono text-zinc-500">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 p-1 bg-zinc-800 rounded-full">
                    <X size={16} />
                </button>
             </div>
            {navLinks.map((link) => (
              link.name === 'Projects' ? (
                <button
                  key={link.name}
                  onClick={() => { setIsMobileMenuOpen(false); onProjectsClick(); }}
                  className="p-3 text-left text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors text-lg font-medium w-full"
                >
                  {link.name}
                </button>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors text-lg font-medium"
                >
                  {link.name}
                </a>
              )
            ))}
            <button onClick={() => { setIsMobileMenuOpen(false); onContactClick(); }} className="mt-2 p-3 text-center bg-blue-600 text-white rounded-xl font-medium w-full">
                Contact Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Modern Card ---
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    return (
        <div className={`group relative rounded-3xl border border-white/10 bg-zinc-900/50 p-1 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/10 ${className}`}>
             {/* Gradient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Inner Content */}
            <div className="relative h-full w-full rounded-[20px] bg-black/40 backdrop-blur-sm overflow-hidden">
                {children}
            </div>
        </div>
    );
}

// --- Animations ---
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }} 
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const Hero = ({ onContactClick, onProjectsClick, isLightMode }: { onContactClick: () => void, onProjectsClick: () => void, isLightMode: boolean }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownloadCV = () => {
    if (isDownloading || downloadComplete) return;
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      // Reset after a while
      setTimeout(() => setDownloadComplete(false), 3000);
    }, 2000);
  };

  return (
    <section className="min-h-screen flex flex-col pt-48 pb-12 px-6 relative overflow-hidden">
      {/* 3D Mesh Animation Background */}
      <InteractiveMesh isLightMode={isLightMode} />
      
      <div className="flex-1 flex flex-col justify-center z-10 w-full max-w-[1400px] mx-auto relative">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-start relative"
        >
            <h1 className="text-[16vw] md:text-[13vw] font-display tracking-normal leading-[0.85] uppercase m-0 blueprint-text-white">
              ENGINEERING
              <div className="blueprint-text-crosshair" style={{ left: '15%' }}>
                <div className="absolute" style={{ top: '50%', left: '50%', width: '4vw', height: '1px', background: 'rgba(255,255,255,0.4)', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                  <span className="blueprint-label" style={{ left: '100%', top: '50%', transform: 'translate(4px, -50%) rotate(45deg)' }}>ø 1.7 cm</span>
                </div>
              </div>
              <div className="blueprint-text-crosshair" style={{ left: '85%' }}></div>
              <div className="blueprint-dim-h" style={{ top: '-15%', left: '0', right: '0' }}>
                <span className="blueprint-label" style={{ left: '50%', top: '50%' }}>14.0 cm</span>
              </div>
              <div className="blueprint-dim-v" style={{ top: '0', bottom: '0', left: '-5%' }}>
                <span className="blueprint-label" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)' }}>4.5 cm</span>
              </div>
            </h1>
            <h1 className="text-[16vw] md:text-[13vw] font-display tracking-normal leading-[0.85] uppercase m-0 blueprint-text-blue">
              SIMULATED
              <div className="blueprint-text-crosshair" style={{ left: '25%' }}></div>
              <div className="blueprint-text-crosshair" style={{ left: '75%' }}></div>
              <div className="blueprint-dim-h" style={{ bottom: '-15%', left: '10%', right: '10%' }}>
                <span className="blueprint-label" style={{ left: '50%', top: '50%' }}>9.5 cm</span>
              </div>
              <div className="absolute" style={{ top: '20%', left: '25%', width: '4vw', height: '1px', background: 'rgba(255,255,255,0.4)', transform: 'rotate(-45deg)', transformOrigin: 'left center' }}>
                <span className="blueprint-label" style={{ left: '100%', top: '50%', transform: 'translate(0, -50%) rotate(45deg)' }}>R 3.3 cm</span>
              </div>
            </h1>
        </motion.div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto z-10 flex flex-col md:flex-row justify-end items-end mt-12 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-sm flex flex-col items-start md:items-end text-left md:text-right"
        >
          <div className="text-sm md:text-xl font-sans font-bold text-zinc-400 tracking-[0.3em] uppercase whitespace-nowrap mb-4">
            {DATA.name}
          </div>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            I'm {DATA.name}, a {DATA.title} turning complex physics into precise engineering solutions through advanced simulations.
          </p>
          
          <div className="flex flex-row gap-3 md:gap-4 justify-start md:justify-end w-full">
            <button 
              onClick={onProjectsClick} 
              className="group relative flex-1 md:flex-none flex items-center justify-center rounded-full overflow-hidden p-[1px] transition-all"
            >
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative flex items-center justify-center gap-2 bg-white hover:bg-zinc-950 border border-white group-hover:border-transparent px-4 md:px-8 py-3 md:py-4 rounded-full w-full h-full z-10 transition-colors text-black hover:text-white font-bold text-xs md:text-base whitespace-nowrap">
                VIEW PROJECTS <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </div>
            </button>
            <a 
              href="/Zain_Ahmed_CV.pdf"
              download="Zain_Ahmed_CV.pdf"
              onClick={handleDownloadCV} 
              className={`flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-full border transition-all flex items-center justify-center gap-2 font-medium min-w-0 md:min-w-[180px] text-xs md:text-base whitespace-nowrap
                ${downloadComplete 
                  ? 'bg-green-500/20 border-green-500 text-green-400' 
                  : isDownloading
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-300 pointer-events-none'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-white hover:text-black hover:border-white'
                }`}
            >
              {downloadComplete ? (
                <>Downloaded <Check size={16} className="md:w-[18px] md:h-[18px]" /></>
              ) : isDownloading ? (
                <>Downloading... <Loader2 size={16} className="animate-spin md:w-[18px] md:h-[18px]" /></>
              ) : (
                <>Download CV <Download size={16} className="md:w-[18px] md:h-[18px]" /></>
              )}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix/prefix
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match ? match[1] : "";
  const targetNumber = match ? parseInt(match[2], 10) : parseInt(value, 10) || 0;
  const suffix = match ? match[3] : "";

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetNumber, {
        duration: 2,
        ease: "easeOut",
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = prefix + Math.round(val) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, targetNumber, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

const Stats = () => {
    const stats = [
      { value: "3+", label: "YEARS EXPERIENCE", desc: "Specializing in computational fluid dynamics and thermal analysis." },
      { value: "20+", label: "PROJECTS DELIVERED", desc: "Successful engineering simulations and optimization studies." },
      { value: "15%", label: "EFFICIENCY GAIN", desc: "Average performance improvement in optimized thermal systems." },
      { value: "100%", label: "SATISFACTION", desc: "Consistently meeting high-precision engineering standards." }
    ];
  
    return (
      <section className="py-24 relative z-10">
        {/* Glowing Separator Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[4px] opacity-20"></div>
        
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[4px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="flex flex-col items-start text-left">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-blue-500 font-bold text-xs tracking-[0.2em] uppercase mb-3">
                    {stat.label}
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                    {stat.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    );
  };

const BentoGrid = () => (
  <section id="about" className="py-24 px-6 relative z-10">
    <div className="max-w-6xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    Core Competencies
                </h2>
                <p className="text-zinc-400 max-w-lg">
                    Combining academic rigor with practical application across thermal, structural, and fluid domains.
                </p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-zinc-800 mx-8 mb-2"></div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        
        {/* Focus Areas (Prominent Top Row) */}
        <FadeIn className="md:col-span-3 h-full">
            <Card className="h-full">
                <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                                <Activity className="text-green-400" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Focus Areas</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-blue-500/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Aerodynamics</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Computational fluid dynamics and airflow optimization.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-red-500/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-red-500 mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Thermodynamics</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Heat transfer and thermal management systems.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-purple-500/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Structural Integrity</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Finite element analysis and stress testing.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-yellow-500/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Turbomachinery</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Rotating equipment and fluid machinery design.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </FadeIn>

        {/* Education Stack (Shifted to Bottom Right) */}
        <FadeIn className="md:col-span-1 h-full" delay={0.2}>
            <Card className="h-full">
                <div className="p-6 h-full flex flex-col justify-center gap-6 relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-white border-b border-zinc-800 pb-4 mb-6">
                            <GraduationCap size={18} className="text-blue-400" />
                            <span className="font-bold">Education</span>
                        </div>
                        <div className="space-y-6">
                            {DATA.education.map((edu, i) => (
                                <div key={i}>
                                    <div className="text-sm font-bold text-white">{edu.degree}</div>
                                    <div className="text-xs text-zinc-500 mt-1">{edu.school}</div>
                                    <div className="text-xs text-blue-400 font-mono mt-1">{edu.grade}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </FadeIn>

        {/* Latest Role (Large Bottom Left) */}
        <FadeIn className="md:col-span-2 h-full" delay={0.1}>
            <Card className="h-full">
                <div className="p-8 h-full flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700"><Layers size={18} className="text-white"/></div>
                            <div>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider block">Current Position</span>
                                <span className="font-bold text-white text-lg">{DATA.experience[0].role}</span>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">
                            {DATA.experience[0].period}
                        </span>
                    </div>
                    <div className="pl-2 border-l-2 border-zinc-800">
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {DATA.experience[0].description}
                        </p>
                    </div>
                </div>
            </Card>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Skills = () => (
    <section id="skills" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
             <FadeIn className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    Technical Arsenal
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    A comprehensive toolkit of industry-standard software and programming languages mastered over years of academic and practical application.
                </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SKILLS.map((skillGroup, idx) => (
                    <FadeIn key={idx} delay={idx * 0.1} className="h-full">
                        <Card className="h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700">
                                        {skillGroup.icon}
                                    </div>
                                    <h3 className="font-bold text-white text-sm">{skillGroup.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((item) => (
                                        <span key={item} className="px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors cursor-default">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </FadeIn>
                ))}
            </div>
        </div>
    </section>
);

const getFocusAreaColor = (area: string) => {
  switch (area) {
    case 'Aerodynamics':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
    case 'Thermodynamics':
      return 'bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
    case 'Structural Integrity':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
    case 'Turbomachinery':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
    default:
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
  }
};

const ProjectCard = ({ project, index }: { project: Project, index: number }) => (
  <div className="group relative h-[450px] w-full rounded-3xl p-[1px] overflow-hidden">
      {/* Animated Border */}
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      
      {/* Inner Card */}
      <div className="relative h-full w-full overflow-hidden rounded-[23px] bg-zinc-900 border border-white/10 group-hover:border-transparent transition-colors duration-300">
          {/* Background Image */}
          <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${project.image})` }}
          />
          
          {/* Dark Overlay - Gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/60" />
          
          {/* Content Container */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              {/* Focus Area Tag */}
              <div className="absolute top-8 left-8">
                  <span className={`px-4 py-1.5 border rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getFocusAreaColor(project.focusArea)}`}>
                      {project.focusArea}
                  </span>
              </div>

              {/* Large Number Watermark */}
              <div className="absolute top-8 right-8 text-8xl font-bold text-white/5 font-mono select-none transition-all duration-500 group-hover:text-white/10 group-hover:scale-110 pointer-events-none">
                  {`0${index + 1}`}
              </div>

              <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="text-blue-400 text-xs font-mono mb-2 uppercase tracking-widest">{project.category}</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                      {project.title}
                  </h3>
                  
                  <p className="text-zinc-300 max-w-md text-sm leading-relaxed mb-6 opacity-90 border-l-2 border-blue-500 pl-4">
                      {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                      {project.specs.map(spec => (
                          <span key={spec} className="px-3 py-1 text-xs border border-white/20 rounded-full text-white/80 backdrop-blur-md bg-white/5 font-mono">
                              {spec}
                          </span>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  </div>
);

const Projects = ({ onMoreClick }: { onMoreClick: () => void }) => (
  // Removed bg-black to allow global background
  <section id="projects" className="py-24 px-6 relative z-10">
    <div className="max-w-6xl mx-auto">
      <FadeIn className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Featured Projects</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">
              A selection of technical problems solved through simulation, analysis, and engineering principles.
          </p>
        </div>
        <button 
          onClick={onMoreClick}
          className="group relative flex items-center justify-center rounded-full overflow-hidden p-[1px] transition-all"
        >
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          <div className="relative flex items-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 group-hover:border-transparent px-6 py-3 rounded-full w-full h-full z-10 transition-colors">
            <span className="font-medium text-zinc-400 group-hover:text-white transition-colors">Discover more projects</span>
            <ArrowRight size={16} className="text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </button>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DATA.projects.slice(0, 2).map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.1}>
            <ProjectCard project={project} index={index} />
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const ProjectImageBlock = ({ project, index, onInView }: { project: Project, index: number, onInView: (index: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div className="h-screen w-full flex items-center justify-center snap-center snap-always">
      <div ref={ref} className="w-[90%] max-w-4xl aspect-video relative group">
        {/* Sketchy border effect */}
        <div className="absolute -inset-3 md:-inset-4 border border-white/20 rounded-sm transform -rotate-1 pointer-events-none hidden md:block transition-transform duration-700 group-hover:-rotate-2" />
        <div className="absolute -inset-3 md:-inset-4 border border-white/20 rounded-sm transform rotate-1 pointer-events-none hidden md:block transition-transform duration-700 group-hover:rotate-2" />
        
        <div className="w-full h-full rounded-sm overflow-hidden border border-white/10 relative bg-zinc-900 shadow-2xl">
          <img 
            src={project.image} 
            alt={project.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = ({ onBack, isLightMode }: { onBack: () => void, isLightMode: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#0a0a0a] h-screen w-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10">
      {/* Background Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <InteractiveMesh isLightMode={isLightMode} />
      </motion.div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-6 md:left-12 z-50 group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mix-blend-difference"
      >
        <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium tracking-widest text-sm uppercase">Back</span>
      </button>

      <div className="flex flex-col lg:flex-row w-full min-h-screen pb-32">
        {/* Left Side: Scrolling Images */}
        <div className="w-full lg:w-[55%] flex flex-col px-6 md:px-12 lg:pl-24 lg:pr-12">
          {DATA.projects.map((project, index) => (
            <ProjectImageBlock 
              key={project.id} 
              project={project} 
              index={index} 
              onInView={setActiveIndex} 
            />
          ))}
        </div>

        {/* Right Side: Sticky Text */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-6 md:px-12 lg:pr-24 lg:pl-12 py-12 lg:py-0 pointer-events-none">
          <div className="w-full max-w-lg pointer-events-auto">
            {/* Header */}
            <div className="mb-10 hidden lg:block">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xl tracking-tight text-white uppercase font-bold">Projects</span>
                <a 
                  href="/Zain_Ahmed_Projects.pdf"
                  download="Zain_Ahmed_Projects.pdf"
                  className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <span className="font-mono text-xs uppercase tracking-widest">Download Info</span>
                  <Download size={14} className="group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
              <div className="h-px w-full bg-zinc-800"></div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-blue-500/60 font-mono text-xs tracking-[0.3em]">
              <span>[</span>
              <span className="text-blue-400">0{activeIndex + 1}</span>
              <span>/</span>
              <span>0{DATA.projects.length}</span>
              <span>]</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                <div className="mb-5">
                  <span className={`px-4 py-1.5 border rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getFocusAreaColor(DATA.projects[activeIndex].focusArea)}`}>
                      {DATA.projects[activeIndex].focusArea}
                  </span>
                </div>
                <h2 className="text-4xl xl:text-5xl font-bold text-white tracking-tight mb-3 uppercase">
                  {DATA.projects[activeIndex].title}
                </h2>
                
                <div className="text-blue-400 font-medium mb-6 text-base flex items-center gap-3">
                  <span className="h-px w-6 bg-blue-500/50"></span>
                  {DATA.projects[activeIndex].category}
                </div>
                
                <p className="text-zinc-400 text-base leading-relaxed mb-6">
                  {DATA.projects[activeIndex].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {DATA.projects[activeIndex].specs.map(spec => (
                    <span key={spec} className="px-3 py-1.5 text-[10px] border border-blue-500/20 rounded-full text-blue-300/80 bg-blue-500/5 font-mono group-hover:border-blue-500/40 transition-colors">
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Projects Page Footer - Fixed */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-6 md:px-12 lg:px-24 pb-8 pt-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent">
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <Github size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="mailto:zain@example.com" className="text-zinc-500 hover:text-emerald-400 transition-colors">
              <Mail size={16} />
            </a>
          </div>
          <div className="text-zinc-500 text-[9px] font-mono tracking-[0.2em] uppercase">
            © ALL RIGHTS RESERVED ZAIN AHMED
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
    return (
      <motion.div 
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         className="relative pl-8 md:pl-12 py-6 group"
      >
         {/* Dot */}
         <div className="absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-blue-500 group-hover:border-blue-400 group-hover:scale-150 transition-all duration-300 shadow-[0_0_0_4px_rgba(0,0,0,1)] z-10">
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:animate-ping"></div>
         </div>
  
         {/* Content */}
         <div className="flex flex-col sm:flex-row gap-4 sm:items-baseline justify-between mb-2">
             <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
             <span className="text-sm font-mono text-zinc-500 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-blue-500/30 transition-colors">{exp.period}</span>
         </div>
         <div className="text-zinc-400 font-semibold mb-4 flex items-center gap-2">
           <Briefcase size={14} className="text-blue-500" />
           {exp.company} 
         </div>
         <p className="text-zinc-400 leading-relaxed text-sm max-w-2xl group-hover:text-zinc-300 transition-colors">
           {exp.description}
         </p>
      </motion.div>
    )
  }

const CertificationCard = ({ cert, index, onClick }: { cert: Certification; index: number; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group relative rounded-2xl p-[1px] overflow-hidden cursor-pointer h-full bg-zinc-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
  >
    {/* Animated Border Line */}
    <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#3b82f6_100%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Inner Card */}
    <div className="relative h-full w-full rounded-[15px] bg-zinc-950 flex flex-col p-6">
      {/* Large Number Watermark */}
      <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 font-mono select-none pointer-events-none">
          {`0${index + 1}`}
      </div>
      <div className="flex flex-col flex-1 z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">{cert.date}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
          {cert.title}
        </h3>
        <p className="text-zinc-400 text-sm mt-auto">
          {cert.issuer}
        </p>
      </div>
    </div>
  </div>
);

const Certifications = ({ onMoreClick, onCertClick }: { onMoreClick: () => void, onCertClick: (cert: Certification) => void }) => (
  <section id="certifications" className="py-24 px-6 relative z-10">
    <div className="max-w-6xl mx-auto">
      <FadeIn className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Certifications</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">
              Continuous learning and professional development in engineering and simulation.
          </p>
        </div>
        <button 
          onClick={onMoreClick}
          className="group relative flex items-center justify-center rounded-full overflow-hidden p-[1px] transition-all"
        >
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          <div className="relative flex items-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 group-hover:border-transparent px-6 py-3 rounded-full w-full h-full z-10 transition-colors">
            <span className="font-medium text-zinc-400 group-hover:text-white transition-colors">View all certifications</span>
            <ArrowRight size={16} className="text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </button>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DATA.certifications.slice(0, 3).map((cert, index) => (
          <FadeIn key={cert.id} delay={index * 0.1}>
            <CertificationCard cert={cert} index={index} onClick={() => onCertClick(cert)} />
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const CertificationsPage = ({ onBack, onCertClick, isLightMode }: { onBack: () => void, onCertClick: (cert: Certification) => void, isLightMode: boolean }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-8 pb-24 relative z-10 bg-black">
      {/* Background Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <InteractiveMesh isLightMode={isLightMode} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        <FadeIn className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6">Certifications</h1>
          <p className="text-zinc-400 max-w-2xl text-xl">
              A complete record of my professional certifications and continuous learning achievements.
          </p>
        </FadeIn>

        <div className="w-full border-t border-white/10">
          {DATA.certifications.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1}>
              <div 
                onClick={() => onCertClick(cert)}
                className="group relative border-b border-white/10 py-12 md:py-16 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer overflow-hidden"
              >
                  {/* Animated Bottom Border */}
                  <div className="absolute bottom-0 left-0 h-[1px] bg-blue-500 w-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-20"></div>
                  
                  <div className="relative z-10 flex-1 md:w-1/2">
                      <div className="flex items-center gap-4 mb-4">
                          <span className="text-blue-500/40 font-mono text-sm">{`0${index + 1}`}</span>
                          <div className="h-px w-8 bg-blue-500/20"></div>
                          <span className="text-blue-400 text-xs font-mono uppercase tracking-widest">{cert.issuer}</span>
                      </div>
                      <h3 className="text-4xl md:text-6xl font-bold text-white group-hover:translate-x-4 transition-transform duration-500 tracking-tight">
                          {cert.title}
                      </h3>
                  </div>

                  <div className="relative z-10 mt-6 md:mt-0 md:w-1/3 md:text-right flex flex-col md:items-end">
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md group-hover:text-zinc-300 transition-colors">
                          {cert.description}
                      </p>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                          {cert.skills.map(skill => (
                              <span key={skill} className="px-3 py-1 text-xs border border-blue-500/20 rounded-full text-blue-300/80 backdrop-blur-md bg-blue-500/5 font-mono group-hover:border-blue-500/40 transition-colors">
                                  {skill}
                              </span>
                          ))}
                      </div>
                  </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExperienceList = () => (
  <section id="experience" className="py-24 px-6 relative z-10">
    <div className="max-w-4xl mx-auto">
      {/* Explicitly using motion.h2 directly to control visibility more robustly */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-white mb-16 pl-6 border-l-4 border-blue-500"
      >
        Professional History
      </motion.h2>
      
      <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-2">
        {DATA.experience.map((exp, index) => (
           <TimelineItem key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <footer id="contact" className="pt-24 border-t border-zinc-900 bg-black relative overflow-hidden flex flex-col items-center">
     {/* Bottom Glow */}
     <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[100px] rounded-full opacity-30 pointer-events-none"></div>

    <div className="max-w-4xl mx-auto text-center relative z-10 px-6 w-full">
      <FadeIn>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
            Ready to optimize your designs?
        </h2>
        <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
            Reach out for collaboration on simulation projects, research, or thermal analysis consulting.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
            <a href={`mailto:${DATA.social.email}`} className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                <Mail size={18} /> {DATA.social.email}
            </a>
            <div className="flex gap-4">
                <a href={DATA.social.linkedin} className="p-4 rounded-full bg-zinc-900 text-white border border-zinc-800 hover:border-blue-500 hover:text-blue-400 transition-colors">
                    <Linkedin size={20} />
                </a>
                <a href={DATA.social.github} className="p-4 rounded-full bg-zinc-900 text-white border border-zinc-800 hover:border-white transition-colors">
                    <Github size={20} />
                </a>
            </div>
        </div>
      </FadeIn>
      
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 border-t border-zinc-900 pt-8 pb-8">
        <div className="mb-4 md:mb-0">© {new Date().getFullYear()} Zain Ahmed. All rights reserved.</div>
        <div className="flex gap-4">
            <span>Lahore, PK</span>
            <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi' })}</span>
        </div>
      </div>
    </div>

    {/* Massive Footer Text */}
    <div className="w-full overflow-hidden flex justify-center mt-8 pointer-events-none select-none">
      <h1 className="text-[22vw] font-display font-bold text-zinc-800/40 leading-[0.75] tracking-normal uppercase translate-y-[28%]">
        ZAIN AHMED
      </h1>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'projects' | 'certifications'>('home');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 selection:text-white bg-black">
      <CustomCursor />
      
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Background isLightMode={isLightMode} />
      
      <div className="absolute top-6 right-4 md:right-6 z-[60]">
        <button 
          onClick={() => setIsLightMode(!isLightMode)} 
          className={`relative flex items-center w-16 h-8 rounded-full p-1 transition-colors duration-300 ${isLightMode ? 'bg-zinc-200 border-zinc-300' : 'bg-zinc-800 border-white/10'} border shadow-lg`}
          aria-label="Toggle light mode"
        >
          <div className="absolute left-2 flex items-center justify-center text-zinc-400">
            <Moon size={14} />
          </div>
          <div className="absolute right-2 flex items-center justify-center text-zinc-500">
            <Sun size={14} />
          </div>
          <motion.div
            className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-md ${isLightMode ? 'bg-white text-yellow-500' : 'bg-zinc-950 text-blue-400'}`}
            animate={{ x: isLightMode ? 32 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {isLightMode ? <Sun size={14} /> : <Moon size={14} />}
          </motion.div>
        </button>
      </div>

      {currentPage === 'home' ? (
        <>
          <Navbar onContactClick={() => setIsContactOpen(true)} onProjectsClick={() => setCurrentPage('projects')} />
          <main>
            <Hero onContactClick={() => setIsContactOpen(true)} onProjectsClick={() => setCurrentPage('projects')} isLightMode={isLightMode} />
            <Stats />
            <BentoGrid />
            <Skills />
            <Projects onMoreClick={() => setCurrentPage('projects')} />
            <Certifications onMoreClick={() => setCurrentPage('certifications')} onCertClick={setSelectedCert} />
            <ExperienceList />
          </main>
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
          <Contact />
        </>
      ) : currentPage === 'projects' ? (
        <ProjectsPage onBack={() => setCurrentPage('home')} isLightMode={isLightMode} />
      ) : (
        <CertificationsPage onBack={() => setCurrentPage('home')} onCertClick={setSelectedCert} isLightMode={isLightMode} />
      )}

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[85vh] bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-zinc-900">
                <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
                <div className="flex items-center gap-3">
                  <a 
                    href={selectedCert.pdf} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    <span className="hidden sm:inline">Open in New Tab</span>
                  </a>
                  <button onClick={() => setSelectedCert(null)} className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full bg-zinc-950 relative">
                <object data={selectedCert.pdf} type="application/pdf" className="w-full h-full border-none">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-950">
                    <p className="text-zinc-400 mb-6">Your browser is blocking the embedded PDF viewer or doesn't support it.</p>
                    <a href={selectedCert.pdf} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                      <ExternalLink size={20} />
                      Open Certificate in New Tab
                    </a>
                  </div>
                </object>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
    </div>
  );
};

export default App;