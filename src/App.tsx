import Footer from './components/Footer';
import Header from './components/Header';
import ContatoSection from './pages/ContatoSection';
import HomePage from './pages/HomePage';
import InteresseSection from './pages/InteresseSection';
import LiveSection from './pages/LiveSection';
import QuemSection from './pages/QuemSection';
import SobreSection from './pages/SobreSection';

/**
 * Composição raiz do site single-page, na ordem do frame do Figma:
 * inicio (Home) → sobre → interesse → quem → live → contato, entre o
 * Header e o Footer globais. Cada seção veio de uma issue própria da M2.
 */
function App() {
  return (
    <>
      <Header />
      <main>
        <HomePage />
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
