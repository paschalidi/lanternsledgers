# Prismic Slice Machine for Next.js (JavaScript) — Comprehensive Guide

> Research compiled Aug 2026 from the official Prismic docs (prismic.io/docs),
> `@prismicio/react` v3 + `@prismicio/next` v2 technical references, and the
> `slice-machine` source on GitHub.

This guide covers creating slices **programmatically** (without the Slice Machine
UI) in a **JavaScript (not TypeScript)** Next.js project.

---

## 0. Mental model

- **Slice** = a reusable page section (hero, CTA, text block) modeled by a
  developer as a set of fields, then rendered by a React component.
- **Slice Zone** = an array of slices on a page type. Content writers stack
  slices in the Page Builder.
- **Slice Machine** = the *local* tool that reads/writes slice files in your
  repo. The new cloud equivalent is the **Type Builder**; the **Prismic CLI**
  (`npx prismic ...`) is the agent/terminal-friendly path and is the best fit for
  "create without the UI."
- All slice files live in your **codebase** (`src/slices/<Name>/`), are the
  source of truth, and get pushed to Prismic.

---

## 1. File system structure of a slice

A slice is a directory inside a **slice library** (a folder listed in
`slicemachine.config.json` → `libraries`). By default the library is
`./src/slices`.

```
src/
  slices/                      <- slice library (registered in slicemachine.config.json)
    index.js                   <- auto-generated: exports { components } for all slices
    CallToAction/
      index.js                 <- the React component (default export)
      model.json               <- the slice's content model (fields + variations)
      mocks.json               <- (optional) mock content for the simulator / tests
      preview.png              <- (optional) screenshot shown in the Page Builder
  customtypes/
    page/
      index.json               <- the "page" custom/page type model
  slicemachine.config.json     <- Slice Machine config
  prismicio.js                 <- generated Prismic client (routes, createClient)
```

### `slicemachine.config.json`

```json
{
  "repositoryName": "example-prismic-repo",
  "adapter": "@slicemachine/adapter-next",
  "libraries": ["./src/slices"],
  "localSliceSimulatorURL": "http://localhost:3000/slice-simulator"
}
```

### Auto-generated `src/slices/index.js`

Slice Machine (or `npx prismic pull`) upserts an index per library that
re-exports every slice's default component, so you can pass `components` straight
to `<SliceZone>`:

```js
// src/slices/index.js (generated — do not edit by hand unless you know why)
import CallToAction from "./CallToAction";
import Hero from "./Hero";
import TextBlock from "./TextBlock";

export { default as CallToAction } from "./CallToAction";
export { default as Hero } from "./Hero";
export { default as TextBlock } from "./TextBlock";

export const components = {
  call_to_action: CallToAction,
  hero: Hero,
  text_block: TextBlock,
};
```

> The object keys (`call_to_action`) are the slice's **API ID** (snake_case),
> taken from `model.json` → `id`. The values are the React components.

### Files per slice directory

| File          | Required | Purpose                                                          |
| ------------- | -------- | ---------------------------------------------------------------- |
| `model.json`  | Yes      | The content model: field definitions + variations. This IS the slice. |
| `index.js`    | Yes      | The React component rendered by `<SliceZone>`. Default export.   |
| `mocks.json`  | No       | Mock content for the slice simulator and component tests.        |
| `preview.png` | No       | Screenshot shown to editors in the Page Builder. Uploaded via CLI/UI. |

> Legacy slices may also contain `meta.json` / `preview.png`. The current
> minimal contract is **`model.json` + `index.js`**.

---

## 2. The `model.json` format

A slice is a JSON object of `"type": "SharedSlice"` with a `variations` array.
Every slice has at least the `default` variation.

### Minimal slice model

```json
{
  "id": "call_to_action",
  "type": "SharedSlice",
  "name": "CallToAction",
  "description": "CallToAction",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "docURL": "...",
      "version": "initial",
      "description": "A call to action with text and a button.",
      "imageUrl": "",
      "primary": {
        "text": {
          "type": "StructuredText",
          "config": {
            "label": "Text",
            "allowTargetBlank": true,
            "multi": "heading2,paragraph,strong,em,hyperlink"
          }
        },
        "button_link": {
          "type": "Link",
          "config": {
            "label": "Button Link",
            "allowTargetBlank": true,
            "allowText": true,
            "repeat": false,
            "variants": ["Primary", "Secondary"]
          }
        }
      },
      "items": {}
    }
  ]
}
```

