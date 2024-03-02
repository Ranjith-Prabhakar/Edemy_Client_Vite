import Carousal from "../../components/Carousal/Carousal";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
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
