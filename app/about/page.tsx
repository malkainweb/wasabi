"use client";
import { useState } from "react";
import Footer from "@/app/Home/components/Footer";
import { AboutAndBelief } from "./components/about-belief";
import { FeastInStyle } from "./components/feast-in-style";
import { ImagesSlider } from "./components/image-slider";
import { Timeline } from "./components/timeline";
import { AboutAndBeliefMobile } from "./components/about-belief-mobile-only";
import GeneralHeader from "../Components/GeneralHeader";

const Page = () => {
  const [canShow, setCanShow] = useState(false);

  return (
    <div className="w-full ">
      <GeneralHeader canShow={canShow} />
      <AboutAndBelief setCanShow={setCanShow} />
      <AboutAndBeliefMobile setCanShow={setCanShow} />
      <Timeline />

      <ImagesSlider />
      <FeastInStyle />
      <Footer />
    </div>
  );
};

export default Page;
