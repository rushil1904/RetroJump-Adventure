import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import './DonationComponent.css'; // Make sure to create this CSS file

const DonationComponent = () => {
  const [amount, setAmount] = useState('');

  const handleDonation = async () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "RetroJump Adventure",
      description: "Donation for game development",
      handler: function(response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Generous Donor",
        email: "donor@example.com"
      },
      theme: {
        color: "#89CFF0"
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Support the Adventure</p>
        <h2 className={styles.sectionHeadText}>Donate.</h2>
      </motion.div>

      <motion.p variants={fadeIn("", "", 0.1, 1)} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
        Help us create more exciting levels and features for RetroJump Adventure! Your donation will directly contribute to the game's development and improvement.
      </motion.p>

      <motion.div variants={fadeIn("up", "spring", 0.5, 0.75)} className='mt-20'>
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <div className="neon-input-container">
            <span className="neon-currency">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className='neon-input'
            />
          </div>
          <button
            onClick={handleDonation}
            className='bg-white text-tertiary mt-4 py-3 px-8 rounded-xl outline-none w-fit text-[18px] font-bold shadow-md shadow-primary'
          >
            Donate Now
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(DonationComponent, "donate");