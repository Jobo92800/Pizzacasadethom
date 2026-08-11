import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import PizzaMenu from './components/PizzaMenu';
import PlaquesPizza from './components/PlaquesPizza';
import BurgersMenu from './components/BurgersMenu';
import Extras from './components/Extras';
import GoogleReviews from './components/GoogleReviews';
import Location from './components/Location';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';
import PizzaBackground from './components/PizzaBackground';

function App() {
  return (
    <div className="min-h-screen relative">
      <PizzaBackground />
      <div className="relative z-10">
        <Hero />
        <WhyUs />
        <PizzaMenu />
        <PlaquesPizza />
        <BurgersMenu />
        <Extras />
        <GoogleReviews />
        <Location />
        <Footer />
      </div>
      <FloatingButton />
    </div>
  );
}

export default App;
