# Prismic Content Guide — Lanterns & Ledgers

All pages use the **Page** type (repeatable, UID-based).
Routes: `/about`, `/brand-strategy`, `/creative-design`, `/development`, `/contact`

---

## Homepage (already exists — just add remaining slices)

The Homepage already has: Header, Hero, Footer. Add these slices **between Hero and Footer**, in this order:

### 1. About slice
| Field | Value |
|---|---|
| Section ID | `about` |
| Caption | `Our Story` |
| Title | `Better way to create stunning layouts.` |
| Link Text | `Learn more about us` |
| Link | Web → `/about` |
| Mission Title | `Our Mission` |
| Mission Text | `We believe that a website is the foundation of a successful online presence, and our goal is to help businesses establish a strong digital presence. Our process begins with understanding your business goals.` |
| Vision Title | `Our Vision` |
| Vision Text | `We then use this information to create a custom website that not only reflects your brand but also helps you achieve your business objectives. From responsive design to intuitive navigation, we focus on every detail.` |

### 2. Services slice
| Field | Value |
|---|---|
| Section ID | `services` |
| Caption | `Our Services` |
| Title | `We provide the best development solutions.` |
| Description | `The power of design helps us to solve complex problems and cultivate business solutions.` |

**Services group items (add 6):**

| # | Title | Number | Description |
|---|---|---|---|
| 1 | Brand Strategy | 01 | The core identity reflects consistent associations with the brand whereas the extended identity involves the intricate details of the brand that help generate a constant motif. |
| 2 | Art Direction | 02 | Art direction is the process of managing the visual elements of a brand to create a cohesive and compelling aesthetic experience. |
| 3 | Creative Design | 03 | Creative design combines art and technology to communicate ideas through visual content that captures attention and drives engagement. |
| 4 | Development | 04 | We build fast, reliable, and scalable web applications using modern technologies and best practices for code quality. |
| 5 | Photography | 05 | Professional photography that tells your brand story through stunning visuals and creative composition. |
| 6 | Marketing | 06 | Strategic marketing solutions that help your brand reach the right audience and achieve measurable growth. |

### 3. ParallaxFacts slice
| Field | Value |
|---|---|
| Title | `Check recent achievements.` |
| Description | `We provide the effective ideas that grow businesses of our clients.` |
| CTA Text | `Request Price` |
| CTA Link | Web → `#contact` |

**Facts group items (add 4):**

| Title | Description |
|---|---|
| 28% | Resent tincidunt lacus sedenim posuere posuere nulla acusan. |
| 1.5k | Curabitur eu quam auctor nuca convallis metus nec feugia. |
| 30+ | Pellentesque pharetra libero eget vestibulum ullamcorper. |
| 2x | Suspendisse a scelerisque vitae rutrum posuere sec lacus. |

### 4. ContactCta slice
| Field | Value |
|---|---|
| Description | `The power of design helps us to solve complex problems and cultivate business solutions.` |
| CTA Text | `Contact us` |
| CTA Link | Web → `#contact` |

### 5. Benefits slice
| Field | Value |
|---|---|
| Caption | `Primary Benefits` |
| Title | `Why choose Lanterns & Ledgers?` |

**Features group items (add 3):**

| Title | Description | Icon |
|---|---|---|
| Unique Design | Fusce aliquet quam eget neque ultrices elementum felis id arcu blandit sagittis. | check |
| Quality Code | Lorem ipsum dolor sit amet rembe adipiscing elite Inwege maximus ligula imsum. | code |
| Clean and Minimal | Maecenas volutpat, diam enime volutpa cramas luctus interdum sodales. | star |

### 6. Testimonials slice
| Field | Value |
|---|---|
| Title | `Lanterns & Ledgers is trusted by 10,000+ customers.` |

**Testimonials group items (add 1):**

| Quote | Author | Role |
|---|---|---|
| This template is so beautiful and has such wonderful new options. It is updated often which gives me even more quality. The support is one of the absolute best I've ever had the pleasure of interacting with. | Adam Peterson | Business Owner |

### 7. HowWeWork slice
| Field | Value |
|---|---|
| Title | `How we work?` |
| CTA Text | `Start a Project` |
| CTA Link | Web → `#contact` |

**FAQ items group (add 4):**

| Question | Answer |
|---|---|
| 01. Discussion | Lorem ipsum dolor sit amet, consectetur adipiscing elit quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc. |
| 02. Design | Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet dignissim pellentesque felis. |
| 03. Development | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. |
| 04. Production | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. |

