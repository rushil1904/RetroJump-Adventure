import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import GameplayDemo from './GameplayDemo';

const HowToPlay = () => {
    const [showDemo, setShowDemo] = useState(false);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Game Instructions</p>
        <h2 className={styles.sectionHeadText}>How to Play</h2>
      </motion.div>
      <motion.div variants={fadeIn("", "", 0.1, 1)} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
        <p>The game <span className="text-yellow-300 font-bold">works best on a device with keyboard support</span>. Use the following keys to control your character:</p>
        <ul className='list-disc list-inside mt-2 mb-4'>
          <li><strong>'W'</strong>: Up movement</li>
          <li><strong>'D'</strong>: Right movement</li>
          <li><strong>'A'</strong>: Left movement</li>
        </ul>
        <p>The game showcases unique messages on interaction with an object in the game. Reload the page for different permutations of the same.</p>
        <p>The game works best on <span className="text-yellow-300 font-bold">Chrome/Chromium-based desktop browsers</span>.</p>
      </motion.div>

      <motion.div variants={fadeIn("", "", 0.2, 1)} className='mt-4'>
        <button
          className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          onClick={() => setShowDemo(!showDemo)}
        >
          {showDemo ? 'Hide Gameplay Demo' : 'Watch Gameplay Demo'}
        </button>
      </motion.div>

      {showDemo && <GameplayDemo />}
    </>
  )
}

export default SectionWrapper(HowToPlay, "howtoplay")