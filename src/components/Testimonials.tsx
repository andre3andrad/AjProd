'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const t = useTranslations('Testimonials');

  const reviews = [
    {
      id: 1,
      quote: "The team at AJ transformed our brand's presence on YouTube. We saw a 300% increase in retention.",
      author: "Sarah Jenkins",
      company: "TechFlow"
    },
    {
      id: 2,
      quote: "Incredible attention to detail. The commercial they produced exceeded all our expectations.",
      author: "Markus Berg",
      company: "Nordic Design"
    },
    {
      id: 3,
      quote: "Finally a production studio that understands the algorithm as well as they understand cinematography.",
      author: "Elena Rodriguez",
      company: "Creator"
    }
  ];

  return (
    <section className="w-full bg-[#15171B] text-[#F4F2ED] py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-archivo font-black text-4xl md:text-6xl uppercase tracking-tighter">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 md:p-10 border border-white/10 rounded-3xl bg-white/5"
            >
              <div className="text-[#E8B04B] mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="font-inter text-lg md:text-xl leading-relaxed mb-8 opacity-90">
                "{review.quote}"
              </p>
              <div>
                <h4 className="font-bold text-[#E8B04B]">{review.author}</h4>
                <p className="text-sm opacity-60">{review.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
