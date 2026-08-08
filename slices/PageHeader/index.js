"use client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import AnimatedText from "@/components/common/AnimatedText";
import ParallaxContainer from "@/components/common/ParallaxContainer";

export default function PageHeader({ slice }) {
  const bgStyle = isFilled.image(slice.primary.background_image)
    ? { backgroundImage: `url(${slice.primary.background_image.url})` }
    : {
        backgroundImage:
          "url(/assets/images/full-width-images/section-bg-1.jpg)",
      };

  return (
    <ParallaxContainer
      className="page-section bg-gray-light-1 bg-light-alpha-90 parallax-5 parallax-mousemove-scene scrollSpysection"
      style={bgStyle}
      id="home"
    >
      <div className="container position-relative">
        <div className="row">
          <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2 text-center">
            {isFilled.keyText(slice.primary.caption) && (
              <h2 className="section-caption-border mb-xs-10 wow fadeInUp">
                {slice.primary.caption}
              </h2>
            )}
            {isFilled.richText(slice.primary.title) && (
              <h1 className="hs-title-1 mb-30">
                <AnimatedText text={asText(slice.primary.title)} />
              </h1>
            )}
            {isFilled.richText(slice.primary.description) && (
              <div className="section-descr mb-0 wow fadeInUp" data-wow-delay="0.3s">
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ParallaxContainer>
  );
}