### Top-level fields

| Key            | Type     | Notes                                                        |
| -------------- | -------- | ------------------------------------------------------------ |
| `id`           | string   | snake_case API ID used in the Content API & `<SliceZone>` map. |
| `type`         | string   | Always `"SharedSlice"` for slices.                           |
| `name`         | string   | PascalCase display name.                                     |
| `description`  | string   | Free text.                                                   |
| `variations`   | array    | One+ variation objects (see §9). The first is usually `default`. |

### Each variation object

| Key           | Type   | Notes                                                              |
| ------------- | ------ | ------------------------------------------------------------------ |
| `id`          | string | camelCase variation ID (`default`, `withButton`, `imageRight`).    |
| `name`        | string | Human label shown in the Page Builder.                             |
| `version`     | string | `"initial"` for a new variation.                                   |
| `description` | string | Free text.                                                         |
| `imageUrl`    | string | URL of the uploaded screenshot (filled after pushing).             |
| `primary`     | object | Map of field API ID → field definition. Non-repeatable fields.    |
| `items`       | object | **Deprecated.** Use a repeatable group inside `primary` instead. Historically held the repeatable "items" table of a slice. Keep as `{}`. |

### Field definition shape

Every field under `primary` is:

```json
"<field_api_id>": {
  "type": "<FieldType>",
  "config": {
    "label": "Editor label",
    // ...type-specific options
  }
}
```

### Field types available in `model.json`

| Field              | `type` value        | Key config options                                                                 | API response shape                                   |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Text (a.k.a. Key Text) | `"Text"`            | `label`, `placeholder`, `useAsTitle`                                              | `"Lorem ipsum"` (string \| null)                     |
| Rich Text          | `"StructuredText"`  | `label`, `multi` (allowed blocks), `single` (single block), `allowTargetBlank`, `labels` | `[{ type, text, spans }]` array                      |
| Image              | `"Image"`           | `label`, `constraint` (`{ width, height }`), `thumbnails` (responsive sizes array) | `{ url, alt, dimensions, id, ...<thumbs> }`          |
| Link               | `"Link"`            | `label`, `allowTargetBlank`, `allowText`, `repeat`, `variants`                     | `{ link_type, url, target?, text?, variant? }`       |
| Link to Media      | `"Link"` + `config.allowMedia: true` | same as Link, restricted to media                          | `{ link_type: "Media", url, name, ... }`             |
| Content Relationship | `"Link"` + `config.customtypes: ["post"]` | `label`, `customtypes`, `repeat`                                       | `{ link_type: "Document", id, type, tags, ... }`     |
| Number             | `"Number"`          | `label`                                                                            | `42` (number \| null)                                |
| Boolean            | `"Boolean"`         | `label`, `default_value`                                                           | `true` / `false`                                     |
| Color              | `"Color"`           | `label`                                                                            | `"#ff0000"`                                          |
| Date               | `"Date"`            | `label`                                                                            | `"2026-08-08"`                                       |
| Timestamp          | `"Timestamp"`       | `label`                                                                            | `"2026-08-08T12:00:00+0000"`                         |
| Select             | `"Select"`          | `label`, `options: ["A","B"]`                                                      | `"A"`                                                |
| Embed              | `"Embed"`           | `label`                                                                            | `{ url, type, ... }`                                 |
| Geopoint           | `"GeoPoint"`        | `label`                                                                            | `{ longitude, latitude }`                            |
| Table              | `"Table"`           | `label`                                                                            | `{ type, content }`                                  |
| Integration        | `"IntegrationFields"` | `label`, `catalog`                                                              | object from integration catalog                      |
| Repeatable Group   | `"Group"`           | `label`, `repeat` (default `true`)                                                | `[{ field: value, ... }, ...]` array                 |
| UID                | `"UID"`             | (only on page/custom types)                                                        | string                                               |

