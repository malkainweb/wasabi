import { client } from "./client";
import {
  AboutBeliefData,
  FooterData,
  GalleryData,
  ImageSliderData,
  MenuGalleryData,
  TeamData,
  TheSpaceData,
} from "./types";

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

export async function getImageSliderData(): Promise<ImageSliderData | null> {
  try {
    const data = await client.fetch(`*[_type == "imageSlider"][0]{
        sectionTitle,
        slides,
        cheersIcon,
        description,
        buttonText,
        buttonLink
      }`);
    return data;
  } catch (error) {
    console.error("Error fetching image slider data:", error);
    return null;
  }
}

export async function getTeamData(): Promise<TeamData | null> {
  try {
    const data = await client.fetch(`*[_type == "team"][0]{
      sectionTitle,
      description
    }`);
    return data;
  } catch (error) {
    console.error("Error fetching team data:", error);
    return null;
  }
}

export async function getAboutBeliefData(): Promise<AboutBeliefData | null> {
  try {
    const data = await client.fetch(`*[_type == "aboutBelief"][0]{
      heroBackgroundImage,
      heroBackgroundImageMobile,
      logo,
      aboutUsLabel,
      philosophyLabel,
      philosophyText,
      dividerLine,
      chefLabel,
      chefDescription,
      stats,
      bottomImage
    }`);
    return data;
  } catch (error) {
    console.error("Error fetching about belief data:", error);
    return null;
  }
}

export async function getMenuGalleryData(): Promise<MenuGalleryData | null> {
  try {
    const data = await client.fetch(`*[_type == "menuGallery"][0]{
      mainMenuImages[]{
        asset,
        alt
      },
      innerMenuImages[]{
        asset,
        alt
      }
    }`);
    return data;
  } catch (error) {
    console.error("Error fetching menu gallery data:", error);
    return null;
  }
}

export async function getGalleryData(): Promise<GalleryData | null> {
  try {
    const data = await client.fetch(`*[_type == "gallery"][0]{
      images[]{
        asset,
        alt
      }
    }`);
    return data;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return null;
  }
}
