import About from "./components/About";
import Advert from "./components/Advert";
import Banner from "./components/Banner";
import HeroSection from "./components/HeroSection";
import SHTP from "./components/SHTP";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <Banner />
        <Advert />
        <About />
        <SHTP />
      </main>
    </div>
  );
};

export default HomePage;
