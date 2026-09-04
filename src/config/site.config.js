/**
 * Single source of truth for site content and non-secret configuration.
 *
 * Everything here is deploy-stable and public: it ships with the code, is
 * reviewable in a diff, and must never be read from the environment. There are
 * no secrets on this site — the Formspree endpoint below is a public form ID
 * that is visible in the rendered HTML by design.
 *
 * Changing copy, pricing, or a cohort date means editing this file and
 * deploying, so the change shows up in git history.
 */

export const contact = {
  email: 'accomplitech.org@gmail.com',
  phone: '+2347077032733',
  // Display form of the same number.
  phoneLabel: '+234 707 703 2733',
  whatsapp: 'https://wa.me/2347077032733',
  address: '41/42 Gbola Onibiyo Street, Ahmadiya, Lagos',
};

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/accomplitech', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/accompli_tech', icon: 'instagram' },
];

/** Public Formspree form ID. Both forms post here; `_subject` separates them. */
export const formEndpoint = 'https://formspree.io/f/xpwzzykn';

export const registrationUrl = 'https://docs.google.com/forms/d/1qUdFXBYbs3jd_UuXvGoEp_RrcdrTPoZPezBfpdlZtJc/viewform';

/**
 * Start date of the next intake, as an ISO date string.
 *
 * Set to null when no date is confirmed — the UI omits the row entirely rather
 * than showing a stale one. Do not leave a past date here.
 */
export const nextCohort = null;

/**
 * The one headline figure that cannot be derived from the data below.
 * Update it when a cohort finishes.
 */
export const peopleTrained = '70+';

/**
 * width/height are the actual pixel dimensions of the source file. They are
 * passed to <img> so the browser knows the intrinsic aspect ratio up front;
 * CSS then scales by height only, so none of these get stretched or squashed
 * to match a common box the way the old grid did.
 */
export const clients = [
  { name: 'UBA', file: 'client-uba', width: 198, height: 140 },
  { name: 'Vitafoam', file: 'client-vitafoam', width: 206, height: 207 },
  { name: 'Fruitylife', file: 'client-fruitylife', width: 195, height: 195 },
  { name: 'MyCIL', file: 'client-mycil', width: 195, height: 196 },
  { name: 'AIPL', file: 'client-aipl', width: 489, height: 103 },
];

/**
 * Photographs of actual sessions at the Lagos campus. Captions describe what is
 * happening in each frame — they are not decorative filler.
 */
export const gallery = [
  { file: 'session-1', caption: 'Working through a dataset in Excel during a weekend class.' },
  { file: 'session-2', caption: 'Index and match, on the board and on screen at the same time.' },
  { file: 'session-3', caption: 'A cohort mid-exercise on the Data Analysis track.' },
  { file: 'session-4', caption: 'Reviewing a Power BI report line by line.' },
  { file: 'session-5', caption: 'One-to-one help while the rest of the room works.' },
];

/**
 * Course catalogue. `tools` is the stack taught; `price` is per participant in
 * USD unless stated. Prices last reviewed November 2025.
 */
export const courses = [
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    summary:
      'The full analytics stack, from spreadsheets through to scripting. The longest track we run, and the one most people come to us for.',
    tools: ['Excel', 'Power BI', 'SQL', 'Python'],
    duration: '3 or 4 months',
    price: '$150 for 3 months · $200 for 4 months',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    summary:
      'Interface and interaction design: research, wireframes, prototypes, and how to hand work over to developers.',
    tools: ['Figma', 'Prototyping', 'User research'],
    duration: '3 months',
    price: '$150',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    summary:
      'Front-end and back-end fundamentals, building responsive sites that work on the devices your users actually have.',
    tools: ['HTML & CSS', 'JavaScript', 'APIs & databases'],
    duration: '3 months',
    price: '$150',
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    summary:
      'Layout, type and colour, worked through enough briefs to leave with a portfolio you can show a client.',
    tools: ['Layout', 'Typography', 'Brand assets'],
    duration: '3 months',
    price: '$150',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    summary:
      'Protecting data and preventing breaches: the principles, the common failure modes, and the practices that catch them.',
    tools: ['Threat models', 'Access control', 'Incident response'],
    duration: '3 months',
    price: '$250',
  },
];

/** Runs on a different footing to the catalogue above, so it gets its own block. */
export const corporateTraining = {
  title: 'Training for a whole team',
  summary:
    'We build the programme around what your team already does. Scope, length and delivery are set during a consultation, so there is no fixed price.',
  points: [
    'Curriculum written against your industry and your data',
    'Delivered on site or virtually, whichever fits the team',
    'Follow-up after the sessions, so the skills actually get used',
  ],
  tools: ['Excel', 'Power BI', 'SQL', 'Python'],
  price: 'Quoted after consultation',
};

export const schedule = [
  { day: 'Fridays', time: '4:00 PM – 6:00 PM' },
  { day: 'Saturdays', time: '10:00 AM – 12:00 PM' },
];

/**
 * Testimonials must be attributable to a real, named person who consented.
 * Do not add unattributed quotes or stand-in avatars.
 */
export const testimonials = [
  {
    quote:
      "Accomplitech's hands-on training allowed me to tackle actual business challenges, making data analysis intuitive and enjoyable. I now drive results-driven solutions.",
    name: 'Peace Roberts',
    role: 'Data Analysis track',
  },
];

export const nav = [
  { href: '#courses', label: 'Courses' },
  { href: '#about', label: 'About' },
  { href: '#sessions', label: 'Sessions' },
  { href: '#clients', label: 'Clients' },
];
