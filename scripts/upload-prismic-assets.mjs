#!/usr/bin/env node
/**
 * Upload images to Prismic and create documents via the Migration API.
 */
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const REPO = "lanternsledgers";
const TOKEN = "MC5hbmJvbVJJQUFDY0FLVzNL.77-9bBAk77-977-9B2Dvv73vv73vv70D77-977-977-9J3zvv73vv70P77-9Eu-_ve-_vQ9n77-9Q--_ve-_vTrvv70";
const ASSET_API = "https://asset-api.prismic.io";
const MIGRATION_API = "https://migration.prismic.io";
const PUBLIC_DIR = join(process.cwd(), "public");
const IMAGE_BASE = join(PUBLIC_DIR, "assets", "images");

const imagesToUpload = [
  "about-image.jpg",
  "services/service-1.jpg",
  "services/service-2.jpg",
  "services/service-3.jpg",
  "services/service-4.jpg",
  "services/service-5.jpg",
  "services/service-6.jpg",
  "promo-3.jpg",
  "promo-4.jpg",
  "promo-5.jpg",
  "ts1-user.jpg",
  "stack-image-1.jpg",
  "stack-image-2.jpg",
  "stack-image-3.jpg",
  "team/team-1.jpg",
  "team/team-2.jpg",
  "team/team-3.jpg",
  "team/team-4.jpg",
  "full-width-images/section-bg-1.jpg",
  "full-width-images/section-bg-2.jpg",
  "full-width-images/section-bg-10.jpg",
];

function getMimeType(filename) {
  if (filename.endsWith(".svg")) return "image/svg+xml";
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".gif")) return "image/gif";
  return "application/octet-stream";
}

async function uploadAsset(filepath, filename) {
  const fileBuffer = readFileSync(filepath);
  const mimeType = getMimeType(filename);
  const formData = new FormData();
  const blob = new Blob([fileBuffer], { type: mimeType });
  formData.append("file", blob, filename);

  const resp = await fetch(`${ASSET_API}/assets`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "X-Repo-Id": REPO,
    },
    body: formData,
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Asset upload failed for ${filename}: ${resp.status} ${text}`);
  }

  const data = await resp.json();
  return { url: data.url, id: data.id, filename };
}

async function main() {
  console.log("Uploading images to Prismic asset library...\n");

  const uploadedAssets = {};

  for (const imgPath of imagesToUpload) {
    const fullPath = join(IMAGE_BASE, imgPath);
    if (!existsSync(fullPath)) {
      console.log(`SKIP (not found): ${imgPath}`);
      continue;
    }
    try {
      const asset = await uploadAsset(fullPath, imgPath.split("/").pop());
      uploadedAssets[imgPath] = asset;
      console.log(`UPLOADED: ${imgPath} -> ${asset.url}`);
    } catch (err) {
      console.error(`ERROR: ${imgPath} - ${err.message}`);
    }
  }

  console.log("\n--- Upload complete ---");
  console.log(`Total uploaded: ${Object.keys(uploadedAssets).length}`);
  console.log("\nAsset URLs for document creation:");
  console.log(JSON.stringify(uploadedAssets, null, 2));

  // Save to file for next step
  const { writeFileSync } = await import("fs");
  writeFileSync("/tmp/prismic-assets.json", JSON.stringify(uploadedAssets, null, 2));
  console.log("\nSaved to /tmp/prismic-assets.json");
}

main().catch(console.error);
