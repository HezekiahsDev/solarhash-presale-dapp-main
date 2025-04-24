import "aos/dist/aos.css";
import Welcome from "./Welcome";
import BuyTokens from "./BuyTokens";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="pt-32 pb-12 flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 px-4 bg-cover bg-center border-b-4 border-yellow-500"
      style={{
        backgroundImage: "url('/Solarhash_assets/bg1_net_animated.gif')",
      }}
    >
      <Welcome />
      <BuyTokens />
    </section>
  );
};

export default HeroSection;