### 8. Contact slice
| Field | Value |
|---|---|
| Section ID | `contact` |
| Caption | `Contact Us` |
| Title | `Let's start the productive work.` |
| Form Title | `Name` |
| Form Email Label | `Email` |
| Form Message Label | `Message` |
| Form Button Text | `Send Message` |
| Form Tip | `All the fields are required. By sending the form you agree to the Terms & Conditions and Privacy Policy.` |
| Map Embed URL | `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3071.5318265717196!2d-75.60465104752062!3d39.660249785873326` |

**Contact items group (add 2):**

| Title | Icon | Lines |
|---|---|---|
| Say hello | email | `hello@lanternsledgers.com` (new line) `+1 837 652 8800` |
| Location | location | `123 King Street, London W6 9JG, United Kingdom` |

---

## About Page (new — Page type, UID: `about`)

**Title:** `About Us`

### Slices (in order):

#### 1. Header slice
| Field | Value |
|---|---|
| CTA Text | `Let's work together` |
| CTA Link | Web → `/contact` |

**Nav links (add 4):**

| Link Text | Link |
|---|---|
| Home | Web → `/` |
| About | Web → `/about` |
| Services | Web → `/brand-strategy` |
| Contact | Web → `/contact` |

#### 2. PageHeader slice
| Field | Value |
|---|---|
| Caption | `About Our Company` |
| Title | `Welcome to Lanterns & Ledgers` |
| Description | `We are a full-service creative studio creating beautiful digital experiences and products.` |

#### 3. About slice
| Field | Value |
|---|---|
| Section ID | `about` |
| Caption | `Our Story` |
| Title | `Better way to create stunning layouts.` |
| Link Text | `Explore Our Services` |
| Link | Web → `/brand-strategy` |
| Mission Title | `Our Mission` |
| Mission Text | `We believe that a website is the foundation of a successful online presence, and our goal is to help businesses establish a strong digital presence.` |
| Vision Title | `Our Vision` |
| Vision Text | `We create custom websites that reflect your brand and help you achieve your business objectives.` |

#### 4. Benefits slice
| Field | Value |
|---|---|
| Caption | `Primary Benefits` |
| Title | `Why choose Lanterns & Ledgers?` |

**Features (same 3 as homepage):** Unique Design / Quality Code / Clean and Minimal

#### 5. HowWeWork slice
| Field | Value |
|---|---|
| Title | `How we work?` |
| CTA Text | `Start a Project` |
| CTA Link | Web → `/contact` |

**FAQ items (same 4 as homepage)**

#### 6. ContactCta slice
| Field | Value |
|---|---|
| Description | `Ready to start your project? Let's create something amazing together.` |
| CTA Text | `Contact us` |
| CTA Link | Web → `/contact` |

#### 7. Footer slice
| Field | Value |
|---|---|
| About Text | `Integer auctor aliquet martor, sed lorem malesuada eros blandit eget. Proin lacinia mortoc id odio vestibulum.` |
| Phone | `+1 837 652 8800` |
| Email | `hello@lanternsledgers.com` |
| Company Column Title | `Company` |

**Company links:** About → `/about`, Services → `/brand-strategy`, Contact → `/contact`

| Field | Value |
|---|---|
| Social Column Title | `Social Media` |

**Social links:** Facebook (fa-facebook) → `https://facebook.com`, YouTube (fa-youtube) → `https://youtube.com`, LinkedIn (fa-linkedin) → `https://linkedin.com`

| Field | Value |
|---|---|
| Legal Column Title | `Legal & Press` |

**Legal links:** Privacy Policy → `#`, Terms & Conditions → `#`

| Field | Value |
|---|---|
| Copyright Text | `© Lanterns & Ledgers 2026.` |
| Location Text | `Based in London, United Kingdom.` |

---

## Service Pages (3 new — Page type)

### Service 1: Brand Strategy (UID: `brand-strategy`)

**Title:** `Brand Strategy`

#### Slices: Header → PageHeader → Services → Benefits → ParallaxFacts → ContactCta → Footer

**PageHeader:**
| Field | Value |
|---|---|
| Caption | `Our Services` |
| Title | `Brand Strategy` |
| Description | `The core identity reflects consistent associations with the brand whereas the extended identity involves the intricate details of the brand that help generate a constant motif.` |

