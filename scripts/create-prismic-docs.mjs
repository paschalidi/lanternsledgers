#!/usr/bin/env node
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6ImxhbnRlcm5zbGVkZ2Vycy1iNWE4ZWQ0Ni1iZTcwLTQ4ODAtOWJiNi05YTQzMTRhMzU3MDhfNSIsImRhdGUiOjE3ODYxNzgwMjQsImRvbWFpbiI6ImxhbnRlcm5zbGVkZ2VycyIsImFwcE5hbWUiOiJNaWdyYXRpb24gQVBJIiwiaWF0IjoxNzg2MTc4MDI0fQ.1lc6A0681srWyHrCcId_-rqgK8MT6oQsi6qBwaQYzCk";
const REPO = "lanternsledgers";
const API = "https://migration.prismic.io";
const X_API_KEY = "cSaZlfkQlF9C6CEAM2Del6MNX9WonlV86HPbeEJL";

const p = (t) => [{ type: "paragraph", text: t, spans: [] }];
const h = (t, l = "heading2") => [{ type: l, text: t, spans: [] }];
const L = (url, text) => ({ link_type: "Web", url, text });
const Lraw = (url) => ({ link_type: "Web", url });

const nav = [
  { link_text: "Home", link: Lraw("/") },
  { link_text: "About", link: Lraw("/about") },
  { link_text: "Services", link: Lraw("/brand-strategy") },
  { link_text: "Contact", link: Lraw("/contact") },
];

const S = (type, primary) => ({ slice_type: type, variation: "default", primary });

const footerSlice = S("footer", {
  about_text: p("Integer auctor aliquet martor, sed lorem malesuada eros blandit eget. Proin lacinia mortoc id odio vestibulum."),
  phone: "+1 837 652 8800", email: "hello@lanternsledgers.com",
  company_title: "Company",
  company_links: [
    { link_text: "About", link: Lraw("/about") },
    { link_text: "Services", link: Lraw("/brand-strategy") },
    { link_text: "Contact", link: Lraw("/contact") },
  ],
  social_title: "Social Media",
  social_links: [
    { name: "Facebook", icon_class: "fa-facebook", url: Lraw("https://facebook.com") },
    { name: "YouTube", icon_class: "fa-youtube", url: Lraw("https://youtube.com") },
    { name: "LinkedIn", icon_class: "fa-linkedin", url: Lraw("https://linkedin.com") },
  ],
  legal_title: "Legal & Press",
  legal_links: [
    { link_text: "Privacy Policy", link: Lraw("#") },
    { link_text: "Terms & Conditions", link: Lraw("#") },
  ],
  copyright_text: "\u00A9 Lanterns & Ledgers 2026.",
  location_text: "Based in London, United Kingdom.",
});

const headerSlice = S("header", { cta_text: "Let's work together", cta_link: L("#contact", "Let's work together"), nav_links: nav });

const benefitsSlice = S("benefits", {
  caption: "Primary Benefits", title: h("Why choose Lanterns & Ledgers?", "heading3"),
  features: [
    { title: "Unique Design", description: p("Fusce aliquet quam eget neque ultrices elementum felis id arcu blandit sagittis."), icon: "check" },
    { title: "Quality Code", description: p("Lorem ipsum dolor sit amet rembe adipiscing elite Inwege maximus ligula imsum."), icon: "code" },
    { title: "Clean and Minimal", description: p("Maecenas volutpat, diam enime volutpa cramas luctus interdum sodales."), icon: "star" },
  ],
});

const factsSlice = S("parallax_facts", {
  title: h("Check recent achievements."), description: p("We provide the effective ideas that grow businesses of our clients."),
  cta_text: "Request Price", cta_link: L("#contact", "Request Price"),
  facts: [
    { title: "28%", description: "Resent tincidunt lacus sedenim posuere posuere nulla acusan." },
    { title: "1.5k", description: "Curabitur eu quam auctor nuca convallis metus nec feugia." },
    { title: "30+", description: "Pellentesque pharetra libero eget vestibulum ullamcorper." },
    { title: "2x", description: "Suspendisse a scelerisque vitae rutrum posuere sec lacus." },
  ],
});

