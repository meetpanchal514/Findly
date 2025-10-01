import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const PostItem = ({ addItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    contact: '',
    image: null,
  });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(formData);
    navigate('/view');
  };

  return (
    <motion.section
      className={clsx('post-item-page glass min-h-screen pt-20 p-4', { 'dark': isDark })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--text-primary)]">Post a Lost Item</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto glass p-6 md:p-8 rounded-2xl shadow-glass glass-inner">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-[var(--text-primary)]">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--glass-border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition duration-200 bg-[var(--glass-bg)] text-[var(--text-primary)]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-[var(--text-primary)]">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--glass-border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition duration-200 bg-[var(--glass-bg)] text-[var(--text-primary)]"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-[var(--text-primary)]">Location Lost</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--glass-border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition duration-200 bg-[var(--glass-bg)] text-[var(--text-primary)]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-[var(--text-primary)]">Contact Info</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--glass-border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition duration-200 bg-[var(--glass-bg)] text-[var(--text-primary)]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-[var(--text-primary)]">Upload Image (Optional)</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-3 border border-[var(--glass-border)] rounded-lg bg-[var(--glass-bg)] text-[var(--text-primary)]"
            accept="image/*"
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-[var(--accent)] text-[var(--text-primary)] p-3 rounded-lg hover:bg-[var(--accent)]/80 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </form>
    </motion.section>
  );
};

export default PostItem;