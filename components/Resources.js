"use client";

import React from 'react';
import { Fugaz_One } from 'next/font/google';
import { FiActivity, FiHeadphones, FiMusic, FiHeart, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const ResourceCard = ({ title, items, color, icon }) => (
  <motion.div
    whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
    className={`bg-white p-6 rounded-2xl shadow-lg border-t-4 ${color} transition-all duration-300 border border-gray-100`}
  >
    <div className="flex items-center gap-3 mb-5">
      <div className={`p-3 rounded-xl ${color.replace('border-t-', 'bg-')} bg-opacity-10`}>
        {icon}
      </div>
      <h2 className={`text-2xl font-bold text-indigo-800 ${fugaz.className}`}>
        {title}
      </h2>
    </div>
    
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-2.5 mr-3 flex-shrink-0"></div>
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full text-gray-700 hover:text-indigo-600 transition-colors"
          >
            <span className="flex-1">{item.label}</span>
            <FiExternalLink className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
          </a>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function Resources() {
  const categories = [
    {
      title: "Stress & Mindfulness",
      color: "border-t-indigo-500",
      icon: <FiActivity className="text-indigo-600 text-xl" />,
      items: [
        { label: "APA – Stress Management", link: "https://www.apa.org/topics/stress" },
        { label: "Harvard – Mindfulness Meditation", link: "https://www.health.harvard.edu/mind-and-mood/mindfulness-meditation" },
        { label: "Mayo Clinic – Meditation Guide", link: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858" }
      ]
    },
    {
      title: "Guided Meditation Platforms",
      color: "border-t-indigo-500",
      icon: <FiHeadphones className="text-indigo-600 text-xl" />,
      items: [
        { label: "Insight Timer", link: "https://insighttimer.com/" },
        { label: "UCLA Mindful", link: "https://www.uclahealth.org/marc/mindful-meditations" },
        { label: "Headspace (YouTube)", link: "https://www.youtube.com/user/Getsomeheadspace" }
      ]
    },
    {
      title: "Media & Sounds",
      color: "border-t-indigo-500",
      icon: <FiMusic className="text-indigo-600 text-xl" />,
      items: [
        { label: "FreeSound – Meditation Audio", link: "https://freesound.org/" },
        { label: "Mixkit – Free Meditation Music", link: "https://mixkit.co/free-stock-music/meditation/" },
        { label: "Unsplash – Relaxing Visuals", link: "https://unsplash.com/" }
      ]
    },
    {
      title: "Mental Health Support",
      color: "border-t-indigo-500",
      icon: <FiHeart className="text-indigo-600 text-xl" />,
      items: [
        { label: "Mental Health America", link: "https://www.mhanational.org/" },
        { label: "Befrienders Worldwide", link: "https://www.befrienders.org/" },
        { label: "7 Cups – Emotional Support", link: "https://www.7cups.com/" }
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold mb-4 text-indigo-800 ${fugaz.className}`}
          >
            Helpful Resources
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Curated tools and resources to support your mental wellness journey
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={item}>
              <ResourceCard 
                title={category.title}
                items={category.items}
                color={category.color}
                icon={category.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-indigo-50 p-6 rounded-2xl border border-indigo-100"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-indigo-600 p-4 rounded-xl text-white">
              <FiHeart className="text-2xl" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Need immediate help?</h3>
              <p className="text-gray-700 mb-4">
                If you're in crisis, reach out to these 24/7 support services
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://suicidepreventionlifeline.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-indigo-700 rounded-lg font-medium border border-indigo-200 hover:bg-indigo-50 transition flex items-center gap-2"
                >
                  National Suicide Prevention Lifeline
                </a>
                <a 
                  href="https://www.crisistextline.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-indigo-700 rounded-lg font-medium border border-indigo-200 hover:bg-indigo-50 transition flex items-center gap-2"
                >
                  Crisis Text Line
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}