import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Heart } from "lucide-react";

const events = [
  {
    icon: Heart,
    title: "Ceremonia religioasă",
    time: "13:00",
    location: "Catedrala Ortodoxă „Duminica Tuturor Sfinților”",
    address: "Strada Victoriei 210, Negrești-Oaș",
    addressLink: "https://maps.app.goo.gl/9jar7gn9mre7Tkrk9"
  },
  {
    icon: MapPin,
    title: "Petrecerea de nuntă",
    time: "15:30",
    location: "Restaurant Dallas",
    address: "Strada Ion Creangă 146, Negrești-Oaș",
    addressLink: "https://maps.app.goo.gl/Mc3FsCF26ak1zCBbA"
  },
];

const DetailsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-lg tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            Ziua nunții
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-light"
          >
            Agenda zilei
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-divider"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-accent/30 mb-6 group-hover:border-accent transition-colors duration-500">
                <event.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl mb-2">{event.title}</h3>
              <p className="font-body text-xl text-accent font-medium mb-4">{event.time}</p>
              <p className="font-body text-lg font-medium">{event.location}</p>
              <p className="font-body text-muted-foreground text-sm mb-4">
                  {event.address}
              </p>
              <p>
                <a href={event.addressLink} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  Vezi pe hartă
                </a>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
