import Navbar from "../components/Navbar";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <About />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
