"use client";
import { PrismicRichText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import AnimatedText from "@/components/common/AnimatedText";

export default function ServiceList({ slice }) {
  const items = (
    isFilled.group(slice.primary.items) ? slice.primary.items : []
  ).filter(
    (item) => isFilled.keyText(item.label) || isFilled.richText(item.description),
  );

  return (
    <section className="page-section ll-servicelist">
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-8">
            {isFilled.keyText(slice.primary.caption) && (
              <h2 className="section-caption mb-xs-10">
                {slice.primary.caption}
              </h2>
            )}
            {isFilled.richText(slice.primary.title) && (
              <h3 className="section-title mb-30">
                <AnimatedText text={asText(slice.primary.title)} />
              </h3>
            )}
            {isFilled.richText(slice.primary.lead) && (
              <div
                className="ll-servicelist-lead wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <PrismicRichText field={slice.primary.lead} />
              </div>
            )}
          </div>
        </div>

        {items.length > 0 && (
          <ul className="ll-servicelist-grid wow fadeInUp" data-wow-delay="0.3s">
            {items.map((item, index) => (
              <li key={index} className="ll-servicelist-item">
                {item.label && (
                  <h4 className="ll-servicelist-label">{item.label}</h4>
                )}
                {isFilled.richText(item.description) && (
                  <div className="ll-servicelist-text">
                    <PrismicRichText field={item.description} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
