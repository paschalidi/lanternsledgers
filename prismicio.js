import { createClient as baseCreateClient } from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "./slicemachine.config.json";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

export const createClient = (config = {}) => {
  const client = baseCreateClient(repositoryName, {
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  if (process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT) {
    enableAutoPreviews({ client });
  }

  return client;
};
