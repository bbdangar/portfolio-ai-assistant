import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Bhagirath Dangar - Full Stack & AI Engineer | Laravel • Angular • Vue • React | Android • React Native • Ionic",
  description: "Experienced Full Stack Developer with over 10 years of expertise in Laravel, Angular, and scalable application development. Currently expanding expertise into Machine Learning and Generative AI, specializing in Retrieval-Augmented Generation (RAG), LLM integration, and AI-driven automation. Combines deep backend and frontend engineering skills with modern AI capabilities to deliver intelligent, production-ready solutions for enterprise and startup environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
