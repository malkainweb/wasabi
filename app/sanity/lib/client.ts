import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "snlvwwrf",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
