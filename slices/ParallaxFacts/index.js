"use client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

export default function ParallaxFacts({ slice }) {
  const facts = isFilled.group(slice.primary.facts)
    ? slice.primary.facts
    : [];

  return (
    <section className="page-section ll-facts">
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-4 mb-md-60 mb-xs-50">
            {isFilled.richText(slice.primary.title) && (
              <h2 className="section-title mb-20">
                <PrismicText field={slice.primary.title} />
              </h2>
            )}
            {isFilled.richText(slice.primary.description) && (
              <p className="section-descr mb-40">
                <PrismicText field={slice.primary.description} />
              </p>
            )}
            {isFilled.link(slice.primary.cta_link) && (
              <div className="local-scroll">
                <PrismicNextLink
                  field={slice.primary.cta_link}
                  className="btn btn-mod btn-w btn-large btn-round btn-hover-anim"
                >
                  <span>{slice.primary.cta_text || "Get in touch"}</span>
                </PrismicNextLink>
              </div>
            )}
          </div>
          {facts.length > 0 && (
            <div className="col-lg-7 offset-lg-1">
              <div className="row g-4 ll-facts-grid">
                {facts.map((fact, index) => (
                  <div className="col-sm-6 col-md-4" key={index}>
                    <div className="ll-fact-card">
                      {fact.title && (
                        <div className="number-title mb-10">{fact.title}</div>
                      )}
                      {fact.description && (
                        <div className="number-descr">{fact.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
