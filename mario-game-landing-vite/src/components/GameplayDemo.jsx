import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import gameplayVideo from '../assets/Mario Demo.mp4';
import posterImage from '../assets/cons.png';

const GameplayDemo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgress = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };

  return (
    <motion.div variants={fadeIn("", "", 0.1, 1)} className="mt-8">
      <div className="video-container relative">
        <video 
          ref={videoRef}
          className="w-full"
          poster={posterImage}
          preload="metadata"
          onTimeUpdate={handleProgress}
        >
          <source src={gameplayVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
          
          <div className="controls absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
            <button 
              onClick={togglePlay}
              className="bg-white text-black px-4 py-2 rounded"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div className="progress-bar-container w-full h-2 bg-gray-300 mt-2">
              <div className="progress-bar h-full bg-blue-500 w-0"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-secondary text-[17px] leading-[30px]">
          <h3 className="text-white text-[24px] font-bold mb-2">Key Gameplay Elements:</h3>
          <ul className="list-disc list-inside">
            <li>Navigate through various obstacles using W, A, D keys</li>
            <li>Collect power-ups to enhance your abilities</li>
            <li>Interact with friendly characters to progress in the story</li>
            <li>Watch out for unique messages and easter eggs throughout the game</li>
          </ul>
        </div>
      </motion.div>
  );
};

export default SectionWrapper(GameplayDemo, "gameplaydemo");