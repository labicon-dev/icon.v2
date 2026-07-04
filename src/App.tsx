import Footer from './components/Footer';
import Header from './components/Header';

/**
 * Composição raiz do site single-page. As seções (Figma: inicio, sobre,
 * interesse, quem, live, contato) são montadas dentro do <main>, entre o
 * Header e o Footer globais — cada uma vem de uma issue própria da M2.
 */
function App() {
  return (
    <>
      <Header />
      <main id="inicio" className="min-h-screen" />
      <Footer />
    </>
  );
}

export default App;
