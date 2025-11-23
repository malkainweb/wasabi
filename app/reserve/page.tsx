"use client";
import { useState } from "react";
import Footer from "../Home/components/Footer";
import ImageCarousel from "../gallery/ImageCarousel";
import ReserveForm from "./ReserveForm";
import EventInviteSection from "./EventInviteHero";
import GeneralHeader from "../Components/GeneralHeader";

const Page = () => {
  const [canShow, setCanShow] = useState(false);

  return (
    <div className="overflow-hidden lg:overflow-visible">
      <GeneralHeader canShow={canShow} />
      <ReserveForm />
      <EventInviteSection />
      <ImageCarousel show={true} />

      <Footer />
    </div>
  );
};

export default Page;
