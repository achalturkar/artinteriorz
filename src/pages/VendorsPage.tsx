import { useEffect, useState, type FormEvent } from "react";
import { PageHero } from "@/components/site/PageHero";
import { setPageSeo } from "@/lib/seo";
import { createWhatsAppSubmissionUrl } from "@/lib/whatsapp";

type SubmissionStatus = { type: "error"; message: string };

const fieldClassName =
  "mt-2 w-full border-0 border-b border-[#ded7ca] bg-transparent px-0 py-3 text-base text-charcoal outline-none transition-colors placeholder:text-charcoal/45 focus:border-gold";

const labelClassName =
  "block text-[10px] font-medium tracking-[0.22em] text-muted-foreground sm:text-[11px]";

export default function VendorsPage() {
  const [status, setStatus] = useState<SubmissionStatus | null>(null);

  useEffect(() => {
    setPageSeo({
      title: "Become a Vendor Partner | Art Interiorz",
      description:
        "Register as a vendor or supplier with Art Interiorz. We partner with trusted manufacturers, craftsmen, contractors and service providers in Nagpur.",
      canonicalUrl: "https://www.artinteriorz.com/vendors",
    });
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get("phone") ?? "").trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const name = String(formData.get("name") ?? "").trim();
    const productType = String(formData.get("productType") ?? "").trim();
    const overview = String(formData.get("overview") ?? "").trim();

    setStatus(null);
    if (name.length < 2 || productType.length === 0 || overview.length === 0) {
      setStatus({
        type: "error",
        message: "Please complete all fields and check for entries containing only spaces.",
      });
      return;
    }

    if (!/^[0-9()+\s-]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      setStatus({
        type: "error",
        message: "Please enter a valid phone number with 7 to 15 digits.",
      });
      return;
    }

    window.location.href = createWhatsAppSubmissionUrl("New website vendor registration", {
      name,
      email: String(formData.get("email") ?? "").trim(),
      phone,
      serviceType: String(formData.get("serviceType") ?? "").trim(),
      productType,
      companyOverview: overview,
    });
  }

  return (
    <>
      <PageHero
        title="Become a Vendor Partner"
        crumb="Vendors"
        image="/assets/hall.jpg"
      />

      <section className="bg-warm-white px-6 py-20 text-center sm:py-24 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase sm:text-xs">
            <span className="h-px w-7 bg-gold" />
            Vendor Partnership
            <span className="h-px w-7 bg-gold" />
          </p>
          <h2 className="mt-6 font-display text-4xl leading-tight text-charcoal md:text-6xl">
            Let’s Build Exceptional Spaces,{" "}
            <em className="text-gold-soft">Together.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            At Art Interiorz, we believe great spaces are created through great
            partnerships. We collaborate with trusted vendors, manufacturers,
            craftsmen, contractors and service providers who share our
            commitment to quality, reliability and excellence.
          </p>
        </div>
      </section>

      <section className="bg-[#f7f3e9] px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-[540px] rounded-[1.5rem] border border-[#e4ddcf] bg-[#fdfbf7] p-6 shadow-[0_16px_45px_rgba(47,39,26,0.07)] sm:p-8">
          <p className="text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase sm:text-xs">
            Vendor / Supplier Registration
          </p>
          <h2 className="mt-3 font-display text-3xl text-charcoal">
            Register with Art Interiorz
          </h2>

          <form onSubmit={handleSubmit} className="mt-7">
            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
              <label className={labelClassName}>
                Full Name / Contact Person
                <input
                  autoComplete="name"
                  className={fieldClassName}
                  maxLength={100}
                  minLength={2}
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </label>

              <label className={labelClassName}>
                Email Address
                <input
                  autoComplete="email"
                  className={fieldClassName}
                  maxLength={254}
                  name="email"
                  placeholder="you@company.com"
                  required
                  type="email"
                />
              </label>

              <label className={labelClassName}>
                Phone Number
                <input
                  autoComplete="tel"
                  className={fieldClassName}
                  maxLength={20}
                  minLength={7}
                  name="phone"
                  placeholder="+91"
                  required
                  type="tel"
                />
              </label>

              <label className={labelClassName}>
                Service Type
                <select
                  className={`${fieldClassName} appearance-none`}
                  defaultValue=""
                  name="serviceType"
                  required
                >
                  <option disabled value="">
                    Select a service
                  </option>
                  <option value="Manufacturer / Supplier">
                    Manufacturer / Supplier
                  </option>
                  <option value="Contractor / Craftsman">
                    Contractor / Craftsman
                  </option>
                  <option value="Design / Professional Services">
                    Design / Professional Services
                  </option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className={`${labelClassName} sm:col-span-2`}>
                Product Type / Materials
                <input
                  className={fieldClassName}
                  maxLength={200}
                  minLength={2}
                  name="productType"
                  placeholder="Materials or products you provide"
                  required
                />
              </label>

              <label className={`${labelClassName} sm:col-span-2`}>
                Company Overview / Details
                <textarea
                  className={`${fieldClassName} min-h-32 resize-y`}
                  maxLength={2000}
                  minLength={10}
                  name="overview"
                  placeholder="Tell us about your company, experience and services"
                  required
                  rows={4}
                />
              </label>
            </div>

            {status && (
              <p
                aria-live="polite"
                className="mt-5 text-sm leading-6 text-red-700"
                role="status"
              >
                {status.message}
              </p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                className="w-full bg-charcoal px-7 py-4 text-[11px] font-semibold tracking-[0.22em] text-warm-white uppercase transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                type="submit"
              >
                Continue in WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
