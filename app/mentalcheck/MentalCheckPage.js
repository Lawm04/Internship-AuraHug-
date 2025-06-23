"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiClock, FiBarChart, FiLock, FiChevronRight } from 'react-icons/fi';

const questions = [
  "I feel happy most of the time.",
  "I have trouble sleeping or sleep too much.",
  "I feel confident in myself.",
  "I find it hard to concentrate.",
  "I feel anxious or worried regularly.",
  "I feel supported by people around me.",
  "I enjoy things I used to enjoy.",
  "I feel overwhelmed by daily tasks.",
  "I have had thoughts of self-harm.",
  "I feel hopeful about the future.",
  "I can manage stress effectively.",
  "I often feel lonely or isolated.",
  "I take good care of my physical health.",
  "I avoid social situations.",
  "I feel emotionally stable.",
];

const choices = [
  { label: "Strongly Disagree", value: 1, emoji: "😞" },
  { label: "Disagree", value: 2, emoji: "😕" },
  { label: "Neutral", value: 3, emoji: "😐" },
  { label: "Agree", value: 4, emoji: "🙂" },
  { label: "Strongly Agree", value: 5, emoji: "😊" },
];

export default function MentalCheck() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSelect = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    
    // Auto-advance to next question
    if (index < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(index + 1), 300);
    }
  };

  const handleSubmit = () => {
    if (answers.includes(null)) return alert("Please answer all questions.");
    setSubmitted(true);
  };

  const score = answers.reduce((a, b) => a + b, 0);
  const average = score / questions.length;

  const resultText =
    average >= 4
      ? "You're doing great! Keep taking care of your mind and body. 🌟"
      : average >= 2.5
      ? "You're doing okay, but don't hesitate to reach out if you feel stuck. 🤝"
      : "It might help to talk to a mental health professional. You deserve support. 💙";

  const resultColor = average >= 4 ? "from-green-500 to-emerald-400" : 
                     average >= 2.5 ? "from-amber-400 to-orange-400" : 
                     "from-rose-500 to-pink-400";

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors group"
          >
            <FiArrowLeft className="text-lg transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Mental Wellness Check
            </h1>
            <p className="text-gray-600 text-sm">
              {currentQuestion + 1} of {questions.length} questions
            </p>
          </div>
          
          <div className="w-10"></div> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full bg-gradient-to-r ${resultColor}`}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {!submitted ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Question Card */}
            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-white"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FiHeart className="text-purple-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentQuestion + 1}. {questions[currentQuestion]}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {choices.map((c) => (
                  <motion.button
                    key={c.label}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(currentQuestion, c.value)}
                    className={`py-3 px-4 rounded-xl border flex items-center gap-3 transition-all ${
                      answers[currentQuestion] === c.value
                        ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-300 shadow-inner"
                        : "bg-white border-gray-200 hover:border-purple-200"
                    }`}
                  >
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="text-left flex-1">{c.label}</span>
                    {answers[currentQuestion] === c.value && (
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <FiChevronRight className="text-white text-xs" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className={`px-5 py-2 rounded-lg flex items-center gap-2 ${
                  currentQuestion === 0 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-purple-600 hover:bg-purple-50"
                }`}
              >
                <FiArrowLeft />
                Previous
              </button>
              
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                >
                  Next
                  <FiChevronRight />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition flex items-center gap-2 shadow-lg"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-white"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 mb-6">
              <div className="text-5xl">
                {average >= 4 ? "🌟" : average >= 2.5 ? "🤝" : "💙"}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">
                Your Wellness Results
              </h2>
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full border border-purple-200">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Score: {average.toFixed(1)}/5
                  </span>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                {resultText}
              </p>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
              <h3 className="font-bold text-purple-700 mb-4">Personalized Recommendations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-purple-500 mb-2">
                    <FiClock className="text-xl mx-auto" />
                  </div>
                  <p className="text-sm">Mindful breathing exercises</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-purple-500 mb-2">
                    <FiBarChart className="text-xl mx-auto" />
                  </div>
                  <p className="text-sm">Daily mood tracking</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-purple-500 mb-2">
                    <FiLock className="text-xl mx-auto" />
                  </div>
                  <p className="text-sm">Professional resources</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setAnswers(Array(questions.length).fill(null));
                  setSubmitted(false);
                  setCurrentQuestion(0);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition flex items-center justify-center gap-2"
              >
                Retake Assessment
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-white text-purple-600 border border-purple-200 rounded-lg font-medium hover:bg-purple-50 transition flex items-center justify-center gap-2"
              >
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
