"use client";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";

const ICON_PATHS = {
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  bolt: "M7 2v11h3v9l7-12h-4l4-8z",
  shield: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
  rocket: "M12 2.5c-2.5 0-4.5 2-4.5 4.5 0 1.5.5 2.5 1 3.5l-3 3v3l3-1 1-2 2 2 2-2 1 2 3 1v-3l-3-3c.5-1 1-2 1-3.5 0-2.5-2-4.5-4.5-4.5z",
  code: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  palette: "M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
  camera: "M12 15.2c1.77 0 3.2-1.43 3.2-3.2s-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2 1.43 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
  chart: "M3.5 18l3.5-5 4 2.5 5-7 4.5 6V21H3.5z",
};

export default function Benefits({ slice }) {
  const features = isFilled.group(slice.primary.features)
    ? slice.primary.features
    : [];

  return (
    <section className="page-section">
      <div className="container position-relative">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-md-50">
            {isFilled.keyText(slice.primary.caption) && (
              <h2 className="section-caption mb-xs-10">
                {slice.primary.caption}
              </h2>
            )}
            {isFilled.richText(slice.primary.title) && (
              <h3 className="section-title-small mb-40">
                <PrismicText field={slice.primary.title} />
              </h3>
            )}
            <div className="section-line" />
          </div>
          {features.map((item, index) => {
            const iconPath =
              ICON_PATHS[item.icon] || ICON_PATHS.check;
            return (
              <div
                key={index}
                className="col-md-4 col-lg-3 d-flex align-items-stretch mb-sm-30"
              >
                <div className="alt-features-item border-left mt-0">
                  <div className="alt-features-icon">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d={iconPath} />
                    </svg>
                  </div>
                  {item.title && (
                    <h4 className="alt-features-title">{item.title}</h4>
                  )}
                  {isFilled.richText(item.description) && (
                    <div className="alt-features-descr">
                      <PrismicRichText field={item.description} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
