import { Mail, MapPin, Phone, Briefcase } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { motion } from "framer-motion";
import { contactData } from "@/data/contactData";
import { createWhatsAppSubmissionUrl } from "@/lib/whatsapp";

const iconMap = {
  Studio: MapPin,
  Telephone: Phone,
  Email: Mail,
  Careers: Briefcase,
} as const;

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.42985468885!2d79.080056!3d21.0954221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf0e7c30f4f3%3A0x4aab2d2075208ac9!2sArt%20Interiorz!5e0!3m2!1sen!2sin!4v1793284360809!5m2!1sen!2sin";

export function Contact({ fullWidthMap = false }: { fullWidthMap?: boolean }) {
  return (
    <>
      <section id="contact" className="relative py-28 lg:py-40 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>{contactData.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                {contactData.heading.prefix}{" "}
                <em className="italic text-gradient-gold">{contactData.heading.emphasis}</em>
                {contactData.heading.suffix}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">{contactData.intro}</p>
            </Reveal>

            <div className="mt-12 space-y-8">
              {contactData.infos.map((info, i) => {
                const Icon = iconMap[info.label as keyof typeof iconMap] ?? MapPin;
                return (
                  <Reveal key={info.label} delay={0.2 + i * 0.1}>
                    <div className="flex items-start gap-5 group">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-border group-hover:border-gold group-hover:text-gold transition-colors">
                        <Icon size={18} strokeWidth={1.4} />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                          {info.label}
                        </div>
                        <div className="mt-1 text-charcoal">{info.value}</div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {!fullWidthMap && (
              <Reveal delay={0.5}>
                <div className="mt-12 overflow-hidden border border-border" style={{ height: "280px" }}>
                  <iframe
                    title="Art Interiorz Studio Location"
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                {/* <div className="mt-3 flex items-center gap-2 text-[10px] tracking-luxury uppercase text-muted-foreground">
                  <MapPin size={11} className="text-gold" />
                  Shilpa Nagar, Somalwada, Nagpur · By appointment
                </div> */}
              </Reveal>
            )}
          </div>

          <Reveal delay={0.2} className="lg:col-span-7">
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.currentTarget;
                const formData = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

                window.location.href = createWhatsAppSubmissionUrl("New website project enquiry", {
                  name: formData.name ?? "",
                  email: formData.email ?? "",
                  phone: formData.phone ?? "",
                  projectType: formData.type ?? "",
                  projectDetails: formData.message ?? "",
                });
              }}
              className="bg-warm-white p-8 md:p-12 shadow-luxury border border-border"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", type: "text", name: "name" },
                  { label: "Email", type: "email", name: "email" },
                  { label: "Phone", type: "tel", name: "phone" },
                  { label: "Project Type", type: "text", name: "type" },
                ].map((f) => (
                  <label key={f.name} className="block">
                    <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                      {f.label}
                    </span>
                    <input
                      type={f.type}
                      name={f.name}
                      required
                      className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors"
                    />
                  </label>
                ))}
              </div>
              <label className="block mt-8">
                <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                  Tell us about your project
                </span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal resize-none transition-colors"
                />
              </label>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <p className="text-xs text-muted-foreground max-w-xs">
                  Continue in WhatsApp to review and send your enquiry.
                </p>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-charcoal text-warm-white px-9 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold transition-colors disabled:opacity-70"
                >
                  Continue in WhatsApp
                  <span className="h-px w-6 bg-warm-white group-hover:w-10 transition-all" />
                </button>
              </div>
            </motion.form>
          </Reveal>
        </div>
      </section>

      {fullWidthMap && (
        <section className="w-full bg-ivory border-t border-border">
          {/* <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-4">
            <Reveal>
              <div className="flex items-center gap-2 text-[10px] tracking-luxury uppercase text-muted-foreground">
                <MapPin size={11} className="text-gold" />
                Shilpa Nagar, Somalwada, Nagpur · By appointment
              </div>
            </Reveal>
          </div> */}
          <div className="w-full h-[min(52vh,480px)] min-h-[320px]">
            <iframe
              title="Art Interiorz Studio Location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      )}
    </>
  );
}
