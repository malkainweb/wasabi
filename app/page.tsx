import dynamic from "next/dynamic";
import Header from "./Home/components/Header";
import { getFooterData } from "./sanity/lib/queries";

// Lazy load all components except Header
const Menu = dynamic(() => import("./Home/components/Menu"), {
  loading: () => <div className="h-screen bg-[#FEFAF4]" />, // Optional loading placeholder
});

const HomeRecipes = dynamic(() => import("./Home/components/Recipes"), {
  loading: () => <div className="h-screen bg-[#FEFAF4]" />,
});

const OurStory = dynamic(() => import("./Home/components/OurStory"), {
  loading: () => <div className="h-screen bg-[#FEFAF4]" />,
});

const OurExperince = dynamic(() => import("./Home/components/OurExperince"), {
  loading: () => <div className="h-screen bg-[#FEFAF4]" />,
});

const Footer = dynamic(() => import("./Home/components/Footer"), {
  loading: () => <div className="h-64 bg-black" />,
});

export const revalidate = 60;
const Home = async () => {
  const [footerData] = await Promise.all([getFooterData()]);
  return (
    <>
      <Header />
      <div className="bg-black h-[2rem]"></div>
      <Menu />
      <HomeRecipes />
      <OurStory />
      <OurExperince />
      <Footer footerData={footerData} />
    </>
  );
};

export default Home;
