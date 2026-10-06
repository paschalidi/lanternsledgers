import { SliceZone, PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

async function getPage(uid) {
  const client = createClient();
  for (const type of ["page", "legal"]) {
    try {
      return await client.getByUID(type, uid);
    } catch {
      // try next type
    }
  }
  return null;
}

export default async function Page({ params }) {
  const { uid } = await params;

  const page = await getPage(uid);
  if (!page) {
    return (
      <div
        className="container text-center"
        style={{ paddingTop: "200px", paddingBottom: "200px" }}
      >
        <h2>Page not found</h2>
        <p className="text-gray">
          This page does not exist or has not been published yet.
        </p>
      </div>
    );
  }

  if (page.type === "legal") {
    return (
      <>
        <section className="page-section bg-gray-light-1 bg-light-alpha-90">
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2 text-center">
                <h2 className="section-caption-border mb-xs-10">Legal</h2>
                <h1 className="hs-title-1 mb-0">{page.data.title}</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="legal-content">
                  <PrismicRichText field={page.data.body} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const contentSlices = page.data.slices.filter(
    (s) => s.slice_type !== "header" && s.slice_type !== "footer",
  );

  return <SliceZone slices={contentSlices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const params = [];
  for (const type of ["page", "legal"]) {
    try {
      const docs = await client.getAllByType(type);
      params.push(...docs.map((doc) => ({ uid: doc.uid })));
    } catch {
      // skip type
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const page = await getPage(uid);

  if (!page) {
    return { title: "Lanterns & Ledgers" };
  }

  return {
    title: page.data.meta_title || page.data.title || "Lanterns & Ledgers",
    description: page.data.meta_description || "",
  };
}
