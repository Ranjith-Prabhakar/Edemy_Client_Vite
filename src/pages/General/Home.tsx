import Carousal from "../../components/Carousal/Carousal";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Hero from "../../components/Hero/Hero";
// import Slider from "../../components/Slider/Slider";
import Testimonial from "../../components/Testimonial/Testimonial";
import ContainerLayout from "../../layouts/containerLayout";
import useGetScrollPosition from "../../hooks/useGetScrollPosition";

const Home = () => {
  const isScrolled = useGetScrollPosition();
  return (
    <ContainerLayout>
      <Header isScrolled={isScrolled} />
      <Carousal />
      <Hero />
      {/* <Slider /> */}
      <Testimonial />
      <Footer />
    </ContainerLayout>
  );
};

export default Home;
