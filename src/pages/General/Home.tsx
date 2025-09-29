import Carousal from "../../features/HomePage/Carousal";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Testimonial from "../../components/Testimonial/Testimonial";
import ContainerLayout from "../../layouts/ContainerLayout";
import useGetScrollPosition from "../../hooks/useGetScrollPosition";
import AboutUs from "../../features/HomePage/AboutUs";
import OurBestCourses from "../../features/HomePage/OurBestCourses";
import WhyUs from "../../features/HomePage/WhyUs";

const Home = () => {
  const isScrolled = useGetScrollPosition();
  return (
    <ContainerLayout>
      <Header isScrolled={isScrolled} />
      <Carousal />
      <AboutUs />
      <OurBestCourses />
      <WhyUs />
      <Testimonial />
      <Footer />
    </ContainerLayout>
  );
};

export default Home;
