"use client";

import React from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header className=""></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default MainLayout;
