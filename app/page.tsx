import dynamic from "next/dynamic";
import Header from "./Home/components/Header";
import {
  getFooterData,
  getHomeHeaderData,
  getHomeMenuData,
  getHomeRecipesData,
  getOurExperienceData,
  getOurStoryData,
} from "./sanity/lib/queries";

const Menu = dynamic(() => import("./Home/components/Menu"), {
  loading: () => <div className="h-screen bg-[#FEFAF4]" />,
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
  const [
    footerData,
    ourStoryData,
    ourExperienceData,
    homeRecipesData,
    homeMenuData,
    homeHeaderData,
  ] = await Promise.all([
    getFooterData(),
    getOurStoryData(),
    getOurExperienceData(),
    getHomeRecipesData(),
    getHomeMenuData(),
    getHomeHeaderData(),
  ]);

  return (
    <>
      <Header homeHeaderData={homeHeaderData} />
      <div className="bg-black h-[2rem]"></div>
      <Menu homeMenuData={homeMenuData} />
      <HomeRecipes homeRecipesData={homeRecipesData} />
      <OurStory ourStoryData={ourStoryData} />
      <OurExperince ourExperienceData={ourExperienceData} />

      <Footer footerData={footerData} />
    </>
  );
};

export default Home;
