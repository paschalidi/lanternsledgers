"use client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials({ slice }) {
  const testimonials = isFilled.group(slice.primary.testimonials)
    ? slice.primary.testimonials
    : [];

  const navId = "ts-nav";

  return (
    <section className="page-section pt-0 pb-0">
      <div className="container position-relative">
        <div className="pt-80 pb-80 pt-sm-70 pb-sm-70 px-4 bg-gray-light-1">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 wow fadeInUp">
              <div className="row">
                <div className="col-md-10 offset-md-1 text-center">
                  {isFilled.richText(slice.primary.title) && (
                    <h2 className="section-title mb-70 mb-sm-40">
                      <PrismicText field={slice.primary.title} />
                    </h2>
                  )}
                </div>
              </div>
              {testimonials.length > 0 && (
                <div className="overflow-hidden">
                  <Swiper
                    rewind
                    spaceBetween={0}
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation={{
                      prevEl: `.${navId}-prev`,
                      nextEl: `.${navId}-next`,
                    }}
                    watchSlidesProgress
                    resizeObserver
                    style={{ opacity: 1, display: "block" }}
                    className="testimonials-slider-1 owl-carousel owl-theme pb-xs-80 overflow-visible position-static"
                  >
                    {testimonials.map((t, index) => (
                      <SwiperSlide className="owl-item" key={index}>
                        <div>
                          <blockquote className="mb-0">
                            <div
                              className="blockquote-icon"
                              aria-hidden="true"
                            >
                              "
                            </div>
                            {isFilled.richText(t.quote) && (
                              <p>
                                <PrismicText field={t.quote} />
                              </p>
                            )}
                            <div className="section-line mt-40" />
                            <footer className="ts1-author mt-20 clearfix">
                              {isFilled.image(t.image) && (
                                <div className="ts1-author-img float-start">
                                  <PrismicNextImage
                                    field={t.image}
                                    className="rounded-circle"
                                    width={44}
                                    height={44}
                                    alt={t.author || "Author"}
                                  />
                                </div>
                              )}
                              <div className="overflow-hidden">
                                {t.author}
                                {t.role && (
                                  <div className="small">{t.role}</div>
                                )}
                              </div>
                            </footer>
                          </blockquote>
                        </div>
                      </SwiperSlide>
                    ))}
                    <div className="owl-controls clickable">
                      <div className="owl-buttons">
                        <div
                          className={`owl-prev ${navId}-prev`}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="visually-hidden">
                            Previous Slide
                          </span>
                          <i className="mi-arrow-left" aria-hidden="true"></i>
                        </div>
                        <div
                          className={`owl-next ${navId}-next`}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="visually-hidden">
                            Next Slide
                          </span>
                          <i className="mi-arrow-right" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </Swiper>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
