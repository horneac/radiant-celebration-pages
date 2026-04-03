import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="py-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <p className="font-display text-3xl md:text-4xl font-light italic mb-4">
          Simona <span className="text-accent">&</span> Emanuel
        </p>
        <p className="font-body text-muted-foreground tracking-[0.2em] uppercase text-sm">
          4 Iulie, 2026, Negrești-Oaș
        </p>
        <div className="section-divider mt-8" />
        <p className="font-body text-sm text-muted-foreground mt-6">
          Made with ♥
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
