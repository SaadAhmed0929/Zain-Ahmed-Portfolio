import React from 'react';
import { Wind, PenTool, Terminal, Wrench } from 'lucide-react';
import { Project, Experience, Certification } from './types';

export const DATA = {
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
      period: "2025 - 2026",
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

export const SKILLS = [
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
