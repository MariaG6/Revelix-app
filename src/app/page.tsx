import { Footer } from "@/components/Layout/Footer";
import HomeClient from "@/components/Home/HomeClient";
import { Navbar } from "@/components/Layout/Navbar";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HomeClient />
      <Footer />
    </div>
  );
}
