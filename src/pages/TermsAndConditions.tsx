import LegalShell, { LegalSection } from "@/components/legal/LegalShell";

const TermsAndConditions = () => (
  <LegalShell
    eyebrow="Legal"
    title={
      <>
        Terms &amp; <em className="font-light text-leaf">Conditions</em>
      </>
    }
    meta="Last updated: March 8, 2026"
  >
    <div className="mx-auto max-w-4xl">
      <LegalSection num="01" heading="Acceptance of Terms">
        <p>
          By accessing or using Agrocom, you agree to be bound by these Terms &amp; Conditions. If
          you do not agree, please do not use the platform.
        </p>
      </LegalSection>

      <LegalSection num="02" heading="Account Registration">
        <p>
          You must provide accurate, complete information when creating an account. You are
          responsible for maintaining the confidentiality of your credentials and all activities
          under your account.
        </p>
      </LegalSection>

      <LegalSection num="03" heading="Marketplace Conduct">
        <p>
          Sellers must list only genuine agricultural products with accurate descriptions and
          pricing. Fraudulent listings, misleading information, or prohibited items will result in
          account suspension.
        </p>
      </LegalSection>

      <LegalSection num="04" heading="Payments & Fees">
        <p>
          Agrocom facilitates payments between buyers and sellers. Transaction fees may apply as
          outlined in our pricing page. All payments are processed securely through our integrated
          payment partners.
        </p>
      </LegalSection>

      <LegalSection num="05" heading="BrainBag AI">
        <p>
          BrainBag provides AI-generated agricultural advice for informational purposes only. It
          does not replace professional agricultural consultation. Agrocom is not liable for
          decisions made based on AI recommendations.
        </p>
      </LegalSection>

      <LegalSection num="06" heading="Intellectual Property">
        <p>
          All content, branding, and technology on Agrocom are owned by Vivora Farms Limited. Users
          retain ownership of content they upload but grant Agrocom a license to display it on the
          platform.
        </p>
      </LegalSection>

      <LegalSection num="07" heading="Limitation of Liability">
        <p>
          Agrocom is provided "as is." We are not liable for indirect, incidental, or consequential
          damages arising from your use of the platform, including losses from marketplace
          transactions.
        </p>
      </LegalSection>

      <LegalSection num="08" heading="Termination">
        <p>
          We reserve the right to suspend or terminate accounts that violate these terms. You may
          also delete your account at any time through the account settings or our account deletion
          page.
        </p>
      </LegalSection>

      <LegalSection num="09" heading="Governing Law">
        <p>
          These terms are governed by applicable laws. Any disputes shall be resolved through
          arbitration or the appropriate courts.
        </p>
      </LegalSection>

      <LegalSection num="10" heading="Contact">
        <p>
          Questions about these terms? Reach us at{" "}
          <span className="font-semibold text-leaf">legal@agrocom.cloud</span>.
        </p>
      </LegalSection>
    </div>
  </LegalShell>
);

export default TermsAndConditions;
