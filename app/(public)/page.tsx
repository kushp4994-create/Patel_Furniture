import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Products from "@/components/home/Products";
import FAQ from "@/components/home/FAQ";
import Team from "@/components/home/Team";
import CallBack from "@/components/home/CallBack";
import Testimonials from "@/components/home/Testimonials";
import Blog from "@/components/home/Blog";
import MapSection from "@/components/home/MapSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Products />
      <FAQ />
      <Team />
      <CallBack />
      <Testimonials />
      <Blog />
      {/* <MapSection /> */}
    </>
  );
}