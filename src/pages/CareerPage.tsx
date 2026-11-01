import { useEffect } from "react";
import { createWhatsAppSubmissionUrl } from "@/lib/whatsapp";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { setPageSeo } from "@/lib/seo";

const roles = [
  "Senior Architect",
  "Junior Architect",
  "Interior Designer",
  "3D Visualizer",
  "Project Manager",
  "Other",
];

export default function CareerPage() {
  useEffect(() => {
    setPageSeo({
      title: "Careers | Interior Design Jobs in Nagpur | Art Interiorz",
      description: "Explore career opportunities at Art Interiorz in Nagpur. Join our interior design team as an architect, designer, 3D visualizer, or project manager.",
      canonicalUrl: "https://www.artinteriorz.com/career",
    });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    window.location.href = createWhatsAppSubmissionUrl("New website job application", {
      name: formData.name ?? "",
      email: formData.email ?? "",
      phone: formData.phone ?? "",
      role: formData.role ?? "",
      portfolio: formData.portfolio ?? "",
      coverLetter: formData.coverLetter ?? "",
    });
  }

  return (
    <SiteShell>
      <PageHero
        title="Join Our Team"
        crumb="Careers"
        image="/assets/hall.jpg"
      />

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <Reveal>
            <SectionLabel>Work with us</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-charcoal">
              Partner with us <em className="italic text-gradient-gold">or join the team</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Whether you’re a talented architect ready to design beautiful spaces, or a vendor looking to supply premium materials, we’d love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-ivory">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <Reveal>
              <div className="rounded-[2rem] border border-border bg-warm-white p-8 md:p-10 shadow-luxury">
                <div className="mb-8">
                  <p className="text-[10px] tracking-luxury uppercase text-muted-foreground">Architect / Job Application</p>
                  <h3 className="mt-4 text-3xl font-display text-charcoal">Join our design team and build extraordinary spaces.</h3>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    {[
                      { label: "Full Name", name: "name", type: "text" },
                      { label: "Email Address", name: "email", type: "email" },
                      { label: "Phone Number", name: "phone", type: "tel" },
                    ].map((field) => (
                      <label key={field.name} className="block">
                        <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                          {field.label}
                        </span>
                        <input
                          type={field.type}
                          name={field.name}
                          required
                          className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors"
                        />
                      </label>
                    ))}

                    <label className="block">
                      <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                        Role Applied For
                      </span>
                      <select
                        name="role"
                        defaultValue=""
                        required
                        className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors"
                      >
                        <option value="" disabled>
                          Select a role
                        </option>
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-6">
                    <label className="block">
                      <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                        Portfolio / Resume Link
                      </span>
                      <input
                        type="url"
                        name="portfolio"
                        placeholder="https://"
                        className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal transition-colors"
                      />
                    </label>

                    <label className="block">
                      <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                        Cover Letter / Details
                      </span>
                      <textarea
                        name="coverLetter"
                        rows={5}
                        className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-charcoal resize-none transition-colors"
                      />
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-3 bg-charcoal text-warm-white px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold transition-colors"
                    >
                      Continue in WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
        </div>
      </section>

    </SiteShell>
  );
}
