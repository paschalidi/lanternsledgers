"use client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled, asText } from "@prismicio/client";
import AnimatedText from "@/components/common/AnimatedText";
import { useState } from "react";

export default function Services({ slice }) {
  const sectionId = slice.primary.section_id || "services";
  const services = isFilled.group(slice.primary.services)
    ? slice.primary.services
    : [];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="page-section scrollSpysection" id={sectionId}>
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-6 pe-lg-5 mb-md-60 mb-sm-30">
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
            <div className="row">
              <div className="col-lg-11">
                {isFilled.richText(slice.primary.description) && (
                  <div
                    className="section-descr mb-50 mb-sm-30 wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <PrismicRichText field={slice.primary.description} />
                  </div>
                )}
              </div>
            </div>
            {services.length > 0 && (
              <ul
                className="nav nav-tabs services-tabs wow fadeInUp"
                data-wow-delay="0.55s"
                role="tablist"
              >
                {services.map((service, index) => (
                  <li role="presentation" key={index}>
                    <a
                      href={`#services-item-${index}`}
                      className={index === activeTab ? "active" : ""}
                      role="tab"
                      aria-selected={index === activeTab ? "true" : "false"}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(index);
                      }}
                    >
                      {service.title}{" "}
                      {service.number && (
                        <span className="number">{service.number}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            className="col-lg-6 ps-lg-4 d-flex wow fadeInLeft"
            data-wow-delay="0.55s"
            data-wow-offset={275}
          >
            {services.length > 0 && (
              <div className="tab-content services-content ll-services-content">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`tab-pane services-content-item ${
                      index === activeTab ? "show fade active" : ""
                    }`}
                    id={`services-item-${index}`}
                    role="tabpanel"
                  >
                    <div className="ll-service-card">
                      {isFilled.image(service.image) && (
                        <div className="ll-service-media">
                          <PrismicNextImage
                            field={service.image}
                            alt={service.title || "Service image"}
                          />
                        </div>
                      )}
                      <div className="ll-service-body">
                        <h4 className="services-title">{service.title}</h4>
                        {isFilled.richText(service.description) && (
                          <p className="text-gray mb-0">
                            <PrismicText field={service.description} />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
