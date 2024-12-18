import React from "react";
import TopBar from "@/Components/templates/TopBar/TopBar";

export default function DashboardLayout({children}) {
  return (
    <div className=" md:max-w-[1140px] min-h-screen m-auto py-[28px] px-4 xl:px-0">
      <TopBar />
      <main className="pt-[41px]">
        {children}
      </main>
    </div>
  );
}
