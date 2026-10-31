/* Open roles at Agrocom. Sourced from the job descriptions in
   agrocom-api/docs/posts; the Vivora Farms site carries a copy of this file. */

export type JobSection = { heading?: string; items: string[] };

export type Job = {
  slug: string;
  title: string;
  team: "Leadership" | "People" | "Marketing" | "Creative";
  location: string;
  type: string;
  about: string;
  responsibilities: JobSection[];
  requirements: string[];
};

const LOCATION = "Abuja, Nigeria";
const TYPE = "On-site";

export const JOBS: Job[] = [
  {
    slug: "chief-executive-officer",
    title: "Chief Executive Officer (CEO)",
    team: "Leadership",
    location: LOCATION,
    type: TYPE,
    about:
      "The Chief Executive Officer is the most senior executive of Agrocom and is fully accountable for the overall strategic direction, growth, financial performance, culture, and long-term success of the company. The CEO sets the vision, drives execution, builds the leadership team, and represents Agrocom to investors, partners, government, and the broader ecosystem.",
    responsibilities: [
      {
        items: [
          "Define and drive the company's vision, mission, and long-term strategy in alignment with the Founder",
          "Lead the executive and senior team and ensure strong cross-functional alignment",
          "Oversee company-wide financial performance, fundraising, and capital allocation",
          "Build and maintain high-level relationships with investors, strategic partners, regulators, and industry stakeholders",
          "Ensure operational excellence, risk management, and corporate governance",
          "Attract, develop, and retain top talent; foster a high-performance and values-driven culture",
          "Act as the primary external face of Agrocom in media, industry events, and partnerships",
          "Drive product–market fit, expansion, and sustainable growth in the agribusiness/agritech sector",
          "Report regularly to the Founder on performance, strategy, and key decisions",
        ],
      },
    ],
    requirements: [
      "5+ years of progressive leadership experience, with at least 3 years in a C-level or equivalent role",
      "Proven track record of scaling a company (preferably in agribusiness, agritech, or related sectors)",
      "Strong financial acumen and experience with fundraising / investor relations",
      "Excellent strategic thinking, decision-making, and communication skills",
      "Experience managing boards/founders and reporting to stakeholders",
      "Bachelor's degree required; MBA or equivalent preferred",
    ],
  },
  {
    slug: "chief-financial-officer",
    title: "Chief Financial Officer (CFO)",
    team: "Leadership",
    location: LOCATION,
    type: TYPE,
    about:
      "The Chief Financial Officer is responsible for the overall financial strategy, health, and performance of Agrocom. The CFO provides strategic financial leadership, ensures strong financial controls and compliance, and supports decision-making across fundraising, operations, and growth.",
    responsibilities: [
      {
        items: [
          "Lead all financial planning, budgeting, forecasting, and financial analysis",
          "Oversee accounting, financial reporting, cash flow management, and internal controls",
          "Drive fundraising activities, investor relations, and capital structure management in partnership with the CEO",
          "Ensure full compliance with Nigerian financial regulations, tax requirements, and statutory reporting",
          "Develop and monitor key financial metrics and performance indicators",
          "Provide strategic financial insight to support business decisions, pricing, investments, and expansion",
          "Manage relationships with banks, auditors, tax authorities, and financial partners",
          "Build and lead the finance team and continuously improve financial systems and processes",
          "Identify financial risks and implement appropriate mitigation strategies",
          "Report financial performance, risks, and opportunities regularly to the CEO and Founder",
        ],
      },
    ],
    requirements: [
      "4+ years of progressive finance experience, with at least 2 years in a senior finance leadership role (CFO, Finance Director, or equivalent)",
      "Strong experience in financial planning & analysis, accounting, and fundraising",
      "Proven track record in growth-stage companies, preferably within agribusiness, agritech, or technology sectors",
      "Deep knowledge of Nigerian tax, regulatory, and compliance requirements",
      "Professional accounting qualification required (ACA, ACCA, CPA, or equivalent)",
      "Excellent analytical, strategic thinking, and communication skills",
      "Bachelor's degree in Finance, Accounting, Economics, or related field required; MBA is an advantage",
    ],
  },
  {
    slug: "coo-head-of-marketing",
    title: "Chief Operating Officer / Head of Marketing",
    team: "Leadership",
    location: LOCATION,
    type: TYPE,
    about:
      "This dual role combines operational leadership with marketing ownership. The COO / Head of Marketing is responsible for day-to-day operations, process excellence, and go-to-market strategy. The role ensures Agrocom executes efficiently while building a strong brand and driving customer acquisition and retention.",
    responsibilities: [
      {
        heading: "Operations",
        items: [
          "Oversee daily operations and ensure efficient execution across all departments",
          "Design, implement, and continuously improve operational systems and processes",
          "Manage budgets, resource allocation, and performance metrics",
          "Lead cross-functional projects and ensure timely delivery of company objectives",
          "Identify operational bottlenecks and drive continuous improvement",
        ],
      },
      {
        heading: "Marketing",
        items: [
          "Own the overall marketing strategy, brand positioning, and go-to-market plans",
          "Lead demand generation, digital marketing, content, and brand campaigns",
          "Manage marketing budget, agency relationships, and performance reporting",
          "Build and optimize customer acquisition and retention funnels",
          "Work closely with product and sales to ensure strong market messaging and product–market alignment",
          "Represent the brand and develop strategic marketing partnerships",
        ],
      },
    ],
    requirements: [
      "8+ years of combined experience in operations and marketing, with significant leadership responsibility",
      "Proven experience scaling operations and building marketing functions in growth-stage companies",
      "Experience in strategic marketing and target squashing",
      "Strong understanding of digital marketing, brand strategy, and performance marketing",
      "Excellent project management, analytical, and leadership skills",
      "Experience in agribusiness, agritech, or related industries is highly preferred",
    ],
  },
  {
    slug: "human-resources-manager",
    title: "Human Resources Manager",
    team: "People",
    location: LOCATION,
    type: TYPE,
    about:
      "The Human Resources Manager is responsible for building and managing Agrocom's people function. This role owns talent acquisition, employee relations, performance management, HR policies, and the overall employee experience. The HR Manager plays a critical role in shaping company culture and supporting the organisation's growth.",
    responsibilities: [
      {
        items: [
          "Develop and implement HR strategies, policies, and procedures aligned with company goals",
          "Lead end-to-end recruitment and selection processes for all roles",
          "Manage onboarding, orientation, and employee integration",
          "Oversee performance management systems, goal setting, and appraisal processes",
          "Handle employee relations, conflict resolution, disciplinary processes, and grievance management",
          "Ensure compliance with Nigerian labour laws and employment regulations",
          "Manage compensation and benefits administration",
          "Drive employee engagement, culture-building, and retention initiatives",
          "Maintain accurate HR records and prepare regular people reports for the CEO",
          "Support organisational development and workforce planning",
        ],
      },
    ],
    requirements: [
      "5+ years of progressive HR experience, with at least 2–3 years in a managerial role",
      "Strong knowledge of Nigerian labour laws and HR best practices",
      "Proven experience in full-cycle recruitment, employee relations, and performance management",
      "Excellent interpersonal, communication, and problem-solving skills",
      "Ability to handle confidential information with integrity",
      "Experience in a growth-stage company or agribusiness/agritech environment is an advantage",
      "Bachelor's degree in Human Resources, Business Administration, or related field required; professional HR certification (CIPM, SHRM, or equivalent) preferred",
    ],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    team: "Marketing",
    location: LOCATION,
    type: TYPE,
    about:
      "The Marketing Manager drives Agrocom's marketing strategy and execution across channels. This role focuses on building brand awareness, generating demand, and delivering measurable growth in the agribusiness and agritech space.",
    responsibilities: [
      {
        items: [
          "Develop and execute integrated marketing campaigns aligned with business goals",
          "Lead brand positioning, messaging, and go-to-market initiatives",
          "Manage digital, content, and performance marketing activities",
          "Coordinate with design, social, and video teams to deliver consistent brand experiences",
          "Track campaign performance, analyse results, and optimise for ROI",
          "Build and nurture partnerships and co-marketing opportunities",
          "Support product launches and market expansion efforts",
          "Prepare regular marketing reports and insights for leadership",
        ],
      },
    ],
    requirements: [
      "Experience in strategic marketing and target squashing",
      "Proven track record of growing brand awareness and driving customer acquisition",
      "Strong understanding of digital marketing channels, content strategy, and performance metrics",
      "Excellent communication, project management, and analytical skills",
      "Ability to work cross-functionally in a fast-paced growth environment",
      "Experience in agribusiness, agritech, or related sectors is a strong advantage",
    ],
  },
  {
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    team: "Marketing",
    location: LOCATION,
    type: TYPE,
    about:
      "The Digital Marketing Specialist executes Agrocom's digital marketing initiatives, focusing on paid media, SEO/SEM, email, and performance campaigns that drive measurable results and support growth objectives.",
    responsibilities: [
      {
        items: [
          "Plan, launch, and optimise paid campaigns across Google, Meta, LinkedIn, and other platforms",
          "Manage SEO, SEM, and content distribution strategies",
          "Execute email marketing, retargeting, and nurture campaigns",
          "Monitor performance metrics, A/B test creatives and audiences, and report on ROI",
          "Collaborate with design and content teams on campaign assets",
          "Stay current with digital marketing trends, tools, and platform updates",
          "Support overall marketing goals with data-driven recommendations",
        ],
      },
    ],
    requirements: [
      "Experience in strategic marketing and target squashing",
      "Hands-on experience managing paid digital campaigns and performance marketing",
      "Proficiency with digital marketing tools and analytics platforms",
      "Strong analytical mindset and ability to translate data into action",
      "Excellent organisational and communication skills",
      "Experience in agribusiness, agritech, or related sectors is an advantage",
    ],
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    team: "Marketing",
    location: LOCATION,
    type: TYPE,
    about:
      "The Social Media Manager owns Agrocom's presence across social platforms. The role is responsible for building community, driving engagement, growing brand awareness, and supporting marketing and business objectives through strategic social media execution.",
    responsibilities: [
      {
        items: [
          "Develop and execute the overall social media strategy aligned with business and marketing goals",
          "Manage day-to-day content creation, scheduling, and community management across platforms (LinkedIn, Instagram, X/Twitter, Facebook, TikTok, YouTube, etc.)",
          "Create and curate engaging content (copy, graphics coordination, short-form video concepts)",
          "Monitor conversations, respond to comments and messages, and build an active community",
          "Track performance metrics, analyze results, and continuously optimize content and campaigns",
          "Run paid social campaigns in collaboration with the marketing team",
          "Stay current with platform trends, algorithm changes, and best practices",
          "Collaborate with design, content, and other teams to ensure consistent messaging and visual identity",
          "Prepare regular performance reports and insights for leadership",
        ],
      },
    ],
    requirements: [
      "3+ years of hands-on social media management experience",
      "Proven track record of growing audiences and engagement for brands",
      "Strong writing and storytelling skills",
      "Experience with social media management and analytics tools (e.g., Meta Business Suite, Buffer, Hootsuite, native analytics)",
      "Understanding of content strategy, community management, and performance marketing",
      "Ability to work independently and manage multiple platforms simultaneously",
      "Experience in agribusiness, agritech, agriculture, or related sectors is a strong plus",
    ],
  },
  {
    slug: "graphics-designer",
    title: "Graphics Designer",
    team: "Creative",
    location: LOCATION,
    type: TYPE,
    about:
      "The Graphics Designer is responsible for creating high-quality visual assets that strengthen Agrocom's brand identity and support marketing, product, and communication efforts. The role requires both creative excellence and the ability to deliver consistent, professional designs across multiple channels.",
    responsibilities: [
      {
        items: [
          "Design visual assets for digital and print channels (social media, website, presentations, marketing materials, reports, etc.)",
          "Maintain and evolve the company's visual brand identity and design system",
          "Create marketing collateral, campaign creatives, social media graphics, and promotional materials",
          "Collaborate with the marketing, content, and other teams to deliver on-brand designs",
          "Prepare design files for production and ensure quality control across all outputs",
          "Stay updated on design trends, tools, and best practices relevant to the agribusiness and technology space",
          "Manage multiple design projects and meet deadlines in a fast-paced environment",
        ],
      },
    ],
    requirements: [
      "3+ years of professional graphic design experience",
      "Strong portfolio demonstrating branding, digital, and marketing design work",
      "Proficiency in industry-standard tools (Adobe Creative Suite – Photoshop, Illustrator, InDesign; Figma preferred)",
      "Solid understanding of design principles, typography, color theory, and layout",
      "Ability to take feedback and iterate quickly",
      "Experience designing for agricultural, agribusiness, or technology brands is an advantage",
      "Bachelor's degree in Graphic Design, Visual Communication, or related field preferred",
    ],
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    team: "Creative",
    location: LOCATION,
    type: TYPE,
    about:
      "The Video Editor is responsible for producing high-quality video content that supports Agrocom's brand, marketing campaigns, product storytelling, and social media presence. The role requires strong technical editing skills, creative storytelling ability, and the capacity to deliver polished videos across multiple formats and platforms.",
    responsibilities: [
      {
        items: [
          "Edit and produce professional videos for marketing campaigns, social media, website, product demos, internal communications, and external presentations",
          "Transform raw footage into compelling, brand-aligned content with strong narrative structure",
          "Create short-form content (Reels, TikToks, YouTube Shorts) and longer-form videos (promotional films, interviews, explainers, case studies)",
          "Add motion graphics, text overlays, transitions, colour grading, sound design, and basic visual effects",
          "Collaborate closely with the marketing, design, and content teams to ensure visual consistency and message alignment",
          "Manage multiple video projects simultaneously while meeting tight deadlines",
          "Maintain organised project files, asset libraries, and version control",
          "Stay updated on video trends, platform best practices, and editing techniques relevant to agribusiness and technology storytelling",
          "Optimise videos for different platforms (aspect ratios, lengths, captions, thumbnails)",
        ],
      },
    ],
    requirements: [
      "3+ years of professional video editing experience",
      "Strong portfolio demonstrating commercial, social, and brand video work",
      "Advanced proficiency in industry-standard editing software (Adobe Premiere Pro, After Effects; Final Cut Pro or DaVinci Resolve is a plus)",
      "Solid understanding of storytelling, pacing, colour grading, audio mixing, and motion graphics",
      "Experience creating content for social media platforms and digital marketing campaigns",
      "Ability to take creative direction, iterate quickly, and work independently",
      "Experience in agribusiness, agritech, agriculture, or related sectors is an advantage",
      "Bachelor's degree in Film, Media, Communications, or related field preferred (or equivalent practical experience)",
    ],
  },
];

export const getJob = (slug: string | undefined) => JOBS.find((j) => j.slug === slug);
