import React, { useRef } from "react";
import { cn } from "../lib/utils";
import { CardSpotlight } from "./ui/card-spotlight";
import {
  FaWrench,
  FaTools,
  FaCog,
  FaGamepad,
  FaHeadset,
} from "react-icons/fa";
import { 
  GiElevator, 
  GiMechanicGarage,
  GiConsoleController,
  GiGamepadCross,
  GiJoystick
} from "react-icons/gi";
import { 
  MdElevator,
  MdEngineering,
  MdBuild,
  MdSportsEsports,
  MdElectricalServices
} from "react-icons/md";
import { 
  BsController,
  BsLightningCharge,
  BsGearFill,
  BsShieldCheck,
  BsSpeedometer2
} from "react-icons/bs";
import {
  AiOutlineSafety,
  AiOutlineThunderbolt
} from "react-icons/ai";
import {
  RiTeamLine,
  RiCustomerService2Fill
} from "react-icons/ri";
import {
  TbEngine,
  TbSettingsAutomation
} from "react-icons/tb";

const Skills = () => {
  const colors = [
    [255, 140, 0],   // Orange - Elevator
    [70, 130, 180],  // Steel Blue - Engineering
    [220, 20, 60],   // Crimson - Gaming
    [138, 43, 226],  // Purple - Controller
    [0, 191, 255],   // Deep Sky Blue - Electric
    [255, 215, 0],   // Gold - Tools
    [50, 205, 50],   // Lime Green - Safety
    [255, 69, 0],    // Red Orange - Maintenance
    [148, 0, 211],   // Violet - Esports
    [0, 206, 209],   // Turquoise - Tech
    [255, 105, 180], // Hot Pink - Gaming
    [30, 144, 255],  // Dodger Blue - Mechanical
    [255, 99, 71],   // Tomato - Speed
    [32, 178, 170],  // Light Sea Green - Automation
    [255, 165, 0],   // Orange - Customer Service
    [60, 179, 113],  // Medium Sea Green - Safety Check
    [186, 85, 211],  // Medium Orchid - Teamwork
    [100, 149, 237], // Cornflower Blue - Engine
    [255, 182, 193], // Light Pink - Controller
    [64, 224, 208],  // Turquoise - Power
  ];

  const icons = [
    <MdElevator key="elevator" className="text-white text-3xl" />,
    <FaWrench key="wrench" className="text-white text-2xl" />,
    <FaGamepad key="gamepad" className="text-white text-2xl" />,
    <GiConsoleController key="console" className="text-white text-3xl" />,
    <MdElectricalServices key="electrical" className="text-white text-3xl" />,
    <FaTools key="tools" className="text-white text-2xl" />,
    <MdEngineering key="engineering" className="text-white text-3xl" />,
    <MdBuild key="build" className="text-white text-2xl" />,
    <MdSportsEsports key="esports" className="text-white text-3xl" />,
    <FaCog key="cog" className="text-white text-2xl" />,
    <FaHeadset key="headset" className="text-white text-2xl" />,
    <BsLightningCharge key="lightning" className="text-white text-2xl" />,
    <BsSpeedometer2 key="speed" className="text-white text-2xl" />,
    <TbSettingsAutomation key="automation" className="text-white text-3xl" />,
    <RiCustomerService2Fill key="service" className="text-white text-2xl" />,
    <BsShieldCheck key="shield" className="text-white text-2xl" />,
    <RiTeamLine key="team" className="text-white text-2xl" />,
    <TbEngine key="engine" className="text-white text-3xl" />,
    <BsController key="controller2" className="text-white text-2xl" />,
    <AiOutlineThunderbolt key="thunder" className="text-white text-2xl" />,
  ];

  const audioSources = [
    "/e6-piano.mp3",
    "/d6-piano.mp3",
    "/b6-piano.mp3",
    "/g6-piano.mp3",
    "/f6-piano.mp3",
    "/a6-piano.mp3",
    "/c6-piano.mp3",
    "/d6-piano.mp3",
    "/e6-piano.mp3", 
    "/a6-piano.mp3",
    "/c6-piano.mp3",
    "/g6-piano.mp3",
    "/f6-piano.mp3",
    "/b6-piano.mp3",
    "/d6-piano.mp3",
    "/e6-piano.mp3",
    "/a6-piano.mp3",
    "/c6-piano.mp3",
    "/g6-piano.mp3",
    "/f6-piano.mp3",
  ];

  const audioRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const audio = new Audio(audioSources[index]);
    audioRefs.current[index] = audio;
    audio.play();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-12 sm:py-20 bg-black">
      
      {/* Background Grid */}
      <div
        className={cn(
          "absolute inset-0 z-0 pointer-events-none",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial Mask */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent z-20 mb-4 sm:mb-6">
        My Expertise
      </h2>

      {/* Prompts */}
      <div className="z-20 mb-6 text-lg font-semibold text-center">
        {/* Mobile: Tap Prompt */}
        <p className="block sm:hidden bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
          Get in touch icons to hear a sound🎶
        </p>

        {/* Desktop/Tablet: Hover Prompt */}
        <p className="hidden sm:block bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
          Hover over the icons to hear a sound 🎵
        </p>
      </div>

      {/* Icon Cards */}
      <div className="relative z-20 flex justify-center gap-3 flex-wrap max-w-5xl w-full">
      {icons.map((icon, index) => (
        <CardSpotlight
          key={index}
          className="h-18 w-18 rounded-full flex items-center justify-center bg-black"
          color={`rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]})`}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleMouseEnter(index)}
        >
          <div className="relative z-20">
            {icon}
          </div>
        </CardSpotlight>
      ))}
      </div>
    </div>
  );
};

export default Skills;