"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import { toggleMobileMenu, closeMobileMenu } from "@/utlis/toggleMobileMenu";
import addScrollspy from "@/utlis/addScrollSpy";
import { init_classic_menu_resize } from "@/utlis/menuToggle";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Header({ slice }) {
  const pathname = usePathname();

  useEffect(() => {
    init_classic_menu_resize();
    window.addEventListener("scroll", addScrollspy);
    window.addEventListener("resize", init_classic_menu_resize);
    return () => {
      window.removeEventListener("scroll", addScrollspy);
      window.removeEventListener("resize", init_classic_menu_resize);
    };
  }, []);

  const navLinks = isFilled.group(slice.primary.nav_links)
    ? slice.primary.nav_links
    : [];
  const isOnePage =
    navLinks.length > 0 && navLinks[0].link?.url?.startsWith("#");

  return (
    <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
      <div className="main-nav-sub full-wrapper">
        <div className="nav-logo-wrap local-scroll">
          <Link href="/" className="logo">
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
        </div>
        <div
          onClick={toggleMobileMenu}
          className="mobile-nav"
          role="button"
          tabIndex={0}
        >
          <i className="mobile-nav-icon" />
          <span className="visually-hidden">Menu</span>
        </div>
        <div className="inner-nav desktop-nav">
          <ul className="clearlist scroll-nav local-scroll scrollspyLinks">
            {navLinks.map((item, index) => {
              const url = item.link?.url || "#";
              if (isOnePage) {
                return (
                  <li className="scrollspy-link" key={index}>
                    <a
                      onClick={() => closeMobileMenu()}
                      className=""
                      href={url}
                    >
                      {item.link_text}
                    </a>
                  </li>
                );
              }
              return (
                <li key={index}>
                  <PrismicNextLink
                    field={item.link}
                    className={
                      pathname.split("/")[1] == url.split("/")[1]
                        ? "active"
                        : ""
                    }
                  >
                    {item.link_text}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
          <ul className="items-end clearlist local-scroll">
            {isFilled.link(slice.primary.cta_link) && (
              <li>
                <PrismicNextLink
                  field={slice.primary.cta_link}
                  className="opacity-1 no-hover"
                >
                  <span
                    className="link-hover-anim underline"
                    data-link-animate="y"
                  >
                    {slice.primary.cta_text || "Let's work together"}
                  </span>
                </PrismicNextLink>
              </li>
            )}
            {isFilled.link(slice.primary.linkedin_url) && (
              <>
                <li aria-hidden="true" className="nav-cta-divider-wrap">
                  <span className="nav-cta-divider" />
                </li>
                <li>
                  <PrismicNextLink
                    field={slice.primary.linkedin_url}
                    className="nav-linkedin-btn"
                    aria-label="Connect with us on LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="7.025 7.025 497.951 497.95"
                      aria-hidden="true"
                    >
                      <linearGradient
                        id="ll-linkedin-grad"
                        gradientUnits="userSpaceOnUse"
                        x1="-974.482"
                        y1="1306.773"
                        x2="-622.378"
                        y2="1658.877"
                        gradientTransform="translate(1054.43 -1226.825)"
                      >
                        <stop offset="0" stopColor="#2489be" />
                        <stop offset="1" stopColor="#0575b3" />
                      </linearGradient>
                      <circle cx="256" cy="256" r="248.975" fill="#ffffff" />
                      <path
                        d="M256 7.025C118.494 7.025 7.025 118.494 7.025 256S118.494 504.975 256 504.975 504.976 393.506 504.976 256C504.975 118.494 393.504 7.025 256 7.025zm-66.427 369.343h-54.665V199.761h54.665v176.607zM161.98 176.633c-17.853 0-32.326-14.591-32.326-32.587 0-17.998 14.475-32.588 32.326-32.588s32.324 14.59 32.324 32.588c.001 17.997-14.472 32.587-32.324 32.587zm232.45 199.735h-54.4v-92.704c0-25.426-9.658-39.619-29.763-39.619-21.881 0-33.312 14.782-33.312 39.619v92.704h-52.43V199.761h52.43v23.786s15.771-29.173 53.219-29.173c37.449 0 64.257 22.866 64.257 70.169l-.001 111.825z"
                        fill="url(#ll-linkedin-grad)"
                      />
                    </svg>
                  </PrismicNextLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
