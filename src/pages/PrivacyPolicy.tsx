import LegalShell, { LegalSection } from "@/components/legal/LegalShell";

const PrivacyPolicy = () => (
  <LegalShell
    eyebrow="Legal"
    title={
      <>
        Privacy <em className="font-light text-leaf">Policy</em>
      </>
    }
    meta="Last updated: April 1, 2026"
  >
    <div className="mx-auto max-w-4xl">
      <LegalSection num="01" heading="Information We Collect">
        <p>
          We collect information you provide directly, such as your name, email address, phone
          number, farm location, and payment details when you create an account, list products, or
          make purchases on Agrocom.
        </p>
      </LegalSection>

      <LegalSection num="02" heading="How We Use Your Information">
        <p>
          We use collected information to operate and improve Agrocom, process transactions,
          provide customer support, send service updates, and personalize your experience including
          BrainBag AI recommendations.
        </p>
      </LegalSection>

      <LegalSection num="03" heading="Information Sharing">
        <p>
          We do not sell your personal information. We may share data with trusted service
          providers (payment processors, hosting providers) who assist in operating Agrocom, and
          when required by law.
        </p>
      </LegalSection>

      <LegalSection num="04" heading="Data Security">
        <p>
          We implement industry-standard security measures including encryption, secure servers,
          and regular security audits to protect your information from unauthorized access or
          disclosure.
        </p>
      </LegalSection>

      <LegalSection num="05" heading="Cookies & Tracking">
        <p>
          We use cookies and similar technologies to enhance your experience, analyze usage
          patterns, and deliver relevant content. You can manage cookie preferences through your
          browser settings.
        </p>
      </LegalSection>

      <LegalSection num="06" heading="Your Rights">
        <p>
          You have the right to access, correct, or delete your personal data. You may also request
          data portability or object to certain processing activities by contacting our support
          team.
        </p>
      </LegalSection>

      <LegalSection num="07" heading="Children's Privacy">
        <p>
          Agrocom is not intended for users under 18. We do not knowingly collect information from
          children.
        </p>
      </LegalSection>

      <LegalSection num="08" heading="Child Safety Standards" id="child-safety-standards">
        <p>
          Agrocom is committed to the safety of children on our platform and maintaining an
          environment free from child sexual abuse and exploitation (CSAE). In compliance with
          Google Play's Child Safety Standards policy, we uphold the following standards:
        </p>
        <p>
          <strong>Our Commitment Against CSAE</strong>
          <br />
          Agrocom has zero tolerance for child sexual abuse and exploitation. CSAE refers to any
          content or behavior that sexually exploits, abuses, or endangers children, including
          grooming, sextortion, trafficking, or any other form of sexual exploitation of a child.
          Any account found to be involved in such activity will be immediately terminated and
          reported to the relevant authorities.
        </p>
        <p>
          <strong>Child Sexual Abuse Material (CSAM)</strong>
          <br />
          CSAM — any visual depiction involving a minor engaged in sexually explicit conduct — is
          strictly prohibited on Agrocom. Upon obtaining actual knowledge of CSAM on our platform,
          we will promptly remove the material, disable the offending account, and report the
          incident to the National Center for Missing &amp; Exploited Children (NCMEC) and
          applicable law enforcement agencies, in accordance with all relevant laws.
        </p>
        <p>
          <strong>In-App Reporting Mechanism</strong>
          <br />
          Users can report suspected CSAE or CSAM directly within the Agrocom app through our
          in-app reporting feature. All reports are reviewed promptly and handled in accordance
          with these standards and applicable laws.
        </p>
        <p>
          <strong>Compliance with Child Safety Laws</strong>
          <br />
          Agrocom complies with all applicable child safety laws and regulations, including but not
          limited to requirements for reporting CSAM to the appropriate authorities. We regularly
          review our practices to remain aligned with evolving legal requirements and industry best
          practices, including the Tech Coalition's guidelines for combating online CSEA.
        </p>
        <p>
          <strong>Child Safety Point of Contact</strong>
          <br />
          For any child safety concerns, reports, or inquiries, please contact our designated child
          safety team at <span className="font-semibold text-leaf">childsafety@agrocom.cloud</span>.
        </p>
      </LegalSection>

      <LegalSection num="09" heading="Changes to This Policy">
        <p>
          We may update this policy periodically. We will notify you of significant changes via
          email or in-app notification.
        </p>
      </LegalSection>

      <LegalSection num="10" heading="Contact Us">
        <p>
          For privacy-related inquiries, contact us at{" "}
          <span className="font-semibold text-leaf">privacy@agrocom.cloud</span>.
        </p>
      </LegalSection>
    </div>
  </LegalShell>
);

export default PrivacyPolicy;
