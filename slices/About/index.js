"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";

export default function About({ slice }) {
  const sectionId = slice.primary.section_id || "about";

  return (
    <section className="page-section scrollSpysection" id={sectionId}>
      <div className="container position-relative">
        <div className="row mb-60 mb-xs-30">
          <div className="col-md-6">
            {isFilled.keyText(slice.primary.caption) && (
              <h2 className="section-caption mb-xs-10">
                {slice.primary.caption}
              </h2>
            )}
            {isFilled.richText(slice.primary.title) && (
              <h3 className="section-title mb-0">
                <AnimatedText text={asText(slice.primary.title)} />
              </h3>
            )}
          </div>
          <div className="col-md-5 offset-md-1 relative text-start text-md-end pt-40 pt-sm-20 local-scroll">
            <div
              className="decoration-2 d-none d-md-block"
              data-rellax-y=""
              data-rellax-speed="0.7"
              data-rellax-percentage="-0.2"
            >
              <Image
                width="103"
                height="223"
                src="/assets/images/decoration-2.svg"
                alt="decoration"
              />
            </div>
            {isFilled.link(slice.primary.link) && (
              <PrismicNextLink
                field={slice.primary.link}
                className="link-hover-anim underline align-middle"
                data-link-animate="y"
              >
                <span className="link-strong link-strong-unhovered">
                  {slice.primary.link_text || "Learn more"}{" "}
                  <i className="mi-arrow-right size-18" aria-hidden="true"></i>
                </span>
                <span
                  className="link-strong link-strong-hovered"
                  aria-hidden="true"
                >
                  {slice.primary.link_text || "Learn more"}{" "}
                  <i className="mi-arrow-right size-18" aria-hidden="true"></i>
                </span>
              </PrismicNextLink>
            )}
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="0.5s">
          <div className="col-lg-6 mb-md-60">
            <div className="position-relative">
              <div className="position-relative overflow-hidden">
                {isFilled.image(slice.primary.image) && (
                  <PrismicNextImage
                    field={slice.primary.image}
                    className="image-fullwidth relative"
                    alt="About image"
                  />
                )}
              </div>
              <div
                className="decoration-1 d-none d-sm-block"
                data-rellax-y=""
                data-rellax-speed={1}
                data-rellax-percentage="0.1"
              >
                <Image
                  width="159"
                  height="74"
                  src="/assets/images/decoration-1.svg"
                  className="svg-shape"
                  alt="decoration"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-5 offset-xl-1">
            {isFilled.keyText(slice.primary.mission_title) && (
              <h4 className="h5">{slice.primary.mission_title}</h4>
            )}
            {isFilled.richText(slice.primary.mission_text) && (
              <div className="text-gray">
                <PrismicRichText field={slice.primary.mission_text} />
              </div>
            )}
            {isFilled.keyText(slice.primary.vision_title) && (
              <h4 className="h5">{slice.primary.vision_title}</h4>
            )}
            {isFilled.richText(slice.primary.vision_text) && (
              <div className="text-gray">
                <PrismicRichText field={slice.primary.vision_text} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
