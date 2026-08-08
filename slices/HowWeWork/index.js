"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import { useState } from "react";

function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="call-action-2-text mb-50 mb-sm-40">
      <dl className="accordion">
        {items.map((item, index) => (
          <div key={index}>
            <dt
              className={`toggle ${index === openIndex ? "active" : ""}`}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              style={{ cursor: "pointer" }}
            >
              {item.question}
            </dt>
            <div
              style={{
                maxHeight: index === openIndex ? "500px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              {isFilled.richText(item.answer) && (
                <PrismicRichText field={item.answer} />
              )}
            </div>
          </div>
        ))}
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