const ctaSlice = S("contact_cta", { description: p("The power of design helps us to solve complex problems and cultivate business solutions."), cta_text: "Contact us", cta_link: L("#contact", "Contact us") });

const faqItems = [
  { question: "01. Discussion", answer: p("Lorem ipsum dolor sit amet, consectetur adipiscing elit quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.") },
  { question: "02. Design", answer: p("Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet dignissim pellentesque felis.") },
  { question: "03. Development", answer: p("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.") },
  { question: "04. Production", answer: p("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.") },
];

const contactSlice = S("contact", {
  section_id: "contact", caption: "Contact Us", title: h("Let's start the productive work.", "heading3"),
  contact_items: [
    { title: "Say hello", icon: "email", lines: [{ type: "paragraph", text: "hello@lanternsledgers.com", spans: [] }, { type: "paragraph", text: "+1 837 652 8800", spans: [] }] },
    { title: "Location", icon: "location", lines: p("123 King Street, London W6 9JG, United Kingdom") },
  ],
  form_title: "Name", form_email_label: "Email", form_message_label: "Message",
  form_button_text: "Send Message",
  form_tip: p("All the fields are required. By sending the form you agree to the Terms & Conditions and Privacy Policy."),
  map_embed_url: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3071.53",
});

async function createRelease() {
  // Release creation may fail with demo key — documents go to default migration release
  try {
    const r = await fetch(`${API}/releases`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "x-api-key": X_API_KEY, repository: REPO, "Content-Type": "application/json" },
      body: JSON.stringify({ name: "All pages content" }),
    });
    const d = await r.json();
    console.log("Release:", r.status, d.id || "(using default release)");
    return d.id;
  } catch {
    console.log("Release: using default migration release");
    return null;
  }
}

async function post(releaseId, doc) {
  const body = {
    title: doc.title, type: doc.type, lang: "en-us",
    data: { slices: doc.slices },
  };
  if (doc.uid) body.uid = doc.uid;

  const headers = { Authorization: `Bearer ${TOKEN}`, "x-api-key": X_API_KEY, repository: REPO, "Content-Type": "application/json" };
  if (releaseId) headers["X-Release-Id"] = releaseId;

  const r = await fetch(`${API}/documents`, { method: "POST", headers, body: JSON.stringify(body) });
  const t = await r.text();
  console.log(`  ${doc.type}${doc.uid ? "/" + doc.uid : ""}: ${r.status} ${t.slice(0, 200)}`);
}

