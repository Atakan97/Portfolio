import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SectionProvider from "@/components/SectionProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atakan Arda Celik – Software Engineer",
  description:
    "M.Sc. Computer Science graduate and Software Engineer specializing in Backend Development, Full-stack, and Data Engineering. Portfolio showcasing projects and experience.",
  keywords: [
    "Atakan Arda Celik",
    "Software Engineer",
    "Backend Developer",
    "Full Stack",
    "Java",
    "Spring Boot",
    "Portfolio",
  ],
  authors: [{ name: "Atakan Arda Celik" }],
  openGraph: {
    title: "Atakan Arda Celik – Software Engineer",
    description:
      "M.Sc. Computer Science graduate and Software Engineer. Explore my portfolio, projects, and professional experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <SectionProvider>
          <Navbar />
          {children}
        </SectionProvider>
      </body>
    </html>
  );
}
