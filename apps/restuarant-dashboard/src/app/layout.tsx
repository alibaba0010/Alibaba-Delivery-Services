import React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./global.css";
import { Providers } from "./(providers)/providers";
import { Toaster } from "react-hot-toast";
import { headers } from "next/headers";
import SideBar from "../components/layout/SideBar";
import Protected from "../utils/protected";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Alibaba Delivery",
  description: "Alibaba Delivery services",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = headers();
  const pathName = header.get("next-url");
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable}`}>
        <Providers>
          {/* <Protected> */}
          <div className="w-full flex">
            {pathName !== "/login" &&
              pathName !== "/register" &&
              pathName !== "/activate-account/[key]" && (
                <div className="w-[350px] h-screen sticky top-0 left-0 z-50">
                  <SideBar />
                </div>
              )}
            {children}
          </div>
          {/* </Protected> */}
        </Providers>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
