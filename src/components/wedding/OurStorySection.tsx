import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const OurStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-body text-lg tracking-[0.3em] uppercase text-muted-foreground mb-4"
        >
          Our Story
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl font-light mb-6"
        >
          A Love Written in the Stars
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="section-divider"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl leading-relaxed text-muted-foreground mt-8"
        >
          They say the best love stories are the ones you never expected. Ours began on a
          rainy afternoon in a small bookshop on the corner of Fifth Avenue. What started
          as a conversation over shared love for poetry turned into late-night walks, 
          spontaneous adventures, and a love that grows deeper with every passing day.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-lg md:text-xl leading-relaxed text-muted-foreground mt-6"
        >
          After four beautiful years together, James proposed under the Tuscan sunset — 
          the very place where we'll say "I do." We can't wait to celebrate this new 
          chapter with the people we love most.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-display text-2xl italic text-accent mt-10"
        >
          "Every love story is beautiful, but ours is my favorite."
        </motion.p>
      </div>
    </section>
  );
};

export default OurStorySection;
