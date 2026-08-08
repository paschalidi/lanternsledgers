import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({ params }) {
  const { uid } = await params;
  const client = createClient();

  let page;
  try {
    page = await client.getByUID("page", uid);
  } catch {
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

  const contentSlices = page.data.slices.filter(
    (s) => s.slice_type !== "header" && s.slice_type !== "footer",
  );

  return <SliceZone slices={contentSlices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  try {
    const pages = await client.getAllByType("page");
    return pages.map((page) => ({ uid: page.uid }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { uid } = await params;
  const client = createClient();

  try {
    const page = await client.getByUID("page", uid);
    return {
      title: page.data.meta_title || page.data.title || "Lanterns & Ledgers",
      description: page.data.meta_description || "",
    };
  } catch {
    return { title: "Lanterns & Ledgers" };
  }
}
