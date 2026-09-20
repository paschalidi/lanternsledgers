import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ClientEffects from "./ClientEffects";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Fraunces, Work_Sans } from "next/font/google";

import "swiper/css";
import "swiper/css/effect-fade";
import "photoswipe/dist/photoswipe.css";
import "jarallax/dist/jarallax.min.css";
import "tippy.js/dist/tippy.css";
import "../public/assets/css/styles.css";
import "../public/assets/css/brand.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Lanterns & Ledgers — A Guiding Light on Finance",
    template: "%s — Lanterns & Ledgers",
  },
  description:
    "Fractional finance director for values-led businesses, growing founders, charities and CICs. Understand what your numbers are telling you.",
};

async function getHeaderFooter() {
  const client = createClient();
  try {
    const settings = await client.getSingle("settings");
    const headerSlice = settings.data.slices.find(
      (s) => s.slice_type === "header",
    );
    const footerSlice = settings.data.slices.find(
      (s) => s.slice_type === "footer",
    );
    return { headerSlice, footerSlice };
  } catch {
    return { headerSlice: null, footerSlice: null };
  }
}

export default async function RootLayout({ children }) {
  const { headerSlice, footerSlice } = await getHeaderFooter();

  return (
    <html
      lang="en"
      className={`no-mobile no-touch ${fraunces.variable} ${workSans.variable}`}
    >
      <body className="appear-animate body">
        <div className="theme-main">
          <div className="page" id="top">
            {headerSlice && (
              <SliceZone slices={[headerSlice]} components={components} />
            )}
            <main id="main">{children}</main>
            {footerSlice && (
              <SliceZone slices={[footerSlice]} components={components} />
            )}
          </div>
        </div>
        <ClientEffects />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
