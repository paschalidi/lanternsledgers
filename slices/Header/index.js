"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import { toggleMobileMenu, closeMobileMenu } from "@/utlis/toggleMobileMenu";
import addScrollspy from "@/utlis/addScrollSpy";
import { init_classic_menu_resize } from "@/utlis/menuToggle";
import { scrollToElement } from "@/utlis/scrollToElement";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Header({ slice }) {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      scrollToElement();
    }, 1000);
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
