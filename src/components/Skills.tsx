"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  iconClass?: string;
  customIcon?: React.ReactNode;
  invertDark?: boolean;
}

interface SkillGroup {
  title: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Programming & Frameworks",
    skills: [
      { name: "Java", iconClass: "devicon-java-plain colored" },
      { name: "C#", iconClass: "devicon-csharp-plain colored" },
      { name: "Python", iconClass: "devicon-python-plain colored" },
      { name: "Next.js", iconClass: "devicon-nextjs-plain-wordmark colored", invertDark: true },
      { name: "React", iconClass: "devicon-react-original colored" },
      { name: "Spring Boot", iconClass: "devicon-spring-original colored" },
      { name: "ASP.NET Core", iconClass: "devicon-dotnetcore-plain colored" },
    ],
  },
  {
    title: "Tools & Databases",
    skills: [
      { name: "Git", iconClass: "devicon-git-plain colored" },
      { name: "Docker", iconClass: "devicon-docker-plain colored" },
      { name: "GraphQL", iconClass: "devicon-graphql-plain colored" },
      { name: "Postman", iconClass: "devicon-postman-plain colored" },
      { name: "Jira", iconClass: "devicon-jira-plain colored" },
      { name: "Unity", customIcon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" className="w-[40px] h-[40px]" alt="Unity" /> },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain colored" },
      { name: "MS SQL Server", iconClass: "devicon-microsoftsqlserver-plain colored" },
      { name: "MySQL", iconClass: "devicon-mysql-plain colored" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-24 bg-section-alt">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
              Skills
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
              Technologies I Use
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl text-lg mx-auto">
              A focused overview of the technologies I rely on to design, build, and ship reliable products across the stack.
            </p>
          </div>

          {/* Skill groups */}
          <div className="space-y-16">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.15, duration: 0.5 }}
              >
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 text-center sm:text-left">
                  {group.title}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: gi * 0.1 + si * 0.05, duration: 0.3 }}
                      className="flex items-center gap-4 p-4 sm:p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 group"
                    >
                      {skill.iconClass ? (
                        <i className={`${skill.iconClass} text-[40px] shrink-0 group-hover:scale-110 transition-transform duration-300 ${skill.invertDark ? 'invert brightness-0 opacity-90' : ''}`}></i>
                      ) : skill.customIcon ? (
                        <div className="shrink-0 group-hover:scale-110 transition-transform duration-300">{skill.customIcon}</div>
                      ) : (
                        <div className="w-[40px] h-[40px] rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="font-bold text-accent text-lg">{skill.name.charAt(0)}</span>
                        </div>
                      )}
                      <span className="font-semibold text-sm sm:text-base text-card-foreground">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
