import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const GameWalkthrough = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>See the game in action</p>
        <h2 className={styles.sectionHeadText}>Game Walkthrough</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        <p className='mb-4'>
          Watch as we explore RetroJump Adventure with friends, showcasing the exciting gameplay and unique features that await you!
        </p>

        <div className='relative w-full h-0 pb-[56.25%]'>
          <iframe
            src="https://www.youtube.com/embed/NAAIwkQ9j5c?si=hAmyXenQL28FVg50"
            title="RetroJump Adventure Walkthrough"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className='absolute top-0 left-0 w-full h-full rounded-lg shadow-lg'
          ></iframe>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(GameWalkthrough, "walkthrough");