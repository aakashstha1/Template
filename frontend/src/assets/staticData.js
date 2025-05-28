import { Code, MonitorSmartphone, ShieldCheck, Zap } from "lucide-react";

export const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all items. Products must be unused and in their original packaging to be eligible for a return.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping typically takes 3–7 business days depending on your location. You’ll receive a tracking number once your order is shipped.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs and delivery times vary based on the destination country.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, we’ll send you an email with the tracking information. You can also log in to your account to track your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, PayPal, Apple Pay, and Google Pay for a fast and secure checkout experience.",
  },
];

export const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Well-structured and scalable.",
    href: "/f1",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    description: "Works on all screen sizes.",
    href: "/f2",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Security is our priority.",
    href: "/f3",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Lightning-fast performance.",
    href: "/f4",
  },
];

export const posts = [
  {
    id: 1,
    title: "What's your favorite frontend framework?",
    content:
      "I’ve been using React for a while but I’m curious about Svelte and SolidJS. What are your thoughts?",
    replies: [
      "React is great for ecosystem and community.",
      "Svelte feels faster and simpler for smaller projects.",
    ],
  },
  {
    id: 2,
    title: "Best practices for managing state in large apps?",
    content:
      "What libraries or patterns are you using for state management in large React applications?",
    replies: [
      "Redux Toolkit has been my go-to recently.",
      "Zustand is nice for smaller, more modular needs.",
    ],
  },
  {
    id: 3,
    title: "How do you structure your folders in a Next.js project?",
    content:
      "Looking for inspiration on organizing files/folders in scalable Next.js apps.",
    replies: [
      "I use a features-based structure: /features, /components, /utils.",
      "Try grouping by domain responsibility.",
    ],
  },
  {
    id: 4,
    title: "Tailwind CSS vs traditional CSS frameworks",
    content:
      "Is Tailwind worth the switch from Bootstrap or Bulma? Pros and cons?",
    replies: [
      "Tailwind gives you total control, but has a learning curve.",
      "I prefer Tailwind for design consistency.",
    ],
  },
  {
    id: 5,
    title: "TypeScript or JavaScript for new projects?",
    content:
      "Are you choosing TypeScript for all new projects or sticking with plain JavaScript?",
    replies: [
      "TypeScript helps catch bugs early.",
      "Sometimes JS is faster to prototype with.",
    ],
  },
  {
    id: 6,
    title: "How to optimize React app performance?",
    content: "Any tips on improving React app load times and responsiveness?",
    replies: [
      "Use React.memo and useCallback wisely.",
      "Lazy load components and images.",
    ],
  },
  {
    id: 7,
    title: "Favorite tools for API testing?",
    content: "Which tools do you prefer for testing REST or GraphQL APIs?",
    replies: [
      "Postman is my daily driver.",
      "I love Insomnia for its UI and speed.",
    ],
  },
  {
    id: 8,
    title: "CSS-in-JS vs traditional CSS",
    content:
      "What’s your take on CSS-in-JS libraries like styled-components versus regular CSS or SASS?",
    replies: [
      "CSS-in-JS keeps styles scoped and dynamic.",
      "Traditional CSS is easier to debug sometimes.",
    ],
  },
  {
    id: 9,
    title: "Using React Query in production",
    content:
      "Anyone using React Query for data fetching? How’s your experience?",
    replies: [
      "It simplifies caching and state management.",
      "Great for server state syncing.",
    ],
  },
  {
    id: 10,
    title: "Accessibility best practices",
    content: "What are the must-follow accessibility guidelines for web apps?",
    replies: [
      "Use semantic HTML tags.",
      "Don’t forget keyboard navigation and ARIA roles.",
    ],
  },
  {
    id: 11,
    title: "Deploying Next.js apps",
    content: "What’s your preferred platform to deploy Next.js applications?",
    replies: [
      "Vercel is the easiest and fastest.",
      "I also like Netlify for some use cases.",
    ],
  },
  {
    id: 12,
    title: "Monorepo or multiple repos?",
    content:
      "Are you managing your projects in monorepos or separate repositories?",
    replies: [
      "Monorepos simplify dependency sharing.",
      "Multiple repos give better isolation.",
    ],
  },
  {
    id: 13,
    title: "Testing React components",
    content:
      "Which testing library do you prefer for React: Jest, Testing Library, Cypress?",
    replies: [
      "React Testing Library for unit tests.",
      "Cypress for end-to-end testing.",
    ],
  },
  {
    id: 14,
    title: "GraphQL vs REST",
    content:
      "When would you choose GraphQL over REST for your API architecture?",
    replies: [
      "GraphQL is flexible and reduces overfetching.",
      "REST is simpler for small projects.",
    ],
  },
  {
    id: 15,
    title: "How do you manage CSS in big React projects?",
    content:
      "What strategies or tools do you use to manage styles in large React apps?",
    replies: [
      "CSS modules help avoid conflicts.",
      "Using Tailwind CSS utility classes is scalable.",
    ],
  },
];
