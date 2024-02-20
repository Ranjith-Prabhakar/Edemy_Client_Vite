import Carousal from "../../components/Carousal/Carousal";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Slider from "../../components/Slider/Slider";
import Testimonial from "../../components/Testimonial/Testimonial";


const Home = () => {
  return (
    <div className="dark:bg-black dark:text-white">
      <Header />
      <Carousal />
      <Hero />
      <Slider />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
