'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#0B0C10] border-t-2 border-[#FF007F]/40 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag & Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF007F]/20 border border-[#FF007F] mb-3">
            <HelpCircle className="w-4 h-4 text-[#FF007F]" />
            <span className="font-pixel text-[10px] sm:text-xs text-[#FF007F] tracking-widest uppercase">
              // 06. KNOWLEDGE BASE
            </span>
          </div>

          <h2 className="font-pixel text-3xl sm:text-4xl text-white tracking-tight uppercase mb-3">
            FREQUENTLY ASKED <span className="text-[#00F0FF]">QUESTIONS</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400">
            Got questions? We have answers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {SITE_CONFIG.faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`bg-[#12131C] border-2 transition-all ${
                  isOpen
                    ? 'border-[#00F0FF] shadow-[4px_4px_0px_#FF007F]'
                    : 'border-gray-800 hover:border-[#FF007F]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-pixel text-xs sm:text-sm text-white tracking-wide leading-relaxed">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 shrink-0 flex items-center justify-center font-pixel text-sm border-2 transition-all ${
                      isOpen
                        ? 'bg-[#00F0FF] text-black border-black shadow-[2px_2px_0px_#FF007F]'
                        : 'bg-black text-[#FF007F] border-gray-700'
                    }`}
                  >
                    {isOpen ? '[-]' : '[+]'}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-gray-800 text-gray-300 text-sm font-sans-custom leading-relaxed bg-[#0B0C10]/50">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
