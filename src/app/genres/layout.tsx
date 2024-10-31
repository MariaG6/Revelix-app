import FooterClient from "@/components/FooterClient/FooterClient";
import { NavbarClient } from "@/components/NavbarClient";
import React from "react";

const GenreLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <NavbarClient />
      {children}
      <FooterClient />
    </>
  );
};

export default GenreLayout;
