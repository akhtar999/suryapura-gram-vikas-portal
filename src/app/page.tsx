import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TickerBar from "@/components/TickerBar";
import Pillars from "@/components/Pillars";
import Chaupal from "@/components/Chaupal";
import Testimonials from "@/components/Testimonials";
import VillageServices from "@/components/VillageServices";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ActionBand from "@/components/ActionBand";
import Footer from "@/components/Footer";
import QuickContact from "@/components/QuickContact";
import MobileBottomNav from "@/components/MobileBottomNav";

const Home = () => (
  <>
    <Header />
    <main>
      <Hero />
      <TickerBar />
      <Pillars />
      <Chaupal />
      {/* <Testimonials /> */}
      <VillageServices />
      <BeforeAfterSlider />
      <Testimonials />
      <ActionBand />
      {/* <Testimonials /> */}
    </main>
    <Footer />
    <QuickContact />
    <MobileBottomNav />
  </>
);

export default Home;
