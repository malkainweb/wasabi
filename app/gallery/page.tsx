import Footer from "@/app/Home/components/Footer";
import ImageCarousel from "./ImageCarousel";
import GeneralHeader from "../Components/GeneralHeader";

const Page = () => {
  return (
    <>
      <GeneralHeader />
      <ImageCarousel margin={true} />
      <Footer />
    </>
  );
};

export default Page;
