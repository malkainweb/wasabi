import dynamic from "next/dynamic";
import Header from "./Home/components/Header";

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

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-black h-[2rem]"></div>
      <Menu />
      <HomeRecipes />
      <OurStory />
      <OurExperince />
      <Footer />
    </>
  );
}
