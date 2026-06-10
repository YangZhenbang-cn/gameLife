'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemMessageProps {
  messages: string[];
}

export default function SystemMessage({ messages }: SystemMessageProps) {
  const [index, setIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(messages[0] || '');

  const cycleMessage = useCallback(() => {
    const nextIndex = (index + 1) % messages.length;
    setIndex(nextIndex);
    setCurrentMessage(messages[nextIndex]);
  }, [index, messages]);

  useEffect(() => {
    if (messages.length === 0) return;
    const timer = setInterval(cycleMessage, 8000);
    return () => clearInterval(timer);
  }, [messages, cycleMessage]);

  if (messages.length === 0) return null;

  return (
    <motion.div
      className="game-panel text-center py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className="section-title justify-center">💬 系统旁白</h3>

      <div
        className="relative overflow-hidden py-2"
        style={{ minHeight: '3rem' }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="font-display text-sm md:text-base italic px-4"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            &ldquo;{currentMessage}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-1.5 mt-2">
        {messages.map((_, i) => (
          <button
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: i === index ? 'var(--accent)' : 'var(--border-color)',
            }}
            onClick={() => {
              setIndex(i);
              setCurrentMessage(messages[i]);
            }}
            aria-label={`切换到第 ${i + 1} 条旁白`}
          />
        ))}
      </div>

      <button className="game-button mt-3 mx-auto" onClick={cycleMessage}>
        🔄 下一条
      </button>
    </motion.div>
  );
}