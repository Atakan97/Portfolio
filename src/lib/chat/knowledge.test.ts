import { expect, test } from "vitest";
import { experiences } from "@/data/experience";
import { chatProfile } from "./knowledge";

test("uses website experience without tailored CV employer details", () => {
  expect(chatProfile.experience).toEqual(
    experiences.map(({ company, title, period, location, description }) => ({
      company,
      title,
      period,
      location,
      description,
    })),
  );
  const companyFacts = JSON.stringify(chatProfile.experience);
  expect(companyFacts).not.toContain("GraphQL");
  expect(companyFacts).not.toContain("Entity Framework");
  expect(companyFacts).not.toContain("Python");
});

test("keeps CV project choices and stated language levels", () => {
  const databaseProject = chatProfile.projects.find(
    (project) => project.name === "Deutsche Bahn Delay Analytics",
  );
  expect(databaseProject?.technologies).toContain("Apache Airflow");
  expect(databaseProject?.description).not.toContain("Prefect");
  expect(
    chatProfile.projects.some(
      (project) => project.name === "Germany Tech Jobs Collector",
    ),
  ).toBe(true);
  expect(chatProfile.languages.German).toBe("A2");
});
