"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import { useState } from "react";

function FaqAccordion({ items }) {
  const [openItems, setOpenItems] = useState(() => new Set([0]));

  const toggle = (index) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="call-action-2-text mb-50 mb-sm-40">
      <dl className="accordion">
        {items.map((item, index) => {
          const isOpen = openItems.has(index);
          return (
            <div key={index}>
              <dt
                className={`toggle ${isOpen ? "active" : ""}`}
                onClick={() => toggle(index)}
                style={{ cursor: "pointer" }}
              >
                {item.question}
              </dt>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.35s ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  {isFilled.richText(item.answer) && (
                    <PrismicRichText field={item.answer} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export default function HowWeWork({ slice }) {
  const images = isFilled.group(slice.primary.images)
    ? slice.primary.images
    : [];
  const faqItems = isFilled.group(slice.primary.faq_items)
    ? slice.primary.faq_items
    : [];

  return (
    <section className="page-section">
      <div className="container position-relative">
        <div className="row">
          {images.length > 0 && (
            <div className="col-lg-7 d-flex align-items-start mb-md-60 mb-xs-30">
              <div className="call-action-2-images">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`call-action-2-image-${index + 1}`}
                    data-rellax-y=""
                    data-rellax-speed={
                      index === 0 ? "0.5" : index === 2 ? "-0.5" : "0"
                    }
                    data-rellax-percentage={
                      index === 0 ? "0.7" : index === 2 ? "0.5" : "0"
                    }
                  >
                    {isFilled.image(img.image) && (
                      <PrismicNextImage
                        field={img.image}
                        width={img.width || 400}
                        height={img.height || 400}
                        alt="Image Description"
                        className="wow scaleOutIn"
                        data-wow-duration="1.2s"
                        data-wow-offset={255 - index * 100}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="col-lg-5 d-flex align-items-center">
            <div
              className="wow fadeInUp"
              data-wow-duration="1.2s"
              data-wow-offset={255}
            >
              {isFilled.richText(slice.primary.title) && (
                <h2 className="section-title mb-50 mb-sm-20">
                  <PrismicText field={slice.primary.title} />
                </h2>
              )}
              {faqItems.length > 0 && <FaqAccordion items={faqItems} />}
              {isFilled.link(slice.primary.cta_link) && (
                <div className="local-scroll">
                  <PrismicNextLink
                    field={slice.primary.cta_link}
                    className="btn btn-mod btn-large btn-round btn-hover-anim"
                  >
                    <span>
                      {slice.primary.cta_text || "Start a Project"}
                    </span>
                  </PrismicNextLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
