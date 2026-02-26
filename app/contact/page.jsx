import {
  SSRSection,
  SSRTitle,
  SSRSub,
  SSRDivider,
} from "@/components/ssr";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact EsportsHeadphones",
  description:
    "Get in touch with the EsportsHeadphones team. Send us feedback, suggestions, or inquiries about our gaming headphones database.",
  keywords: "contact, feedback, esports headphones contact, support",
  openGraph: {
    title: "Contact EsportsHeadphones",
    description: "Get in touch with the EsportsHeadphones team.",
    url: "https://esportsheadphones.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact EsportsHeadphones",
    description: "Contact the EsportsHeadphones team.",
  },
};

export default function ContactPage() {
  return (
    <>
      <SSRSection>
        <SSRTitle accent="pink">
          Get in
          <span className="text-cyan-400"> Touch</span>
        </SSRTitle>
        <SSRSub>
          Have feedback, suggestions, or inquiries? We'd love to hear from you.
        </SSRSub>
        <SSRDivider />
      </SSRSection>

      <div className="mx-auto max-w-2xl px-4 py-12">
        <article className="text-white">
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-cyan-400">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-purple-400">Email</h3>
                <p className="text-gray-300">
                  <a
                    href="mailto:contact@esportsheadphones.com"
                    className="hover:text-cyan-400 transition"
                  >
                    contact@esportsheadphones.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-purple-400">Social Media</h3>
                <p className="text-gray-300">
                  Follow us on social platforms for the latest esports gaming
                  headphone news and updates.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-pink-400">
              Feedback & Suggestions
            </h2>
            <p className="mb-4 leading-relaxed text-gray-300">
              We're always looking to improve EsportsHeadphones. Whether you have
              feedback about our database, suggestions for new features, or
              corrections to existing data, please don't hesitate to reach out.
            </p>
            <p className="leading-relaxed text-gray-300">
              Your input helps us provide the most accurate and comprehensive
              esports headphones database available.
            </p>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-yellow-400">
              Data Submissions
            </h2>
            <p className="mb-4 leading-relaxed text-gray-300">
              If you have information about professional esports player equipment
              or new gaming headphones that should be included in our database,
              we'd love to hear about it.
            </p>
            <p className="leading-relaxed text-gray-300">
              Contact us with details and we'll review the information for
              inclusion in our database.
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