**Services (single item):**
| Field | Value |
|---|---|
| Section ID | `services` |
| Caption | `Branding` |
| Title | `Brand Strategy` |
| Description | `The core identity reflects consistent associations with the brand whereas the extended identity involves the intricate details of the brand that help generate a constant motif.` |

Services group item: Title `Brand Strategy`, Number `01`, Description same as above.

**Benefits, ParallaxFacts, ContactCta, Footer:** same as About page

---

### Service 2: Creative Design (UID: `creative-design`)

**Title:** `Creative Design`

**PageHeader:**
| Field | Value |
|---|---|
| Caption | `Our Services` |
| Title | `Creative Design` |
| Description | `Creative design combines art and technology to communicate ideas through visual content that captures attention and drives engagement.` |

**Services (single item):**
| Field | Value |
|---|---|
| Section ID | `services` |
| Caption | `Design` |
| Title | `Creative Design` |
| Description | `Creative design combines art and technology to communicate ideas through visual content that captures attention and drives engagement.` |

Services group: Title `Creative Design`, Number `03`, same description.

---

### Service 3: Development (UID: `development`)

**Title:** `Development`

**PageHeader:**
| Field | Value |
|---|---|
| Caption | `Our Services` |
| Title | `Development` |
| Description | `We build fast, reliable, and scalable web applications using modern technologies and best practices for code quality.` |

**Services (single item):**
| Field | Value |
|---|---|
| Section ID | `services` |
| Caption | `Development` |
| Title | `Development` |
| Description | `We build fast, reliable, and scalable web applications using modern technologies and best practices for code quality.` |

Services group: Title `Development`, Number `04`, same description.

---

## Contact Page (new — Page type, UID: `contact`)

**Title:** `Contact`

### Slices: Header → PageHeader → Contact → Footer

**PageHeader:**
| Field | Value |
|---|---|
| Caption | `Get in Touch` |
| Title | `Let's work together` |
| Description | `Have a project in mind? We'd love to hear about it. Drop us a line and let's create something amazing.` |

**Contact slice:**
| Field | Value |
|---|---|
| Section ID | `contact` |
| Caption | `Contact Us` |
| Title | `Let's start the productive work.` |
| Form Title | `Name` |
| Form Email Label | `Email` |
| Form Message Label | `Message` |
| Form Button Text | `Send Message` |
| Form Tip | `All the fields are required. By sending the form you agree to the Terms & Conditions and Privacy Policy.` |
| Map Embed URL | `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3071.5318265717196` |

**Contact items:**
| Title | Icon | Lines |
|---|---|---|
| Say hello | email | `hello@lanternsledgers.com` (new line) `+1 837 652 8800` |
| Location | location | `123 King Street, London W6 9JG, United Kingdom` |

---

## Header & Footer slices (reusable on all pages)

For every page, add a **Header** slice first and a **Footer** slice last. Use the same content:

### Header (for all pages)
| Field | Value |
|---|---|
| CTA Text | `Let's work together` |
| CTA Link | Web → `/contact` |

**Nav links:**
| Link Text | Link |
|---|---|
| Home | Web → `/` |
| About | Web → `/about` |
| Services | Web → `/brand-strategy` |
| Contact | Web → `/contact` |

### Footer (for all pages)
| Field | Value |
|---|---|
| About Text | `Integer auctor aliquet martor, sed lorem malesuada eros blandit eget. Proin lacinia mortoc id odio vestibulum.` |
| Phone | `+1 837 652 8800` |
| Email | `hello@lanternsledgers.com` |
| Company Column Title | `Company` |
| Social Column Title | `Social Media` |
| Legal Column Title | `Legal & Press` |
| Copyright Text | `© Lanterns & Ledgers 2026.` |
| Location Text | `Based in London, United Kingdom.` |

**Company links:** About → `/about`, Services → `/brand-strategy`, Contact → `/contact`
**Social links:** Facebook → `https://facebook.com`, YouTube → `https://youtube.com`, LinkedIn → `https://linkedin.com`
**Legal links:** Privacy Policy → `#`, Terms & Conditions → `#`

---

## Page Routes Summary

| Page | UID | Route |
|---|---|---|
| Homepage | (singleton) | `/` |
| About | `about` | `/about` |
| Brand Strategy | `brand-strategy` | `/brand-strategy` |
| Creative Design | `creative-design` | `/creative-design` |
| Development | `development` | `/development` |
| Contact | `contact` | `/contact` |
