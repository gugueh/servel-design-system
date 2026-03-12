import { motion } from "framer-motion";

const GenericSection = ({ title, category, children }: { title: string; category: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">{category}</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">{title}</h1>
    </div>
    {children}
  </motion.div>
);

export default GenericSection;