async function main() {
  const rid = await createRelease();
  // Continue even without a release — documents go to default migration release

  await post(rid, {
    type: "homepage", title: "Homepage",
    slices: [
      headerSlice,
      S("hero", {
        caption: "Lanterns & Ledgers Creative Studio",
        title: h("Grow your business with a new website.", "heading1"),
        description: p("Lanterns & Ledgers is a full-service creative studio creating beautiful digital experiences and products."),
        primary_button_text: "Discover now", primary_button_link: { link_type: "Web", url: "#about", text: "Discover now", variant: "Primary" },
        video_link_text: "How it works?", video_id: "jTea_8Fk5Ns", scroll_down_text: "Scroll Down",
      }),
      S("about", {
        section_id: "about", caption: "Our Story", title: h("Better way to create stunning layouts.", "heading3"),
        link_text: "Learn more about us", link: Lraw("/about"),
        mission_title: "Our Mission", mission_text: p("We believe that a website is the foundation of a successful online presence, and our goal is to help businesses establish a strong digital presence. Our process begins with understanding your business goals."),
        vision_title: "Our Vision", vision_text: p("We then use this information to create a custom website that not only reflects your brand but also helps you achieve your business objectives. From responsive design to intuitive navigation, we focus on every detail."),
      }),
      S("services", {
        section_id: "services", caption: "Our Services", title: h("We provide the best development solutions.", "heading3"),
        description: p("The power of design helps us to solve complex problems and cultivate business solutions."),
        services: [
          { title: "Brand Strategy", number: "01", description: p("The core identity reflects consistent associations with the brand whereas the extended identity involves the intricate details of the brand that help generate a constant motif.") },
          { title: "Art Direction", number: "02", description: p("Art direction is the process of managing the visual elements of a brand to create a cohesive and compelling aesthetic experience.") },
          { title: "Creative Design", number: "03", description: p("Creative design combines art and technology to communicate ideas through visual content that captures attention and drives engagement.") },
          { title: "Development", number: "04", description: p("We build fast, reliable, and scalable web applications using modern technologies and best practices for code quality.") },
          { title: "Photography", number: "05", description: p("Professional photography that tells your brand story through stunning visuals and creative composition.") },
          { title: "Marketing", number: "06", description: p("Strategic marketing solutions that help your brand reach the right audience and achieve measurable growth.") },
        ],
      }),
      factsSlice, ctaSlice, benefitsSlice,
      S("testimonials", {
        title: h("Lanterns & Ledgers is trusted by 10,000+ customers."),
        testimonials: [{ quote: p("This template is so beautiful and has such wonderful new options. It is updated often which gives me even more quality. The support is one of the absolute best I've ever had the pleasure of interacting with."), author: "Adam Peterson", role: "Business Owner" }],
      }),
      S("how_we_work", { title: h("How we work?"), cta_text: "Start a Project", cta_link: L("#contact", "Start a Project"), faq_items: faqItems }),
      contactSlice, footerSlice,
    ],
  });

  await new Promise(f => setTimeout(f, 1100));

  await post(rid, {
    type: "page", uid: "about", title: "About Us",
    slices: [
      headerSlice,
      S("page_header", { caption: "About Our Company", title: h("Welcome to Lanterns & Ledgers", "heading1"), description: p("We are a full-service creative studio creating beautiful digital experiences and products.") }),
      S("about", {
        section_id: "about", caption: "Our Story", title: h("Better way to create stunning layouts.", "heading3"),
        link_text: "Explore Our Services", link: Lraw("/brand-strategy"),
        mission_title: "Our Mission", mission_text: p("We believe that a website is the foundation of a successful online presence, and our goal is to help businesses establish a strong digital presence."),
        vision_title: "Our Vision", vision_text: p("We create custom websites that reflect your brand and help you achieve your business objectives."),
      }),
      benefitsSlice,
      S("how_we_work", { title: h("How we work?"), cta_text: "Start a Project", cta_link: L("/contact", "Start a Project"), faq_items: faqItems }),
      S("contact_cta", { description: p("Ready to start your project? Let's create something amazing together."), cta_text: "Contact us", cta_link: L("/contact", "Contact us") }),
      footerSlice,
    ],
  });

  for (const svc of [
    { uid: "brand-strategy", title: "Brand Strategy", caption: "Branding", number: "01", desc: "The core identity reflects consistent associations with the brand whereas the extended identity involves the intricate details of the brand that help generate a constant motif." },
    { uid: "creative-design", title: "Creative Design", caption: "Design", number: "03", desc: "Creative design combines art and technology to communicate ideas through visual content that captures attention and drives engagement." },
    { uid: "development", title: "Development", caption: "Development", number: "04", desc: "We build fast, reliable, and scalable web applications using modern technologies and best practices for code quality." },
  ]) {
    await new Promise(f => setTimeout(f, 1100));
    await post(rid, {
      type: "page", uid: svc.uid, title: svc.title,
      slices: [
        headerSlice,
        S("page_header", { caption: "Our Services", title: h(svc.title, "heading1"), description: p(svc.desc) }),
        S("services", { section_id: "services", caption: svc.caption, title: h(svc.title, "heading3"), description: p(svc.desc), services: [{ title: svc.title, number: svc.number, description: p(svc.desc) }] }),
        benefitsSlice, factsSlice,
        S("contact_cta", { description: p("Ready to start your project? Let's create something amazing together."), cta_text: "Contact us", cta_link: L("/contact", "Contact us") }),
        footerSlice,
      ],
    });
  }

  await new Promise(f => setTimeout(f, 1100));
  await post(rid, {
    type: "page", uid: "contact", title: "Contact",
    slices: [
      headerSlice,
      S("page_header", { caption: "Get in Touch", title: h("Let's work together", "heading1"), description: p("Have a project in mind? We'd love to hear about it. Drop us a line and let's create something amazing.") }),
      contactSlice, footerSlice,
    ],
  });

  console.log("\nDone! Review & publish at: https://lanternsledgers.prismic.io/builder/migration");
}

main().catch(console.error);
