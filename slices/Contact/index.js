"use client";
import { PrismicRichText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import AnimatedText from "@/components/common/AnimatedText";

const ICON_PATHS = {
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z",
};

export default function Contact({ slice }) {
  const sectionId = slice.primary.section_id || "contact";
  const contactItems = isFilled.group(slice.primary.contact_items)
    ? slice.primary.contact_items
    : [];

  return (
    <section className="page-section scrollSpysection" id={sectionId}>
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-6">
            <div className="row mb-50">
              <div className="col-lg-10">
                {isFilled.keyText(slice.primary.caption) && (
                  <h2 className="section-caption mb-xs-10">
                    {slice.primary.caption}
                  </h2>
                )}
                {isFilled.richText(slice.primary.title) && (
                  <h3 className="section-title mb-0">
                    <span className="wow charsAnimIn" data-splitting="chars">
                      <AnimatedText text={asText(slice.primary.title)} />
                    </span>
                  </h3>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row mb-60 mb-sm-50">
              {contactItems.map((item, index) => {
                const iconPath = ICON_PATHS[item.icon] || ICON_PATHS.email;
                return (
                  <div
                    key={index}
                    className="col-sm-6 mb-xs-30 d-flex align-items-stretch"
                  >
                    <div
                      className="alt-features-item border-left mt-0 wow fadeScaleIn"
                      data-wow-delay={`.${3 + index * 2}s`}
                    >
                      <div className="alt-features-icon">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d={iconPath} />
                        </svg>
                      </div>
                      {item.title && (
                        <h4 className="alt-features-title">{item.title}</h4>
                      )}
                      {isFilled.richText(item.lines) && (
                        <div className="alt-features-descr clearlinks">
                          <PrismicRichText field={item.lines} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="0.5s">
          <div className="col-md-6 mb-sm-50">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="form contact-form pe-lg-5"
              id="contact_form"
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="name">
                      {slice.primary.form_title || "Name"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="input-lg round form-control"
                      placeholder="Enter your name"
                      pattern=".{3,100}"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="email">
                      {slice.primary.form_email_label || "Email"}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="input-lg round form-control"
                      placeholder="Enter your email"
                      pattern=".{5,100}"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">
                  {slice.primary.form_message_label || "Message"}
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="input-lg round form-control"
                  style={{ height: 130 }}
                  placeholder="Enter your message"
                  defaultValue={""}
                />
              </div>
              <div className="row">
                <div className="col-lg-5">
                  <div className="pt-20">
                    <button
                      className="submit_btn btn btn-mod btn-large btn-round btn-hover-anim"
                      id="submit_btn"
                      aria-controls="result"
                    >
                      <span>
                        {slice.primary.form_button_text || "Send Message"}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="col-lg-7">
                  {isFilled.richText(slice.primary.form_tip) && (
                    <div className="form-tip pt-20 pt-sm-0 mt-sm-20">
                      <PrismicRichText field={slice.primary.form_tip} />
                    </div>
                  )}
                </div>
              </div>
              <div
                id="result"
                role="region"
                aria-live="polite"
                aria-atomic="true"
              />
            </form>
          </div>
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="map-boxed">
              {isFilled.keyText(slice.primary.map_embed_url) && (
                <iframe
                  src={slice.primary.map_embed_url}
                  width={600}
                  height={450}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
