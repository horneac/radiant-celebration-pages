import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveRsvp, getGuestByToken, RsvpResponse, RsvpData } from "@/lib/rsvp-storage";

const RsvpSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [guestToken, setGuestToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<RsvpData>({
    name: "",
    email: "",
    guests_count: "1",
    child_guest_count: "0",
    attending: "yes",
    dietary_needs: "",
    message: "",
    phone_number: "",
    needs_accomodation: "no",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setGuestToken(token);
      const guest = getGuestByToken(token);
      if (guest) {
        setFormData((prev) => ({ ...prev, name: guest.name, email: guest.email }));
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone_number.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    saveRsvp({ ...formData })
      .then((data) => {
        if (data.error) {
          if (data.error.code === "23505") {
            toast.error("Se pare că ați trimis deja o confirmare pentru acest numar de telefon. Dacă doriți să actualizați informațiile, vă rugăm să ne contactați direct.");
            return;
          }
          toast.error("A apărut o eroare la salvarea confirmării. Vă rugăm să încercați din nou.");
          console.error("Error saving RSVP:", data.error);
        } else {
          setSubmitted(true);
          toast.success("Multumim pentru confirmare! Abia așteptăm să sărbătorim împreună.");
          console.log("RSVP saved:", data);
        }
      })
      .catch((error) => {
        toast.error("A apărut o eroare la salvarea confirmării. Vă rugăm să încercați din nou.");
        console.error("Error saving RSVP:", error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 md:py-32 px-6 bg-card">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-accent text-5xl mb-6">♥</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
            Mulțumim!
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Am primit confirmarea ta și abia așteptăm să sărbătorim împreună.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" ref={ref} className="py-24 md:py-32 px-6 bg-card">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-lg tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            Va așteptăm cu drag!
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-light"
          >
            Confirmare prezență
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-divider"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-muted-foreground mt-4"
          >
            Vă rugăm să răspundeți până la data de 19 Iunie 2026
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                Nume complet *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Numele complet"
                className="bg-background border-border font-body text-base focus-visible:ring-accent"
                required
              />
            </div>
            <div>
              <label className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                Număr de telefon *
              </label>
              <Input
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Număr de telefon"
                className="bg-background border-border font-body text-base focus-visible:ring-accent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                Veți participa?
              </label>
              <select
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-border bg-background px-3 font-body text-base focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="yes">Da</option>
                <option value="no">Nu</option>
              </select>
            </div>
            <div>
              <label className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                Aveti nevoie de cazare?
              </label>
              <select
                name="needs_accomodation"
                value={formData.needs_accomodation}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-border bg-background px-3 font-body text-base focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="yes">Da</option>
                <option value="no">Nu</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                Număr de invitați
              </label>
              <select
                name="guests_count"
                value={formData.guests_count}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-border bg-background px-3 font-body text-base focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                Copii
              </label>
              <select
                name="child_guest_count"
                value={formData.child_guest_count}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-border bg-background px-3 font-body text-base focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
              Cerințe alimentare
            </label>
            <Input
              name="dietary_needs"
              value={formData.dietary_needs}
              onChange={handleChange}
              placeholder="Preferințe alimentare sau alergii (dacă este cazul)"
              className="bg-background border-border font-body text-base focus-visible:ring-accent"
            />
          </div>

          <div>
            <label className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
              Un mesaj pentru miri
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Scrieți urările dvs..."
              className="bg-background border-border font-body text-base focus-visible:ring-accent min-h-[120px]"
            />
          </div>

          <div className="text-center pt-4">
            <Button
              type="submit"
              className="h-16 text-wrap bg-accent text-accent-foreground hover:bg-gold-dark font-body text-base tracking-[0.2em] uppercase px-12 py-6 transition-all duration-500"
            >
              Trimite Confirmare prezență
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RsvpSection;