> Note on naming: the editor-facing field is now called **"Text"**, but the
> `@prismicio/client` helper is still `isFilled.keyText()` — "Key Text" is the
> legacy name. The `model.json` `type` is `"Text"`. Rich Text uses
> `"StructuredText"` in `model.json` (the legacy type name) even though it's
> called "Rich Text" in the UI.

### Rich Text `multi` / `single` allowed block types

`heading1`–`heading6`, `paragraph`, `strong`, `em`, `preformatted`, `hyperlink`,
`image`, `embed`, `list-item`, `o-list-item`, `rtl`. Use `single` to restrict to
one block; use `multi` for many.

### Image with responsive thumbnails

```json
"image": {
  "type": "Image",
  "config": {
    "label": "Image",
    "constraint": { "width": 1200, "height": 800 },
    "thumbnails": [
      { "name": "Mobile", "width": 400, "height": 300 }
    ]
  }
}
```

### Repeatable group

```json
"features": {
  "type": "Group",
  "config": {
    "label": "Features",
    "repeat": true,
    "fields": {
      "title": { "type": "Text", "config": { "label": "Title" } },
      "icon": { "type": "Image", "config": { "label": "Icon" } }
    }
  }
}
```

> A group **cannot contain another group** (only one level of nesting).

### Complete realistic slice `model.json`

```json
{
  "id": "text_with_image",
  "type": "SharedSlice",
  "name": "TextWithImage",
  "description": "A text block with an optional image and CTA.",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "version": "initial",
      "description": "Image on the right.",
      "imageUrl": "",
      "primary": {
        "eyebrow": {
          "type": "Text",
          "config": { "label": "Eyebrow", "placeholder": "Section label" }
        },
        "heading": {
          "type": "StructuredText",
          "config": {
            "label": "Heading",
            "single": "heading2",
            "allowTargetBlank": false
          }
        },
        "body": {
          "type": "StructuredText",
          "config": {
            "label": "Body",
            "multi": "paragraph,strong,em,hyperlink,list-item,o-list-item"
          }
        },
        "image": {
          "type": "Image",
          "config": {
            "label": "Image",
            "constraint": { "width": 1200, "height": 800 },
            "thumbnails": [
              { "name": "Mobile", "width": 600, "height": 400 }
            ]
          }
        },
        "cta": {
          "type": "Link",
          "config": {
            "label": "Call to Action",
            "allowText": true,
            "allowTargetBlank": true,
            "repeat": false,
            "variants": ["Primary", "Secondary"]
          }
        },
        "features": {
          "type": "Group",
          "config": {
            "label": "Feature list",
            "repeat": true,
            "fields": {
              "label": { "type": "Text", "config": { "label": "Label" } },
              "icon": { "type": "Image", "config": { "label": "Icon" } }
            }
          }
        }
      },
      "items": {}
    },
    {
      "id": "imageLeft",
      "name": "Image on Left",
      "version": "initial",
      "description": "Same content, image on the left.",
      "imageUrl": "",
      "primary": {
        "eyebrow": { "type": "Text", "config": { "label": "Eyebrow" } },
        "heading": { "type": "StructuredText", "config": { "label": "Heading", "single": "heading2" } },
        "body": { "type": "StructuredText", "config": { "label": "Body", "multi": "paragraph,strong,em,hyperlink" } },
        "image": { "type": "Image", "config": { "label": "Image" } },
        "cta": { "type": "Link", "config": { "label": "Call to Action", "allowText": true } }
      },
      "items": {}
    }
  ]
}
```

---

## 3. Creating slices programmatically (without the UI)

**Yes — you can create the directory + `model.json` + `index.js` by hand.** That
is exactly what the CLI/UI does under the hood. The slice is fully defined by
its files; Slice Machine just reads them.

### Recommended flow

