import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
      Welcome to RetroJump Adventure, a thrilling platformer that blends classic gameplay with modern twists. Leap through vibrant pixel-perfect worlds, overcome challenging obstacles, and embark on an epic quest filled with nostalgia and excitement. With intuitive controls, charming characters, and surprising power-ups, RetroJump Adventure offers a fresh take on the games you loved growing up. Are you ready to jump into the adventure?
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <Tilt key={service.title} className='xs:w-[250px] w-full'>
            <motion.div
              variants={fadeIn("left", "spring", index * 0.5, 0.75)}
              className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
            >
              <div
                options={{
                  max: 45,
                  scale: 1,
                  speed: 450
                }}
                className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className='w-16 h-16 object-contain'
                />
                <h3 className='text-white text-[20px] font-bold text-center'>
                  {service.title}
                </h3>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")