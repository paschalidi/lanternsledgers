"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import AnimatedText from "@/components/common/AnimatedText";
import ModalVideo from "@/components/common/ModalVideo";
import { parallaxMouseMovement } from "@/utlis/parallax";
import { useEffect, useState } from "react";

export default function Hero({ slice }) {
  useEffect(() => {
    parallaxMouseMovement();
  }, []);
  const [isOpen, setOpen] = useState(false);

  const stackImages = isFilled.group(slice.primary.stack_images)
    ? slice.primary.stack_images
    : [];
  const titleText = asText(slice.primary.title) || "";

  return (
    <>
      <div className="container min-height-100vh d-flex align-items-center pt-100 pb-100 pt-sm-120 pb-sm-120">
        <div className="home-content text-start">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center mb-sm-60">
              <div>
                {isFilled.keyText(slice.primary.caption) && (
                  <h2
                    className="section-caption mb-30 mb-xs-10 wow fadeInUp"
                    data-wow-duration="1.2s"
                  >
                    {slice.primary.caption}
                  </h2>
                )}
                {isFilled.richText(slice.primary.title) && (
                  <h1 className="hs-title-1 mb-30">
                    <AnimatedText text={titleText} />
                  </h1>
                )}
                {isFilled.richText(slice.primary.description) && (
                  <div
                    className="section-descr mb-50 wow fadeInUp"
                    data-wow-delay="0.6s"
                    data-wow-duration="1.2s"
                  >
                    <PrismicRichText field={slice.primary.description} />
                  </div>
                )}
                <div
                  className="local-scroll mt-n10 wow fadeInUp wch-unset"
                  data-wow-delay="0.7s"
                  data-wow-duration="1.2s"
                  data-wow-offset={0}
                >
                  {isFilled.link(slice.primary.primary_button_link) && (
                    <PrismicNextLink
                      field={slice.primary.primary_button_link}
                      className="btn btn-mod btn-large btn-round btn-hover-anim align-middle me-2 me-sm-5 mt-10"
                    >
                      <span>
                        {slice.primary.primary_button_text || "Discover now"}
                      </span>
                    </PrismicNextLink>
                  )}
                  {isFilled.keyText(slice.primary.video_id) &&
                    isFilled.keyText(slice.primary.video_link_text) && (
                      <a
                        onClick={() => setOpen(true)}
                        className="link-hover-anim align-middle lightbox mfp-iframe mt-10"
                        data-link-animate="y"
                      >
                        <i className="icon-play size-13 me-1" />{" "}
                        {slice.primary.video_link_text}
                      </a>
                    )}
                </div>
              </div>
            </div>
            {stackImages.length > 0 && (
              <div className="col-md-5 offset-md-1 d-flex align-items-center">
                <div className="stack-images">
                  {stackImages.map((item, index) => {
                    const offset = (index + 1) * 30;
                    const delay = 1.2 + index * 0.5;
                    return (
                      <div
                        key={index}
                        className={`stack-images-${index + 1} parallax-mousemove`}
                        data-offset={offset}
                      >
                        <div
                          className="wow clipRightIn"
                          data-wow-delay={`${delay}s`}
                          data-wow-duration="1.75s"
                        >
                          {isFilled.image(item.image) && (
                            <PrismicNextImage
                              field={item.image}
                              width={600}
                              height={800}
                              alt="Image Description"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        {isFilled.keyText(slice.primary.scroll_down_text) && (
          <div
            className="local-scroll scroll-down-wrap-type-1 wow fadeInUp"
            data-wow-offset={0}
          >
            <div className="container">
              <a href="#about" className="scroll-down-1">
                <div className="scroll-down-1-icon">
                  <i className="mi-arrow-down" />
                </div>
                <div className="scroll-down-1-text">
                  {slice.primary.scroll_down_text}
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
      {isFilled.keyText(slice.primary.video_id) && (
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId={slice.primary.video_id}
          setIsOpen={() => setOpen(false)}
        />
      )}
    </>
  );
}
