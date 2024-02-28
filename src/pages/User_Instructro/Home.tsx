import Carousal from "../../components/Carousal/Carousal";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Slider from "../../components/Slider/Slider";
import Testimonial from "../../components/Testimonial/Testimonial";
import ContainerLayout from "../../layouts/containerLayout";

const Home = () => {
  return (
      <ContainerLayout>
      <Header />
      <Carousal />
      <Hero />
      <Slider />
      <Testimonial />
      <Footer />
      </ContainerLayout>
  );
};

export default Home;
