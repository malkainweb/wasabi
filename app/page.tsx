import Image from "next/image";
import Header from "./Home/components/Header";
import Menu from "./Home/components/Menu";
import HomeRecipes from "./Home/components/Recipes";
import OurStory from "./Home/components/OurStory";
import Footer from "./Home/components/Footer";
import OurExperince from "./Home/components/OurExperince";

export default function Home() {
  return (
    <>
      {/* <div className="h-[100vh]"></div> */}
      <Header />
      <div className="bg-black h-[2rem]"></div>
      <Menu />
      <HomeRecipes />
      <OurStory />
      <OurExperince />
      {/* <div className="h-[100vh]"></div> */}
      <Footer />
    </>
  );
}