```sh
# 1. Authenticate (one time)
npx prismic login

# 2. Create the slice via the CLI (writes model.json + index.js + updates index)
npx prismic slice create "Call to Action"
# -> creates src/slices/CallToAction/{model.json,index.js}

# 3. Add fields via the CLI (updates model.json + regenerates types)
npx prismic field add rich-text text --to-slice CallToAction \
  --allow "heading2,paragraph,strong,em,hyperlink"
npx prismic field add link button --to-slice CallToAction --allow-text --variant Primary
npx prismic field add image hero --to-slice CallToAction
npx prismic field add group features --to-slice CallToAction
npx prismic field add text features.label --to-slice CallToAction
npx prismic field add image features.icon --to-slice CallToAction

# 4. Connect it to a page type so editors can use it
npx prismic type create "Page" --format page
npx prismic slice connect call_to_action --to page

# 5. Push local models to Prismic
npx prismic push

# 6. (Or pull remote models down to local)
npx prismic pull
```

### Fully manual (hand-write files)

If you prefer to skip the CLI commands entirely:

1. Create `src/slices/<PascalName>/model.json` using the shapes in §2.
2. Create `src/slices/<PascalName>/index.js` (see §4–§6).
3. Add an export to `src/slices/index.js` mapping the slice's API ID → component.
4. Run `npx prismic push` to upload the model to Prismic.

