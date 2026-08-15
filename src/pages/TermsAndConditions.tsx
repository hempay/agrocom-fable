import LegalShell, { LegalSection } from "@/components/legal/LegalShell";

const TermsAndConditions = () => (
  <LegalShell
    eyebrow="Legal"
    title={
      <>
        Terms &amp; <em className="font-light text-leaf">Conditions</em>
      </>
    }
    meta="Last updated: August 14, 2026"
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

      <LegalSection num="06" heading="Auto-Renewable Subscriptions and EULA" id="subscriptions">
        <p>
          These Terms &amp; Conditions are Agrocom&apos;s End User License Agreement (EULA). Agrocom
          offers optional Premium and Business auto-renewable subscriptions through Apple&apos;s
          App Store.
        </p>
        <p>
          <strong>Agrocom Premium</strong> includes unlimited BrainBag AI messages, full access to
          premium farming tools, and advanced farming insights and support.{" "}
          <strong>Agrocom Business</strong> includes everything in Premium plus a business profile,
          product listing features, and tools designed for registered agribusinesses.
        </p>
        <p>
          Both plans may be offered for 1 month, 3 months, or 6 months. The exact price for each
          subscription is displayed in the app before purchase and may vary by country or App Store
          storefront. Payment is charged to your Apple ID account when the purchase is confirmed.
        </p>
        <p>
          Subscriptions renew automatically unless canceled at least 24 hours before the end of the
          current subscription period. Your Apple ID account will be charged for renewal within 24
          hours before the current period ends. You can manage or cancel a subscription after
          purchase in Settings &rarr; Apple ID &rarr; Subscriptions. Cancellation takes effect at
          the end of the current paid period; access remains available until then.
        </p>
        <p>
          App Store purchases, billing, refunds, and restoration are also subject to Apple&apos;s
          applicable terms and policies. See our{" "}
          <a className="font-semibold text-leaf underline" href="/privacy-policy">
            Privacy Policy
          </a>{" "}
          for information about how we handle personal data.
        </p>
      </LegalSection>

      <LegalSection num="07" heading="Intellectual Property">
        <p>
          All content, branding, and technology on Agrocom are owned by Vivora Farms Limited. Users
          retain ownership of content they upload but grant Agrocom a license to display it on the
          platform.
        </p>
      </LegalSection>

      <LegalSection num="08" heading="Limitation of Liability">
        <p>
          Agrocom is provided "as is." We are not liable for indirect, incidental, or consequential
          damages arising from your use of the platform, including losses from marketplace
          transactions.
        </p>
      </LegalSection>

      <LegalSection num="09" heading="Termination">
        <p>
          We reserve the right to suspend or terminate accounts that violate these terms. You may
          also delete your account at any time through the account settings or our account deletion
          page.
        </p>
      </LegalSection>

      <LegalSection num="10" heading="Governing Law">
        <p>
          These terms are governed by applicable laws. Any disputes shall be resolved through
          arbitration or the appropriate courts.
        </p>
      </LegalSection>

      <LegalSection num="11" heading="Contact">
        <p>
          Questions about these terms? Reach us at{" "}
          <span className="font-semibold text-leaf">legal@agrocom.cloud</span>.
        </p>
      </LegalSection>
    </div>
  </LegalShell>
);

export default TermsAndConditions;
