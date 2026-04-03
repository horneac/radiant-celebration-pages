import { motion } from "framer-motion";
import heroImage from "@/assets/hero-floral.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Romantic floral arrangement"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground font-body text-lg md:text-xl tracking-[0.3em] uppercase mb-6"
        >
          Ne căsătorim!
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-4"
        >
          Simona <span className="text-accent font-light italic">&</span> Emanuel
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="section-divider my-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-body text-xl md:text-2xl text-muted-foreground tracking-wider"
        >
          4 Iulie, 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="font-body text-lg text-muted-foreground mt-2 tracking-wide"
        >
          Restaurant Dallas, Negrești-Oaș
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-12"
        >
          <a
            href="#rsvp"
            className="inline-block border border-accent text-accent-foreground px-10 py-3 font-body text-lg tracking-[0.2em] uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-500"
          >
            Confirmare prezență
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
      >
        <div className="w-px h-12 bg-accent/50 mx-auto mb-2" />
        <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">Scroll</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
