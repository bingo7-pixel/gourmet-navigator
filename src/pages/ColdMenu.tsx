import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const ColdMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <Utensils className="w-16 h-16 mx-auto text-[#E6C7A9]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-[#E6C7A9] mb-6"
        >
          Create Your Perfect Bowl
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-[#8B95A5] mb-12 max-w-lg mx-auto leading-relaxed"
        >
          Embark on a culinary journey! Customize your meal with our fresh ingredients 
          and unique flavors crafted just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/hot-food')}
            className="px-8 py-4 bg-[#E6C7A9] text-[#0A0F1C] rounded-full font-semibold 
                     transition-colors hover:bg-[#D4AF37] focus:outline-none focus:ring-2 
                     focus:ring-[#E6C7A9] focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
          >
            Start Building Your Bowl
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/cold-food')}
            className="px-8 py-4 border-2 border-[#E6C7A9] text-[#E6C7A9] rounded-full 
                     font-semibold transition-colors hover:bg-[#E6C7A9]/10 
                     focus:outline-none focus:ring-2 focus:ring-[#E6C7A9] 
                     focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
          >
            Explore Cold Menu
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ColdMenu;