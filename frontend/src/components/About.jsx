import React from 'react';
import { cn } from "../lib/utils";
import BlurImage from './utils/BlurImage';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <section className="about-container relative flex min-h-[50rem] md:min-h-screen w-full items-center justify-center bg-black text-center py-20 px-4">
      <Helmet>
        <title>About AjinAju | Lift technician and gamer</title>
        <meta name="description" content="Learn more about Ajin Aju, a passionate full-stack developer with expertise in React, Node.js, AI/ML, UI/UX design, and entrepreneurial ventures. Discover my journey and goals." />
        <link rel="canonical" href="https://Ajin-sai-meka.vercel.app/about" />
        <meta property="og:title" content="About Ajin Aju | Full Stack Developer" />
        <meta property="og:description" content="Get to know Ajin Aju's background, skills, projects, and entrepreneurial aspirations in full-stack development and AI/ML." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://Ajin-sai-meka.vercel.app/about" />
        <meta property="og:image" content="https://Ajin-sai-meka.vercel.app/profile_pic.png" />
        <meta property="og:site_name" content="Ajin Aju's Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@IAMAjinSAI" />
        <meta name="twitter:title" content="About Ajin Aju | Full Stack Developer" />
        <meta name="twitter:description" content="Discover Ajin Aju's passion for coding, full-stack development, AI, and building impactful digital solutions." />
        <meta name="twitter:image" content="https://Ajin-sai-meka.vercel.app/profile_pic.png" />
      </Helmet>
      
      {/* Background pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Faded radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Profile Image */}
        <div className="w-64 h-64 rounded-full overflow-hidden flex-shrink-0 border-4 border-neutral-800">
        <BlurImage
          src="/profile_pic.png"
          blurhash="LAB._mEN5SkC-TNdofWX0hay}=WC"
          alt="Profile"
          className="w-full h-full"
        />
        </div>

        {/* Text Content */}
        <div className="text-left text-neutral-300 max-w-2xl ml-8 md:ml-16">
          <h1 className="text-4xl sm:text-7xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent py-8">
            About Me.
          </h1>
          <p className="text-lg leading-relaxed mb-4">
            I’m <strong>Ajin Aju</strong>, a passionate lift technician and gamer. By day, I ensure precision, safety, and innovation in lift systems; by night, I dive into immersive gaming worlds that fuel my creativity and problem-solving mindset. With a strong foundation in technology and a love for interactive experiences, I thrive at the intersection of engineering and gaming culture.</p>
          <p className="text-lg leading-relaxed mb-4">
            Currently pursuing my career as a Lift Technician at <strong>Fujitec Pvt Ltd</strong> in Chennai, I actively engage in hands-on projects that enhance my technical expertise and problem-solving skills. I continuously seek opportunities to learn and grow in real-world environments, applying my knowledge to ensure safety, efficiency, and reliability in lift systems. I enjoy tackling complex mechanical and electrical challenges with precision and delivering clean, effective solutions.</p>
          <p className="text-lg leading-relaxed mb-4">
            I actively experiment with innovative solutions and focus on translating abstract ideas into structured plans. This journey is helping me grow in real-world environments, building my entrepreneurial mindset while sharpening my skills in product thinking, strategy, and leadership. I enjoy tackling challenges with creativity and precision, continuously evolving the concept through ideation and feedback.</p>
          <p className="text-lg leading-relaxed">
            My goal is to work on challenging projects, learn from experienced mentors, and make meaningful contributions to the tech community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