> The CLI/UI exist to validate the JSON and regenerate the library index +
> TypeScript types. If you hand-write, run `npx start-slicemachine` afterwards so
> it can validate and re-generate the `index.js`/types for you. (Even in a JS
> project, type files are generated to `prismic-types.d.ts`; you can ignore
> them or delete them — they won't break a JS build.)

### `mocks.json` (optional, for the simulator & tests)

```json
{
  "default": {
    "primary": {
      "eyebrow": "Features",
      "heading": [{ "type": "heading2", "text": "Build faster", "spans": [] }],
      "body": [{ "type": "paragraph", "text": "Ship it.", "spans": [] }],
      "image": { "url": "https://images.prismic.io/...", "alt": "demo", "dimensions": { "width": 1200, "height": 800 } },
      "cta": { "link_type": "Web", "url": "https://prismic.io", "text": "Learn more", "variant": "Primary" },
      "features": [{ "label": "Fast", "icon": null }]
    },
    "items": {}
  }
}
```

---

## 4. The slice component & `SliceComponentProps`

`<SliceZone>` from `@prismicio/react` renders your component and passes a single
`props` object whose shape is **`SliceComponentProps`**:

| Prop     | Type     | Description                                                       |
| -------- | -------- | ----------------------------------------------------------------- |
| `slice`  | `Slice`  | The slice object (see API response below). Always present.        |
| `slices` | `Slice[]`| All slices in the zone.                                           |
| `index`  | `number` | This slice's position in the zone (0-based).                      |
| `context`| `unknown`| Whatever you passed to `<SliceZone context={...}>`.               |

### The `slice` object (Content API)

```json
{
  "id": "call_to_action$e568fae3-...",
  "slice_type": "call_to_action",
  "variation": "default",
  "version": "initial",
  "primary": {
    "text": [ /* rich text nodes */ ],
    "button_link": { "link_type": "Web", "url": "https://prismic.io", "text": "Go" }
  },
  "items": []
}
```

So in your component: `slice.slice_type`, `slice.variation`,
`slice.primary.<fieldId>`, `slice.index` (from props, not the slice).

### JavaScript component skeleton

```jsx
// src/slices/CallToAction/index.js
import { SliceComponentProps } from "@prismicio/react"; // (type-only import; omit in JS)
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export default function CallToAction({ slice, index, slices, context }) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="cta"
    >
      <PrismicRichText field={slice.primary.text} />
      <PrismicNextLink field={slice.primary.button_link} className="btn" />
    </section>
  );
}
```

> In JS you don't import types. The signature is simply
> `function MySlice({ slice, index, slices, context })`. The
> `SliceComponentProps` import above is only meaningful in TS; drop it for pure JS.

### Async slice components (fetching more data)

A slice component can be `async` and create its own client — useful for fetching
shared content (e.g. site settings):

```jsx
// src/slices/ContactForm/index.js
import { createClient } from "@/prismicio";

export default async function ContactForm({ slice }) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return <form action={settings.data.form_endpoint}>...</form>;
}
```

---

## 5. Rendering Prismic fields in React

### Text (Key Text) — plain string

```jsx
<p>{slice.primary.eyebrow}</p>
```

With a fallback:

```jsx
<p>{slice.primary.eyebrow || "Default eyebrow"}</p>
```

Check filled (uses the legacy `keyText` name):

```jsx
import { isFilled } from "@prismicio/client";

{isFilled.keyText(slice.primary.eyebrow) && <p>{slice.primary.eyebrow}</p>}
```

### Rich Text

```jsx
import { PrismicRichText, PrismicText } from "@prismicio/react";

// Rendered as HTML with formatting
<PrismicRichText field={slice.primary.body} />

// Plain text (no formatting), blocks joined by a separator
<PrismicText field={slice.primary.body} fallback="No content" />
```

With custom components per block type:

```jsx
<PrismicRichText
  field={slice.primary.body}
  components={{
    heading2: ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>,
    paragraph: ({ children }) => <p className="my-4">{children}</p>,
    hyperlink: ({ children, node }) => (
      <a href={node.data.url} className="link">{children}</a>
    ),
  }}
/>
```

Server-side conversion helpers (no component needed):

```jsx
import { asHTML, asText } from "@prismicio/client";

const html = asHTML(slice.primary.body);
const text = asText(slice.primary.body);
```

Check filled:

```jsx
isFilled.richText(slice.primary.body)
```

### Image

Use `PrismicNextImage` (wraps `next/image`):

```jsx
import { PrismicNextImage } from "@prismicio/next";

<PrismicNextImage field={slice.primary.image} alt="" className="rounded" />
```

With imgix transforms and a responsive `sizes`:

```jsx
<PrismicNextImage
  field={slice.primary.image}
  imgixParams={{ sat: -100, w: 1200 }}
  sizes="(max-width: 768px) 100vw, 50vw"
  fallback={<div className="placeholder" />}
/>
```

- `alt=""` marks the image decorative; `fallbackAlt` only applies if the field
  has no alt text.
- Thumbnails configured in the model appear as `slice.primary.image.Mobile`,
  `slice.primary.image.Tablet`, etc.
- Disable Prismic's auto-compression with `imgixParams={{ auto: null }}`.

Check filled:

```jsx
isFilled.image(slice.primary.image)
```

### Link / Link to Media

`PrismicNextLink` wraps `next/link` and understands all link types (Web, Media,
Document):

```jsx
import { PrismicNextLink } from "@prismicio/next";

<PrismicNextLink field={slice.primary.cta} className="btn">
  {/* children are optional; if the field has `text`, it renders automatically */}
</PrismicNextLink>
```

- For an internal Content Relationship link, provide a `linkResolver` or rely on
  the route resolver configured in `prismic.config.json`.
- Access link metadata directly: `slice.primary.cta.link_type`,
  `.url`, `.target`, `.text`, `.variant`.

Styling by variant:

```jsx
import clsx from "clsx";

<PrismicNextLink
  field={slice.primary.cta}
  className={clsx("btn", {
    "btn--primary": slice.primary.cta?.variant === "Primary",
    "btn--secondary": slice.primary.cta?.variant === "Secondary",
  })}
/>
```

Repeatable link field (array):

```jsx
<ul>
  {slice.primary.buttons.map((link, i) => (
    <li key={i}>
      <PrismicNextLink field={link} />
    </li>
  ))}
</ul>
```

Check filled:

```jsx
isFilled.link(slice.primary.cta)
isFilled.repeatable(slice.primary.buttons) // for repeatable links
```

### Repeatable Group

```jsx
<ul>
  {slice.primary.features.map((item, i) => (
    <li key={i}>
      <PrismicNextImage field={item.icon} alt="" />
      <span>{item.label}</span>
    </li>
  ))}
</ul>
```

Check filled:

```jsx
isFilled.group(slice.primary.features)
```

A **non-repeatable** group is still returned as a single-element array; access
fields with `[0]`:

```jsx
const g = slice.primary.meta_group[0];
```

### `isFilled` cheat sheet (`@prismicio/client`)

```js
isFilled.keyText(value)      // Text
isFilled.richText(value)     // Rich Text
isFilled.image(value)        // Image
isFilled.link(value)         // Link / Content Relationship
isFilled.repeatable(value)   // repeatable Link
isFilled.group(value)        // Group
isFilled.number(value)
isFilled.boolean(value)
isFilled.color(value)
isFilled.date(value)
isFilled.timestamp(value)
isFilled.select(value)
isFilled.contentRelationship(value)
isFilled.embed(value)
isFilled.geopoint(value)
isFilled.integrationFields(value)
isFilled.table(value)
```

---

## 6. `<PrismicLink>` & `<PrismicNextImage>` reference

### `@prismicio/next` v2 — the Next.js-specific components

| Component         | Wraps       | Key props                                                                                  |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------ |
| `PrismicNextImage`| `next/image`| `field`, `imgixParams`, `alt`, `fallbackAlt`, `fallback`, `loader`, plus all `next/image` props except `src` |
| `PrismicNextLink` | `next/link` | `field` \| `document` \| `href`, `rel`, `linkResolver`, plus all `next/link` props          |
| `PrismicPreview`  | —           | `repositoryName`, `updatePreviewURL` (default `/api/preview`), `exitPreviewURL` (default `/api/exit-preview`) |
| `SliceSimulator`  | —           | `children`, `zIndex`, `background`, `className`                                            |

Helpers: `enableAutoPreviews({ client })`, `redirectToPreviewURL({ client, request })`,
`exitPreview()`, `setPreviewData({ req, res })` (Pages Router only).

### `@prismicio/react` v3 — framework-agnostic React components

| Component        | Purpose                                            | Key props                                                                                          |
| ---------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `PrismicRichText`| Rich text as HTML                                  | `field`, `fallback`, `components` (map of block types → components), `linkResolver`, `internalLinkComponent` |
| `PrismicText`    | Rich text as plain text                            | `field`, `fallback`, `separator` (default `" "`)                                                  |
| `PrismicImage`   | Image (no `next/image`)                            | `field`, `imgixParams`, `alt`, `fallbackAlt`, `widths`, `pixelDensities`, `fallback`              |
| `PrismicLink`    | Link (no `next/link`)                              | `field` \| `document` \| `href`, `rel`, `linkResolver`, `internalComponent`, `externalComponent`  |
| `PrismicTable`   | Table field                                        | `field`, `fallback`, `components`                                                                  |
| `SliceZone`      | Renders a slice zone                               | `slices`, `components`, `defaultComponent`, `context`                                              |
| `PrismicToolbar` | Injects the Prismic toolbar                        | `repositoryName`                                                                                   |

> **For Next.js, prefer the `@prismicio/next` variants** (`PrismicNextImage`,
> `PrismicNextLink`) — they automatically use `next/image` and `next/link`
> (better optimization & routing). Use `@prismicio/react`'s `PrismicImage`/
> `PrismicLink` only outside Next.js or when you need the `widths`/`pixelDensities`
> srcset helpers.

### When to use which import

```jsx
// Next.js app — use these:
import { SliceZone, PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink, PrismicPreview } from "@prismicio/next";
```

---

## 7. Creating a Custom Type (page type) with a slice zone

A page type / custom type is stored in `customtypes/<id>/index.json`. It has:

```json
{
  "id": "page",
  "label": "Page",
  "repeatable": true,
  "status": true,
  "format": "page",
  "json": {
    "Main": {
      "uid": {
        "type": "UID",
        "config": { "label": "UID" }
      },
      "title": {
        "type": "Text",
        "config": { "label": "Title", "useAsTitle": true }
      },
      "slices": {
        "type": "Slices",
        "fieldset": "Slice Zone",
        "config": {
          "labels": {},
          "choices": {
            "call_to_action": { "type": "SharedSlice" },
            "hero": { "type": "SharedSlice" },
            "text_with_image": { "type": "SharedSlice" }
          }
        }
      }
    },
    "SEO & Metadata": {
      "meta_title": { "type": "Text", "config": { "label": "Meta Title" } },
      "meta_description": { "type": "Text", "config": { "label": "Meta Description" } },
      "meta_image": { "type": "Image", "config": { "label": "Meta Image" } }
    }
  }
}
```

### Key parts

- `id`: snake_case API ID (`page`). Used by `client.getByUID("page", uid)`.
- `repeatable`: `true` for many docs (Page, Blog Post), `false` for singletons
  (Homepage, Settings). Use `client.getSingle("homepage")` for singletons.
- `format`: `"page"` for page types (generates a route + page file), omit for
  plain custom types.
- `json`: an object keyed by **tab name** (`"Main"`, `"SEO & Metadata"`). Each
  tab maps field API IDs → field definitions (same shapes as slice fields).
- The **slice zone** is a field of `"type": "Slices"` with a `config.choices`
  map. Each choice is `{ "type": "SharedSlice" }` keyed by the slice's API ID.
- Page types auto-include a UID field and an "SEO & Metadata" tab.

### CLI approach (preferred)

```sh
# Create a repeatable page type (route: /:uid)
npx prismic type create "Page" --format page

# Create a singleton (homepage, route: /)
npx prismic type create "Homepage" --format page --single

# Create a plain custom type (no route)
npx prismic type create "Settings" --single

# Add a static field to the page type
npx prismic field add text title --to-type page

# Connect slices to the page type's slice zone
npx prismic slice connect call_to_action --to page
npx prismic slice connect hero --to page
```

### Routes (`prismic.config.json`)

```json
{
  "repositoryName": "example-prismic-repo",
  "routes": [
    { "type": "homepage", "path": "/" },
    { "type": "page", "path": "/:uid" },
    { "type": "blog_post", "path": "/blog/:uid" }
  ]
}
```

| Route resolver path          | Next.js file               |
| ---------------------------- | -------------------------- |
| `/`                          | `app/page.js`              |
| `/:uid`                      | `app/[uid]/page.js`        |
| `/blog/:uid`                 | `app/blog/[uid]/page.js`   |
| `/:grandparent/:parent/:uid` | `app/[...path]/page.js`    |

---

## 8. Pushing slices & custom types to Prismic

### Slice Machine UI

1. `npx start-slicemachine --open`
2. Edit slices/page types locally.
3. Click **Review changes** → **Push**.

### Prismic CLI (agent/terminal friendly)

```sh
npx prismic login            # one-time auth
npx prismic push             # local files -> Prismic (local is source of truth)
npx prismic pull             # Prismic -> local files (remote is source of truth)
```

- `push`: your local `model.json` / `customtypes/*/index.json` are the source of
  truth; Prismic's models are created/updated/deleted to match.
- `pull`: Prismic is the source of truth; local files are created/updated/deleted
  to match, TypeScript types are regenerated, and starter component files are
  bootstrapped for new slices/pages.
- Both also regenerate `prismic-types.d.ts` and the slice library `index.js`.

### Slice-specific CLI commands

```sh
npx prismic slice create "Call to Action"
npx prismic slice add-variation "With Button" --to CallToAction
npx prismic slice edit-variation default --screenshot ./shot.png --from-slice CallToAction
npx prismic slice connect call_to_action --to page
```

### Other useful CLI commands

```sh
npx prismic init                       # set up Prismic in a Next.js project
npx prismic gen setup                  # (re)create prismicio.js, simulator, preview routes
npx prismic token create               # create an API access token
npx prismic webhook create <url> --trigger documentsPublished
npx prismic preview add http://localhost:3000/api/preview --name Development
npx prismic repo set-api-access private
```

### What happens on push (model changes)

- **Adding a field**: appears with an empty default value.
- **Removing a field**: the field no longer appears (existing content stays in
  the DB but is unreachable).
- **Renaming a field's API ID**: existing content is *not* migrated — the field
  shows empty. Prefer changing the *label* and keeping the API ID.
- The Content API won't reflect model changes until at least one document is
  (re)published or archived.

> Push sends the **entire** model with no field-level diff, warnings, or
> rollback for add/delete. Only API-ID *renames* have a rollback path (for
  content relationship fixes). So push deliberately and re-publish a document
  afterward.

---

## 9. Slice variations

A **variation** is an alternative version of the same slice. Each variation has
its **own set of fields** and its own screenshot. The Page Builder lets editors
pick which variation to insert.

- All slices start with a `default` variation (ID `"default"`, name `"Default"`).
- Variations share the same `slice_type` but differ in `slice.variation`.
- Use variations for **presentation** differences (image-left vs image-right,
  with-button vs without). Use a **separate slice** for genuinely different
  content concepts.

### Adding a variation

CLI:

```sh
npx prismic slice add-variation "With Button" --to CallToAction
npx prismic slice edit-variation withButton --screenshot ./with-button.png --from-slice CallToAction
```

Or by hand in `model.json` — add another object to the `variations` array (see
the full example in §2, which has `default` + `imageLeft`).

### Branching on the variation in the component

```jsx
export default function TextWithImage({ slice }) {
  if (slice.variation === "imageLeft") {
    return (
      <section className="grid grid-cols-2">
        <PrismicNextImage field={slice.primary.image} alt="" />
        <div>
          <PrismicRichText field={slice.primary.heading} />
          <PrismicRichText field={slice.primary.body} />
        </div>
      </section>
    );
  }

  // default variation
  return (
    <section className="grid grid-cols-2">
      <div>
        <PrismicRichText field={slice.primary.heading} />
        <PrismicRichText field={slice.primary.body} />
      </div>
      <PrismicNextImage field={slice.primary.image} alt="" />
    </section>
  );
}
```

> Each variation's `primary` is independently typed/validated, so a field that
> exists in `default` may be absent in `imageLeft`. Guard with `?.` or
> `isFilled` accordingly.

---

## Putting it all together — a full Next.js page (JS, App Router)

```jsx
// app/[uid]/page.js
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({ params }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid);

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");
  return pages.map((page) => ({ uid: page.uid }));
}

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid);
  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
```

```jsx
// app/layout.js
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
```

```js
// prismicio.js (generated by `prismic init` / `prismic gen setup`)
import { createClient as baseCreateClient } from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import prismicConfig from "./prismic.config.json";

export const repositoryName = prismicConfig.repositoryName;

export function createClient(config = {}) {
  const client = baseCreateClient(repositoryName, {
    routes: prismicConfig.routes,
    fetchOptions: { next: { tags: ["prismic"] }, cache: "force-cache" },
    ...config,
  });
  enableAutoPreviews({ client });
  return client;
}
```

---

## Quick reference: packages & versions (Aug 2026)

| Package                    | Latest | Purpose                                             |
| -------------------------- | ------ | --------------------------------------------------- |
| `@prismicio/client`        | v7     | Content API client, `isFilled`, `asText`, `asHTML`  |
| `@prismicio/react`         | v3     | `SliceZone`, `PrismicRichText`, `PrismicText`, `PrismicImage`, `PrismicLink` |
| `@prismicio/next`          | v2     | `PrismicNextImage`, `PrismicNextLink`, `PrismicPreview`, `SliceSimulator`, `enableAutoPreviews` |
| `@slicemachine/adapter-next` | latest | Next.js adapter for Slice Machine                   |
| `start-slicemachine`       | latest | Run the Slice Machine UI (`npx start-slicemachine --open`) |

> New projects should consider the **Type Builder** (cloud) + **Prismic CLI**
> (`npx prismic ...`) instead of Slice Machine — the CLI is the AI/terminal path
> and is the cleanest way to create slices without a UI. Slice Machine still
> works and is what most existing repos use.

---

## TL;DR for "create a slice without the UI"

1. `npx prismic login`
2. `npx prismic slice create "My Slice"` → writes `src/slices/MySlice/{model.json,index.js}`
3. `npx prismic field add <type> <id> --to-slice MySlice` (repeat) → edits `model.json`
4. Edit `src/slices/MySlice/index.js` to render `slice.primary.<id>` with
   `PrismicRichText` / `PrismicNextImage` / `PrismicNextLink`.
5. `npx prismic type create "Page" --format page`
6. `npx prismic slice connect my_slice --to page`
7. `npx prismic push`
8. (Re)publish a document in the Page Builder for the API to reflect changes.

Or hand-write `model.json` + `index.js` yourself (§2, §4–§6) and run
`npx prismic push`.
