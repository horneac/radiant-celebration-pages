import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import invitation1 from "@/assets/invitation-1.jpg";
import invitation2 from "@/assets/invitation-2.jpg";
import invitation3 from "@/assets/invitation-3.jpg";
import invitation4 from "@/assets/invitation-4.jpg";

const InvitationSection: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 font-serif italic"
                >
                    Cu inimile pline de emoție și bucurie,
                    <br />
                    Avem plăcerea de a vă invita la celebrarea căsătoriei noastre.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[invitation1, invitation2, invitation3].map((src, idx) => (
                        <motion.div
                            key={src}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 + idx * 0.2 }}
                            className="overflow-hidden rounded-lg shadow-md"
                        >
                            <img
                                src={src}
                                alt={`Invitation photo ${idx + 1}`}
                                className="w-full h-64 object-cover object-[center_70%] hover:scale-105 transition-transform duration-500"
                            />
                        </motion.div>
                    ))}
                </div>
                <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-display text-2xl italic text-accent mt-10"
        >
          “The greatest happiness of life is the conviction that we are loved.” 
          <br/>- Victor Hugo
        </motion.p>
            </div>
        </section>
    );
};

export default InvitationSection;