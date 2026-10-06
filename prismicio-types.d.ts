import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type HomepageDocumentDataSlicesSlice = HeaderSlice | HeroSlice | AboutSlice | ServicesSlice | ParallaxFactsSlice | ContactCtaSlice | BenefitsSlice | TestimonialsSlice | HowWeWorkSlice | ContactSlice | FooterSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Homepage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

/**
 * Content for Legal Page documents
 */
interface LegalDocumentData {
	/**
	 * Title field in *Legal Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Body field in *Legal Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Legal Page document from Prismic
 *
 * - **API ID**: `legal`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LegalDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<LegalDocumentData>, "legal", Lang>;

type PageDocumentDataSlicesSlice = PageHeaderSlice | HeaderSlice | FooterSlice | HeroSlice | AboutSlice | ServicesSlice | ParallaxFactsSlice | ContactCtaSlice | BenefitsSlice | TestimonialsSlice | HowWeWorkSlice | ContactSlice | ServiceListSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

type SettingsDocumentDataSlicesSlice = HeaderSlice | FooterSlice

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Header & Footer field in *Settings*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<SettingsDocumentDataSlicesSlice>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

export type AllDocumentTypes = HomepageDocument | LegalDocument | PageDocument | SettingsDocument;

/**
 * Primary content in *About → Default → Primary*
 */
export interface AboutSliceDefaultPrimary {
	/**
	 * Section ID (for scroll spy) field in *About → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: about
	 * - **API ID Path**: about.default.primary.section_id
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	section_id: prismic.KeyTextField;
	
	/**
	 * Caption field in *About → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Our Story
	 * - **API ID Path**: about.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * Title field in *About → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Link Text field in *About → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Learn more about us
	 * - **API ID Path**: about.default.primary.link_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	link_text: prismic.KeyTextField;
	
	/**
	 * Link field in *About → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.default.primary.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Image field in *About → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Mission Title field in *About → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Our Mission
	 * - **API ID Path**: about.default.primary.mission_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	mission_title: prismic.KeyTextField;
	
	/**
	 * Mission Text field in *About → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.default.primary.mission_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	mission_text: prismic.RichTextField;
	
	/**
	 * Vision Title field in *About → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Our Vision
	 * - **API ID Path**: about.default.primary.vision_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	vision_title: prismic.KeyTextField;
	
	/**
	 * Vision Text field in *About → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.default.primary.vision_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	vision_text: prismic.RichTextField;
}

/**
 * Default variation for About Slice
 *
 * - **API ID**: `default`
 * - **Description**: About section with image left and mission/vision right
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type AboutSliceDefault = prismic.SharedSliceVariation<"default", Simplify<AboutSliceDefaultPrimary>, never>;

/**
 * Slice variation for *About*
 */
type AboutSliceVariation = AboutSliceDefault

/**
 * About Shared Slice
 *
 * - **API ID**: `about`
 * - **Description**: About section with caption, title, link, image, and mission/vision text
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type AboutSlice = prismic.SharedSlice<"about", AboutSliceVariation>;

/**
 * Item in *Benefits → Default → Primary → Features*
 */
export interface BenefitsSliceDefaultPrimaryFeaturesItem {
	/**
	 * Title field in *Benefits → Default → Primary → Features*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Unique Design
	 * - **API ID Path**: benefits.default.primary.features[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Benefits → Default → Primary → Features*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: benefits.default.primary.features[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Icon field in *Benefits → Default → Primary → Features*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: benefits.default.primary.features[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"check" | "star" | "heart" | "bolt" | "shield" | "rocket" | "code" | "palette" | "camera" | "chart">;
}

/**
 * Primary content in *Benefits → Default → Primary*
 */
export interface BenefitsSliceDefaultPrimary {
	/**
	 * Caption field in *Benefits → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Primary Benefits
	 * - **API ID Path**: benefits.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * Title field in *Benefits → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: benefits.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Features field in *Benefits → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: benefits.default.primary.features[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	features: prismic.GroupField<Simplify<BenefitsSliceDefaultPrimaryFeaturesItem>>;
}

/**
 * Default variation for Benefits Slice
 *
 * - **API ID**: `default`
 * - **Description**: Benefits grid with icon features
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BenefitsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BenefitsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Benefits*
 */
type BenefitsSliceVariation = BenefitsSliceDefault

/**
 * Benefits Shared Slice
 *
 * - **API ID**: `benefits`
 * - **Description**: Benefits section with caption, title, and feature items with icons
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BenefitsSlice = prismic.SharedSlice<"benefits", BenefitsSliceVariation>;

/**
 * Item in *Contact → Default → Primary → Contact Info Items*
 */
export interface ContactSliceDefaultPrimaryContactItemsItem {
	/**
	 * Title field in *Contact → Default → Primary → Contact Info Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Say hello
	 * - **API ID Path**: contact.default.primary.contact_items[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Icon field in *Contact → Default → Primary → Contact Info Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.contact_items[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"email" | "phone" | "location" | "clock">;
	
	/**
	 * Contact Lines field in *Contact → Default → Primary → Contact Info Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.contact_items[].lines
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	lines: prismic.RichTextField;
}

/**
 * Primary content in *Contact → Default → Primary*
 */
export interface ContactSliceDefaultPrimary {
	/**
	 * Section ID (for scroll spy) field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: contact
	 * - **API ID Path**: contact.default.primary.section_id
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	section_id: prismic.KeyTextField;
	
	/**
	 * Caption field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Contact Us
	 * - **API ID Path**: contact.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * Title field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Contact Info Items field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.contact_items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	contact_items: prismic.GroupField<Simplify<ContactSliceDefaultPrimaryContactItemsItem>>;
	
	/**
	 * Form Name Label field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Name
	 * - **API ID Path**: contact.default.primary.form_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	form_title: prismic.KeyTextField;
	
	/**
	 * Form Email Label field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Email
	 * - **API ID Path**: contact.default.primary.form_email_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	form_email_label: prismic.KeyTextField;
	
	/**
	 * Form Message Label field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Message
	 * - **API ID Path**: contact.default.primary.form_message_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	form_message_label: prismic.KeyTextField;
	
	/**
	 * Form Button Text field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Send Message
	 * - **API ID Path**: contact.default.primary.form_button_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	form_button_text: prismic.KeyTextField;
	
	/**
	 * Form Success Message field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Thank you. Your message is on its way, and I'll come back to you personally.
	 * - **API ID Path**: contact.default.primary.form_success_message
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	form_success_message: prismic.KeyTextField;
	
	/**
	 * Form Tip Text field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.form_tip
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	form_tip: prismic.RichTextField;
	
	/**
	 * Google Maps Embed URL field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.map_embed_url
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	map_embed_url: prismic.KeyTextField;
	
	/**
	 * Contact Image field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: A warm photo or illustration, landscape (~4:3)
	 * - **API ID Path**: contact.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for Contact Slice
 *
 * - **API ID**: `default`
 * - **Description**: Contact form with info and map
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ContactSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Contact*
 */
type ContactSliceVariation = ContactSliceDefault

/**
 * Contact Shared Slice
 *
 * - **API ID**: `contact`
 * - **Description**: Contact section with contact info items, form, and map embed
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactSlice = prismic.SharedSlice<"contact", ContactSliceVariation>;

/**
 * Primary content in *ContactCta → Default → Primary*
 */
export interface ContactCtaSliceDefaultPrimary {
	/**
	 * Description field in *ContactCta → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_cta.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * CTA Button Text field in *ContactCta → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Contact us
	 * - **API ID Path**: contact_cta.default.primary.cta_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_text: prismic.KeyTextField;
	
	/**
	 * CTA Link field in *ContactCta → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_cta.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for ContactCta Slice
 *
 * - **API ID**: `default`
 * - **Description**: Centered text with CTA button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactCtaSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ContactCtaSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ContactCta*
 */
type ContactCtaSliceVariation = ContactCtaSliceDefault

/**
 * ContactCta Shared Slice
 *
 * - **API ID**: `contact_cta`
 * - **Description**: Simple CTA section with description text and a contact button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactCtaSlice = prismic.SharedSlice<"contact_cta", ContactCtaSliceVariation>;

/**
 * Item in *Footer → Default → Primary → Company Links*
 */
export interface FooterSliceDefaultPrimaryCompanyLinksItem {
	/**
	 * Link Text field in *Footer → Default → Primary → Company Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.company_links[].link_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	link_text: prismic.KeyTextField;
	
	/**
	 * Link field in *Footer → Default → Primary → Company Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.company_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Footer → Default → Primary → Social Links*
 */
export interface FooterSliceDefaultPrimarySocialLinksItem {
	/**
	 * Name field in *Footer → Default → Primary → Social Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Facebook
	 * - **API ID Path**: footer.default.primary.social_links[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Icon CSS Class field in *Footer → Default → Primary → Social Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: fa-facebook
	 * - **API ID Path**: footer.default.primary.social_links[].icon_class
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	icon_class: prismic.KeyTextField;
	
	/**
	 * URL field in *Footer → Default → Primary → Social Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.social_links[].url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Footer → Default → Primary → Legal Links*
 */
export interface FooterSliceDefaultPrimaryLegalLinksItem {
	/**
	 * Link Text field in *Footer → Default → Primary → Legal Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.legal_links[].link_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	link_text: prismic.KeyTextField;
	
	/**
	 * Link field in *Footer → Default → Primary → Legal Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.legal_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *Footer → Default → Primary*
 */
export interface FooterSliceDefaultPrimary {
	/**
	 * Logo (Light Mode) field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.logo_light
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo_light: prismic.ImageField<never>;
	
	/**
	 * Logo (Dark Mode) field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.logo_dark
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo_dark: prismic.ImageField<never>;
	
	/**
	 * About Text field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.about_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	about_text: prismic.RichTextField;
	
	/**
	 * Phone field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: +1 837 652 8800
	 * - **API ID Path**: footer.default.primary.phone
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	phone: prismic.KeyTextField;
	
	/**
	 * Email field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: hello@example.com
	 * - **API ID Path**: footer.default.primary.email
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	email: prismic.KeyTextField;
	
	/**
	 * Company Column Title field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Company
	 * - **API ID Path**: footer.default.primary.company_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	company_title: prismic.KeyTextField;
	
	/**
	 * Company Links field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.company_links[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	company_links: prismic.GroupField<Simplify<FooterSliceDefaultPrimaryCompanyLinksItem>>;
	
	/**
	 * Social Column Title field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Social Media
	 * - **API ID Path**: footer.default.primary.social_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	social_title: prismic.KeyTextField;
	
	/**
	 * Social Links field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.social_links[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	social_links: prismic.GroupField<Simplify<FooterSliceDefaultPrimarySocialLinksItem>>;
	
	/**
	 * Legal Column Title field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Legal & Press
	 * - **API ID Path**: footer.default.primary.legal_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	legal_title: prismic.KeyTextField;
	
	/**
	 * Legal Links field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.legal_links[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	legal_links: prismic.GroupField<Simplify<FooterSliceDefaultPrimaryLegalLinksItem>>;
	
	/**
	 * Copyright Text field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: © Company 2026
	 * - **API ID Path**: footer.default.primary.copyright_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	copyright_text: prismic.KeyTextField;
	
	/**
	 * Location Text field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Based in London, United Kingdom.
	 * - **API ID Path**: footer.default.primary.location_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	location_text: prismic.KeyTextField;
}

/**
 * Default variation for Footer Slice
 *
 * - **API ID**: `default`
 * - **Description**: Standard footer with logo, about, links, and socials
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FooterSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FooterSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Footer*
 */
type FooterSliceVariation = FooterSliceDefault

/**
 * Footer Shared Slice
 *
 * - **API ID**: `footer`
 * - **Description**: Site footer with logo, about text, contact info, link columns, and social links
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FooterSlice = prismic.SharedSlice<"footer", FooterSliceVariation>;

/**
 * Item in *Header → Default → Primary → Navigation Links*
 */
export interface HeaderSliceDefaultPrimaryNavLinksItem {
	/**
	 * Link Text field in *Header → Default → Primary → Navigation Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: About
	 * - **API ID Path**: header.default.primary.nav_links[].link_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	link_text: prismic.KeyTextField;
	
	/**
	 * Link field in *Header → Default → Primary → Navigation Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: header.default.primary.nav_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *Header → Default → Primary*
 */
export interface HeaderSliceDefaultPrimary {
	/**
	 * Logo (Light Mode) field in *Header → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: header.default.primary.logo_light
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo_light: prismic.ImageField<never>;
	
	/**
	 * Logo (Dark Mode) field in *Header → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: header.default.primary.logo_dark
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo_dark: prismic.ImageField<never>;
	
	/**
	 * CTA Text field in *Header → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Let's work together
	 * - **API ID Path**: header.default.primary.cta_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_text: prismic.KeyTextField;
	
	/**
	 * CTA Link field in *Header → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: header.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Navigation Links field in *Header → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: header.default.primary.nav_links[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	nav_links: prismic.GroupField<Simplify<HeaderSliceDefaultPrimaryNavLinksItem>>;
	
	/**
	 * LinkedIn URL field in *Header → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: header.default.primary.linkedin_url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	linkedin_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for Header Slice
 *
 * - **API ID**: `default`
 * - **Description**: Standard header with logo, nav, and CTA
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeaderSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeaderSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Header*
 */
type HeaderSliceVariation = HeaderSliceDefault

/**
 * Header Shared Slice
 *
 * - **API ID**: `header`
 * - **Description**: Site header with logo, navigation links, and CTA button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeaderSlice = prismic.SharedSlice<"header", HeaderSliceVariation>;

/**
 * Item in *Hero → Default → Primary → Stack Images*
 */
export interface HeroSliceDefaultPrimaryStackImagesItem {
	/**
	 * Image field in *Hero → Default → Primary → Stack Images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.stack_images[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Caption field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Resonance Creative Studio
	 * - **API ID Path**: hero.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * Title field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Primary Button Text field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Discover now
	 * - **API ID Path**: hero.default.primary.primary_button_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	primary_button_text: prismic.KeyTextField;
	
	/**
	 * Primary Button Link field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.primary_button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	primary_button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, "Primary">;
	
	/**
	 * Video Link Text field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: How it works?
	 * - **API ID Path**: hero.default.primary.video_link_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	video_link_text: prismic.KeyTextField;
	
	/**
	 * YouTube Video ID field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: jTea_8Fk5Ns
	 * - **API ID Path**: hero.default.primary.video_id
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	video_id: prismic.KeyTextField;
	
	/**
	 * Scroll Down Text field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Scroll Down
	 * - **API ID Path**: hero.default.primary.scroll_down_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	scroll_down_text: prismic.KeyTextField;
	
	/**
	 * Stack Images field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.stack_images[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	stack_images: prismic.GroupField<Simplify<HeroSliceDefaultPrimaryStackImagesItem>>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Hero with text on left and stack images on right
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Homepage hero section with caption, animated title, description, CTAs, and stack images
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Item in *HowWeWork → Default → Primary → Section Images*
 */
export interface HowWeWorkSliceDefaultPrimaryImagesItem {
	/**
	 * Image field in *HowWeWork → Default → Primary → Section Images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_we_work.default.primary.images[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Display Width field in *HowWeWork → Default → Primary → Section Images*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_we_work.default.primary.images[].width
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	width: prismic.NumberField;
	
	/**
	 * Display Height field in *HowWeWork → Default → Primary → Section Images*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_we_work.default.primary.images[].height
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	height: prismic.NumberField;
}

/**
 * Item in *HowWeWork → Default → Primary → FAQ Items*
 */
export interface HowWeWorkSliceDefaultPrimaryFaqItemsItem {
	/**
	 * Question field in *HowWeWork → Default → Primary → FAQ Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 01. Discussion
	 * - **API ID Path**: how_we_work.default.primary.faq_items[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Answer field in *HowWeWork → Default → Primary → FAQ Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_we_work.default.primary.faq_items[].answer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	answer: prismic.RichTextField;
}

/**
 * Primary content in *HowWeWork → Default → Primary*
 */
export interface HowWeWorkSliceDefaultPrimary {
	/**
	 * Title field in *HowWeWork → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_we_work.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * CTA Button Text field in *HowWeWork → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Start a Project
	 * - **API ID Path**: how_we_work.default.primary.cta_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_text: prismic.KeyTextField;
	
	/**
	 * CTA Link field in *HowWeWork → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_we_work.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Section Images field in *HowWeWork → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_we_work.default.primary.images[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	images: prismic.GroupField<Simplify<HowWeWorkSliceDefaultPrimaryImagesItem>>;
	
	/**
	 * FAQ Items field in *HowWeWork → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: how_we_work.default.primary.faq_items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq_items: prismic.GroupField<Simplify<HowWeWorkSliceDefaultPrimaryFaqItemsItem>>;
}

/**
 * Default variation for HowWeWork Slice
 *
 * - **API ID**: `default`
 * - **Description**: Images left, FAQ and CTA right
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HowWeWorkSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HowWeWorkSliceDefaultPrimary>, never>;

/**
 * Slice variation for *HowWeWork*
 */
type HowWeWorkSliceVariation = HowWeWorkSliceDefault

/**
 * HowWeWork Shared Slice
 *
 * - **API ID**: `how_we_work`
 * - **Description**: How we work section with images, FAQ accordion, and CTA button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HowWeWorkSlice = prismic.SharedSlice<"how_we_work", HowWeWorkSliceVariation>;

/**
 * Primary content in *PageHeader → Default → Primary*
 */
export interface PageHeaderSliceDefaultPrimary {
	/**
	 * Caption field in *PageHeader → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: About Our Company
	 * - **API ID Path**: page_header.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * Title field in *PageHeader → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page_header.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *PageHeader → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page_header.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Background Image field in *PageHeader → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page_header.default.primary.background_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	background_image: prismic.ImageField<never>;
}

/**
 * Default variation for PageHeader Slice
 *
 * - **API ID**: `default`
 * - **Description**: Parallax hero with background image and centered text
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PageHeaderSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PageHeaderSliceDefaultPrimary>, never>;

/**
 * Slice variation for *PageHeader*
 */
type PageHeaderSliceVariation = PageHeaderSliceDefault

/**
 * PageHeader Shared Slice
 *
 * - **API ID**: `page_header`
 * - **Description**: Page header hero section with parallax background, caption, title, and description
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PageHeaderSlice = prismic.SharedSlice<"page_header", PageHeaderSliceVariation>;

/**
 * Item in *ParallaxFacts → Default → Primary → Facts / Stats*
 */
export interface ParallaxFactsSliceDefaultPrimaryFactsItem {
	/**
	 * Stat Value field in *ParallaxFacts → Default → Primary → Facts / Stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 28%
	 * - **API ID Path**: parallax_facts.default.primary.facts[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *ParallaxFacts → Default → Primary → Facts / Stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: parallax_facts.default.primary.facts[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
}

/**
 * Primary content in *ParallaxFacts → Default → Primary*
 */
export interface ParallaxFactsSliceDefaultPrimary {
	/**
	 * Title field in *ParallaxFacts → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: parallax_facts.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *ParallaxFacts → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: parallax_facts.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * CTA Button Text field in *ParallaxFacts → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Request Price
	 * - **API ID Path**: parallax_facts.default.primary.cta_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_text: prismic.KeyTextField;
	
	/**
	 * CTA Link field in *ParallaxFacts → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: parallax_facts.default.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Background Image field in *ParallaxFacts → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: parallax_facts.default.primary.background_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	background_image: prismic.ImageField<never>;
	
	/**
	 * Facts / Stats field in *ParallaxFacts → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: parallax_facts.default.primary.facts[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	facts: prismic.GroupField<Simplify<ParallaxFactsSliceDefaultPrimaryFactsItem>>;
}

/**
 * Default variation for ParallaxFacts Slice
 *
 * - **API ID**: `default`
 * - **Description**: Parallax section with stats and CTA
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ParallaxFactsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ParallaxFactsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ParallaxFacts*
 */
type ParallaxFactsSliceVariation = ParallaxFactsSliceDefault

/**
 * ParallaxFacts Shared Slice
 *
 * - **API ID**: `parallax_facts`
 * - **Description**: Dark parallax section with title, description, CTA button, and stat items
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ParallaxFactsSlice = prismic.SharedSlice<"parallax_facts", ParallaxFactsSliceVariation>;

/**
 * Item in *ServiceList → Default → Primary → Service Items*
 */
export interface ServiceListSliceDefaultPrimaryItemsItem {
	/**
	 * Label field in *ServiceList → Default → Primary → Service Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Bookkeeping
	 * - **API ID Path**: service_list.default.primary.items[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Description field in *ServiceList → Default → Primary → Service Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: service_list.default.primary.items[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Primary content in *ServiceList → Default → Primary*
 */
export interface ServiceListSliceDefaultPrimary {
	/**
	 * Caption field in *ServiceList → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Operations
	 * - **API ID Path**: service_list.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * Title field in *ServiceList → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: service_list.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Lead paragraph field in *ServiceList → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: service_list.default.primary.lead
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	lead: prismic.RichTextField;
	
	/**
	 * Service Items field in *ServiceList → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: service_list.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<ServiceListSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for ServiceList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ServiceListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ServiceListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ServiceList*
 */
type ServiceListSliceVariation = ServiceListSliceDefault

/**
 * ServiceList Shared Slice
 *
 * - **API ID**: `service_list`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ServiceListSlice = prismic.SharedSlice<"service_list", ServiceListSliceVariation>;

/**
 * Item in *Services → Default → Primary → Services*
 */
export interface ServicesSliceDefaultPrimaryServicesItem {
	/**
	 * Title field in *Services → Default → Primary → Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Brand Strategy
	 * - **API ID Path**: services.default.primary.services[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Number field in *Services → Default → Primary → Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 01
	 * - **API ID Path**: services.default.primary.services[].number
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	number: prismic.KeyTextField;
	
	/**
	 * Description field in *Services → Default → Primary → Services*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.services[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Image field in *Services → Default → Primary → Services*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.services[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Primary content in *Services → Default → Primary*
 */
export interface ServicesSliceDefaultPrimary {
	/**
	 * Section ID (for scroll spy) field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: services
	 * - **API ID Path**: services.default.primary.section_id
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	section_id: prismic.KeyTextField;
	
	/**
	 * Caption field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Our Services
	 * - **API ID Path**: services.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
	
	/**
	 * Title field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Services field in *Services → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.default.primary.services[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	services: prismic.GroupField<Simplify<ServicesSliceDefaultPrimaryServicesItem>>;
}

/**
 * Default variation for Services Slice
 *
 * - **API ID**: `default`
 * - **Description**: Tabbed services with images
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ServicesSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ServicesSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Services*
 */
type ServicesSliceVariation = ServicesSliceDefault

/**
 * Services Shared Slice
 *
 * - **API ID**: `services`
 * - **Description**: Services section with tabbed interface showing service items with images
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ServicesSlice = prismic.SharedSlice<"services", ServicesSliceVariation>;

/**
 * Item in *Testimonials → Default → Primary → Testimonials*
 */
export interface TestimonialsSliceDefaultPrimaryTestimonialsItem {
	/**
	 * Quote field in *Testimonials → Default → Primary → Testimonials*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.testimonials[].quote
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	quote: prismic.RichTextField;
	
	/**
	 * Author Name field in *Testimonials → Default → Primary → Testimonials*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Adam Peterson
	 * - **API ID Path**: testimonials.default.primary.testimonials[].author
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	author: prismic.KeyTextField;
	
	/**
	 * Author Role field in *Testimonials → Default → Primary → Testimonials*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Business Owner
	 * - **API ID Path**: testimonials.default.primary.testimonials[].role
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	role: prismic.KeyTextField;
	
	/**
	 * Author Photo field in *Testimonials → Default → Primary → Testimonials*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.testimonials[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Primary content in *Testimonials → Default → Primary*
 */
export interface TestimonialsSliceDefaultPrimary {
	/**
	 * Title field in *Testimonials → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Testimonials field in *Testimonials → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.testimonials[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	testimonials: prismic.GroupField<Simplify<TestimonialsSliceDefaultPrimaryTestimonialsItem>>;
}

/**
 * Default variation for Testimonials Slice
 *
 * - **API ID**: `default`
 * - **Description**: Testimonials carousel with Swiper
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TestimonialsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TestimonialsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Testimonials*
 */
type TestimonialsSliceVariation = TestimonialsSliceDefault

/**
 * Testimonials Shared Slice
 *
 * - **API ID**: `testimonials`
 * - **Description**: Testimonials slider section with heading and testimonial cards
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TestimonialsSlice = prismic.SharedSlice<"testimonials", TestimonialsSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			LegalDocument,
			LegalDocumentData,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			SettingsDocumentDataSlicesSlice,
			AllDocumentTypes,
			AboutSlice,
			AboutSliceDefaultPrimary,
			AboutSliceVariation,
			AboutSliceDefault,
			BenefitsSlice,
			BenefitsSliceDefaultPrimaryFeaturesItem,
			BenefitsSliceDefaultPrimary,
			BenefitsSliceVariation,
			BenefitsSliceDefault,
			ContactSlice,
			ContactSliceDefaultPrimaryContactItemsItem,
			ContactSliceDefaultPrimary,
			ContactSliceVariation,
			ContactSliceDefault,
			ContactCtaSlice,
			ContactCtaSliceDefaultPrimary,
			ContactCtaSliceVariation,
			ContactCtaSliceDefault,
			FooterSlice,
			FooterSliceDefaultPrimaryCompanyLinksItem,
			FooterSliceDefaultPrimarySocialLinksItem,
			FooterSliceDefaultPrimaryLegalLinksItem,
			FooterSliceDefaultPrimary,
			FooterSliceVariation,
			FooterSliceDefault,
			HeaderSlice,
			HeaderSliceDefaultPrimaryNavLinksItem,
			HeaderSliceDefaultPrimary,
			HeaderSliceVariation,
			HeaderSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimaryStackImagesItem,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			HowWeWorkSlice,
			HowWeWorkSliceDefaultPrimaryImagesItem,
			HowWeWorkSliceDefaultPrimaryFaqItemsItem,
			HowWeWorkSliceDefaultPrimary,
			HowWeWorkSliceVariation,
			HowWeWorkSliceDefault,
			PageHeaderSlice,
			PageHeaderSliceDefaultPrimary,
			PageHeaderSliceVariation,
			PageHeaderSliceDefault,
			ParallaxFactsSlice,
			ParallaxFactsSliceDefaultPrimaryFactsItem,
			ParallaxFactsSliceDefaultPrimary,
			ParallaxFactsSliceVariation,
			ParallaxFactsSliceDefault,
			ServiceListSlice,
			ServiceListSliceDefaultPrimaryItemsItem,
			ServiceListSliceDefaultPrimary,
			ServiceListSliceVariation,
			ServiceListSliceDefault,
			ServicesSlice,
			ServicesSliceDefaultPrimaryServicesItem,
			ServicesSliceDefaultPrimary,
			ServicesSliceVariation,
			ServicesSliceDefault,
			TestimonialsSlice,
			TestimonialsSliceDefaultPrimaryTestimonialsItem,
			TestimonialsSliceDefaultPrimary,
			TestimonialsSliceVariation,
			TestimonialsSliceDefault
		}
	}
}