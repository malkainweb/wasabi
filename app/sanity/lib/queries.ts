import { client } from "./client";
import { FooterData, TheSpaceData } from "./types";

export async function getFooterData(): Promise<FooterData | null> {
  try {
    const data = await client.fetch(`*[_type == "footerSettings"][0]`);
    return data;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}

export async function getTheSpaceData(): Promise<TheSpaceData | null> {
  try {
    const data = await client.fetch(`*[_type == "theSpace"][0]{
      mainTitle,
      subtitle,
      backgroundImage,
      featuresTitle,
      features
    }`);
    return data;
  } catch (error) {
    console.error("Error fetching the space data:", error);
    return null;
  }
}
