"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import Link from "next/link";

export default function Footer({ slice }) {
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const companyLinks = isFilled.group(slice.primary.company_links)
    ? slice.primary.company_links
    : [];
  const socialLinks = isFilled.group(slice.primary.social_links)
    ? slice.primary.social_links
    : [];
  const legalLinks = isFilled.group(slice.primary.legal_links)
    ? slice.primary.legal_links
    : [];

  return (
    <footer className="page-section footer bg-gray-light-1 pb-30">
      <div className="container">
        <div className="row pb-120 pb-sm-80 pb-xs-50">
          <div className="col-md-4 col-lg-3 text-gray mb-sm-50">
            <Link href={"/"} className="mb-30">
              {isFilled.image(slice.primary.logo_light) && (
                <PrismicNextImage
                  field={slice.primary.logo_light}
                  width={105}
                  height={34}
                  className="light-mode-logo"
                  alt="Logo"
                />
              )}
              {isFilled.image(slice.primary.logo_dark) && (
                <PrismicNextImage
                  field={slice.primary.logo_dark}
                  width={105}
                  height={34}
                  className="dark-mode-logo"
                  alt="Logo"
                />
              )}
            </Link>
            {isFilled.richText(slice.primary.about_text) && (
              <div className="mb-30">
                <PrismicRichText field={slice.primary.about_text} />
              </div>
            )}
            {isFilled.keyText(slice.primary.phone) && (
              <div className="clearlinks">
                <strong>T.</strong>
                <a href={`tel:${slice.primary.phone}`}>{slice.primary.phone}</a>
              </div>
            )}
            {isFilled.keyText(slice.primary.email) && (
              <div className="clearlinks">
                <strong>E.</strong>
                <a href={`mailto:${slice.primary.email}`}>
                  {slice.primary.email}
                </a>
              </div>
            )}
          </div>
          <div className="col-md-7 offset-md-1 offset-lg-2">
            <div className="row mt-n30">
              {isFilled.keyText(slice.primary.company_title) &&
                companyLinks.length > 0 && (
                  <div className="col-sm-4 mt-30">
                    <h3 className="fw-title">{slice.primary.company_title}</h3>
                    <ul className="fw-menu clearlist local-scroll">
                      {companyLinks.map((item, i) => (
                        <li key={i}>
                          <PrismicNextLink field={item.link}>
                            {item.link_text}
                          </PrismicNextLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {isFilled.keyText(slice.primary.social_title) &&
                socialLinks.length > 0 && (
                  <div className="col-sm-4 mt-30">
                    <h3 className="fw-title">{slice.primary.social_title}</h3>
                    <ul className="fw-menu clearlist">
                      {socialLinks.map((item, i) => (
                        <li key={i}>
                          <PrismicNextLink
                            field={item.url}
                            rel="noopener nofollow"
                            target="_blank"
                          >
                            {item.icon_class && (
                              <i className={item.icon_class} />
                            )}{" "}
                            {item.name}
                          </PrismicNextLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {isFilled.keyText(slice.primary.legal_title) &&
                legalLinks.length > 0 && (
                  <div className="col-sm-4 mt-30">
                    <h3 className="fw-title">{slice.primary.legal_title}</h3>
                    <ul className="fw-menu clearlist">
                      {legalLinks.map((item, i) => (
                        <li key={i}>
                          <PrismicNextLink field={item.link}>
                            {item.link_text}
                          </PrismicNextLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="row text-gray">
          <div className="col-md-4 col-lg-3">
            {isFilled.keyText(slice.primary.copyright_text) && (
              <b>{slice.primary.copyright_text}</b>
            )}
          </div>
          <div className="col-md-7 offset-md-1 offset-lg-2 clearfix">
            {isFilled.keyText(slice.primary.location_text) && (
              <b>{slice.primary.location_text}</b>
            )}
            <div className="local-scroll float-end mt-n20 mt-sm-10">
              <a href="#top" className="link-to-top" onClick={scrollToTop}>
                <i className="mi-arrow-up size-24" />
                <span className="visually-hidden">Scroll to top</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
