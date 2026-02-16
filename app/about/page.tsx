import Footer from "@/app/Home/components/Footer";
import { AboutAndBelief } from "./components/about-belief";
import { FeastInStyle } from "./components/feast-in-style";
import { ImagesSlider } from "./components/image-slider";
import { Timeline } from "./components/timeline";
import { AboutAndBeliefMobile } from "./components/about-belief-mobile-only";
import GeneralHeader from "../Components/GeneralHeader";
import Team from "./components/aboutTeam";
import { NewAboutBelief } from "./components/NewAboutBelief";
import {
  getAboutBeliefData,
  getFooterData,
  getImageSliderData,
  getTeamData,
  getTheSpaceData,
} from "../sanity/lib/queries";

export const revalidate = 60;
const Page = async () => {
  const [footerData, theSpaceData, imageSliderData, teamData, aboutBeliefData] =
    await Promise.all([
      getFooterData(),
      getTheSpaceData(),
      getImageSliderData(),
      getTeamData(),
      getAboutBeliefData(),
    ]);
  return (
    <div className="w-full ">
      <GeneralHeader canShow={false} />
      {/* <AboutAndBelief setCanShow={setCanShow} />
      <AboutAndBeliefMobile setCanShow={setCanShow} /> */}
      <NewAboutBelief aboutBeliefData={aboutBeliefData} />
      {/* <Timeline /> */}
      <Team teamData={teamData} />
      <ImagesSlider imageSliderData={imageSliderData} />

      <FeastInStyle theSpaceData={theSpaceData} />
      <Footer footerData={footerData} />
    </div>
  );
};

export default Page;
