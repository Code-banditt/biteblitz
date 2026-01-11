"use client";
import AboutPage from "./_Components/About";
import CalltoAction from "./_Components/CalltoAction";
import Footer from "./_Components/footer";
import FooterTwo from "./_Components/footerTwo";
import Header from "./_Components/Header";
import HomePage from "./_Components/hero";
import CalltoAction2 from "./_Components/landingpage2";
import MenuSection from "./_Components/pizzasect";

export default function Home() {
  return (
    <div className=" min-h-screen  bg-[rgb(136,131,179)] font-sans">
      <div>
        <Header />
      </div>

      <div>
        <CalltoAction2 />
      </div>

      <div>
        {/* Call to Action Section */}
        <CalltoAction />
      </div>

      <div className="h-full">
        {/* Hero Section */}
        <HomePage />
      </div>
      <div>
        {/* Pizza Section */}
        <FooterTwo />
      </div>

      <div>
        {/* Pizza Section */}
        <MenuSection />
      </div>

      <div>
        {/* About Section */}
        <AboutPage />
      </div>

      <div className="w-full p-0">
        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
}
