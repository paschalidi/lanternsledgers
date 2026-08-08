import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ClientEffects from "./ClientEffects";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "swiper/css";
import "swiper/css/effect-fade";
import "photoswipe/dist/photoswipe.css";
import "jarallax/dist/jarallax.min.css";
import "tippy.js/dist/tippy.css";
import "../public/assets/css/styles.css";

export const metadata = {
  title: {
    default: "Lanterns & Ledgers",
    template: "%s — Lanterns & Ledgers",
  },
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
    <html lang="en" className="no-mobile no-touch">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500&family=Poppins&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
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
