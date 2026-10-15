export interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  logoUrl?: string;
  logoBg?: string;
  period: string;
  location: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    title: "Software Developer",
    company: "EPAM Systems",
    companyUrl: "https://www.epam.com",
    logoUrl: "/logos/epam.svg",
    period: "Nov 2021 – Apr 2022",
    location: "Izmir, Turkey",
    description:
      "Contributed to customizable order management solutions and API integrations for enterprise clients in an Agile environment.",
  },
  {
    title: "Software Engineer Intern",
    company: "C System Software and Information Tech.",
    companyUrl: "https://csistem.com.tr",
    logoUrl: "/logos/csistem.svg",
    period: "Apr 2021 – Jun 2021",
    location: "Izmir, Turkey",
    description:
      "Built a full-stack customer feedback web application implementing database-oriented workflows and responsive user interfaces.",
  },
  {
    title: "Software & IT Intern",
    company: "Yokogawa",
    companyUrl: "https://www.yokogawa.com",
    logoUrl: "/logos/yokogawa.svg",
    logoBg: "#014F99",
    period: "Aug 2019 – Sep 2019",
    location: "Izmir, Turkey",
    description:
      "Supported enterprise ICT infrastructure operations, network maintenance, system automation tasks, and virtualized testing environments.",
  },
];
