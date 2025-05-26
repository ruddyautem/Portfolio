"use client";

import React from "react";
import { motion } from "framer-motion";

export const PageWrapper = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
