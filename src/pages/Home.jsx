import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const Home = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll();
  const navScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className={clsx('home-page', { 'dark': isDark })}>
      <motion.section
        className="hero-glass text-center relative min-h-screen flex items-center justify-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 text-[var(--text-primary)] drop-shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Reunite with Your Lost Items
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-[var(--text-secondary)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Findly brings fluid, translucent experiences to help travelers recover lost treasures seamlessly.
          </motion.p>
          <div className="flex justify-center space-x-4 mb-8">
            {['👜', '🔑', '📱', '💼'].map((icon, index) => (
              <motion.span
                key={index}
                className="glass w-16 h-16 flex items-center justify-center rounded-full text-2xl shadow-glass"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.1, y: -10 }}
              >
                {icon}
              </motion.span>
            ))}
          </div>
          <Link
            to="/post"
            className="glass px-8 py-4 rounded-full text-[var(--text-primary)] hover:bg-[var(--accent)]/20 transition-all duration-300 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Report a Lost Item
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-50 animate-pulse" />
      </motion.section>

      <section className="container mx-auto py-16 px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How Findly Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Report Loss', desc: 'Submit details fluidly with glass-like forms.', icon: '📝', delay: 0 },
            { title: 'Authority Access', desc: 'Translucent views for seamless matching.', icon: '🔍', delay: 0.2 },
            { title: 'Reunite', desc: 'Connect with refractive notifications.', icon: '🤝', delay: 0.4 },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: step.delay, duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <span className="text-4xl mb-4 block">{step.icon}</span>
              <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">{step.title}</h3>
              <p className="text-[var(--text-secondary)]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;