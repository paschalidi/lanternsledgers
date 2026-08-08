"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import ParallaxContainer from "@/components/common/ParallaxContainer";

export default function ParallaxFacts({ slice }) {
  const facts = isFilled.group(slice.primary.facts)
    ? slice.primary.facts
    : [];
  const bgStyle = isFilled.image(slice.primary.background_image)
    ? {
        backgroundImage: `url(${slice.primary.background_image.url})`,
      }
    : {
        backgroundImage:
          "url(/assets/images/full-width-images/section-bg-2.jpg)",
      };

  return (
    <ParallaxContainer
      className="page-section bg-dark-1 bg-dark-alpha-90 parallax-5 light-content"
      style={bgStyle}
    >
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-4 mb-md-60 mb-xs-50">
            {isFilled.richText(slice.primary.title) && (
              <h2 className="section-title mb-20 wow fadeInUp">
                <PrismicText field={slice.primary.title} />
              </h2>
            )}
            {isFilled.richText(slice.primary.description) && (
              <p
                className="section-descr mb-40 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <PrismicText field={slice.primary.description} />
              </p>
            )}
            {isFilled.link(slice.primary.cta_link) && (
              <div
                className="local-scroll wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <PrismicNextLink
                  field={slice.primary.cta_link}
                  className="btn btn-mod btn-w btn-large btn-round btn-hover-anim"
                >
                  <span>{slice.primary.cta_text || "Request Price"}</span>
                </PrismicNextLink>
              </div>
            )}
          </div>
          {facts.length > 0 && (
            <div className="col-lg-7 offset-lg-1">
              <div className="row mt-n50 mt-xs-n30">
                {facts.map((fact, index) => (
                  <div
                    key={index}
                    className={`col-sm-6 col-lg-5 mt-50 mt-xs-30 wow fadeScaleIn ${
                      index % 2 !== 0 ? "offset-lg-2" : ""
                    }`}
                    data-wow-delay={`${0.4 + index * 0.2}s`}
                  >
                    {fact.title && (
                      <div className="number-title mb-10">{fact.title}</div>
                    )}
                    {fact.description && (
                      <div className="number-descr">{fact.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ParallaxContainer>
  );
}
