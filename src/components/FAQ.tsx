"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Will this petition actually change anything?",
        answer: "Petitions like this have historically influenced football club decisions. While not guaranteed, collective fan action has led to managerial changes at major clubs. This demonstrates the strength of supporter sentiment."
    },
    {
        question: "Is this petition official or affiliated with Liverpool FC?",
        answer: "No, this is an independent, fan-run petition. It is not affiliated with, endorsed by, or connected to Liverpool Football Club, Fenway Sports Group, or the Premier League."
    },
    {
        question: "How do I know my signature is anonymous?",
        answer: "We only collect hashed IP addresses for spam prevention. No personal data, emails, or identifiable information is stored. Signatures are completely anonymous."
    },
    {
        question: "Can I withdraw my signature?",
        answer: "Due to the anonymous nature of signatures, individual withdrawals aren't possible. However, the petition represents sentiment at the time of signing."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 relative z-10 w-full max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black font-heading mb-4 tracking-tight">
                    Frequently Asked <span className="text-red-600">Questions</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Get answers to common questions about the petition
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card rounded-xl overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                            <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                            <ChevronDown
                                className={`w-5 h-5 text-red-400 transition-transform flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {openIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-6 pb-6"
                            >
                                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}