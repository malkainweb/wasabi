import Footer from "@/app/Home/components/Footer";
import ImageCarousel from "./ImageCarousel";
import GeneralHeader from "../Components/GeneralHeader";
import { getFooterData, getGalleryData } from "../sanity/lib/queries";

export const revalidate = 60;

const Page = async () => {
  const [footerData, galleryData] = await Promise.all([
    getFooterData(),
    getGalleryData(),
  ]);

  return (
    <>
      <GeneralHeader />
      <ImageCarousel margin={true} galleryData={galleryData} />
      <Footer footerData={footerData} />
    </>
  );
};

export default Page;
