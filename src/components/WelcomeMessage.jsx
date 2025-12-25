import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
    return (
        <motion.p
            className='text-sm text-white leading-5 w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            Selamat datang di website Wonderkind Festival SMPIT Darul Qur-an Mulia
        </motion.p>
    );
};

export default WelcomeMessage;