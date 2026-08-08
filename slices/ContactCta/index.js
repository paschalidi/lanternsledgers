"use client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import Image from "next/image";

export default function ContactCta({ slice }) {
  return (
    <section className="page-section">
      <div className="container position-relative">
        <div
          className="decoration-3 d-none d-sm-block"
          data-rellax-y=""
          data-rellax-speed="-0.7"
          data-rellax-percentage="0.5"
        >
          <Image
            width={148}
            height={148}
            className="svg-shape"
            src="/assets/images/decoration-3.svg"
            alt="decoration"
          />
        </div>
        <div className="row text-center wow fadeInUp">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            {isFilled.richText(slice.primary.description) && (
              <p className="section-descr mb-50 mb-sm-30">
                <PrismicText field={slice.primary.description} />
              </p>
            )}
            {isFilled.link(slice.primary.cta_link) && (
              <div className="local-scroll">
                <PrismicNextLink
                  field={slice.primary.cta_link}
                  className="btn btn-mod btn-large btn-round btn-hover-anim"
                >
                  <span>{slice.primary.cta_text || "Contact us"}</span>
                </PrismicNextLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
