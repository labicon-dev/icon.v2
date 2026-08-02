import Footer from './components/footer';
import Header from './components/header';
import ContatoSection from './sections/contato-section';
import HomeSection from './sections/home-section';
import InteresseSection from './sections/interesse-section';
import LiveSection from './sections/live-section';
import QuemSection from './sections/quem-section';
import SobreSection from './sections/sobre-section';

function App() {
  return (
    <>
      <Header />
      <main>
        <HomeSection />
        <SobreSection />
        <InteresseSection />
        <QuemSection />
        <LiveSection />
        <ContatoSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
