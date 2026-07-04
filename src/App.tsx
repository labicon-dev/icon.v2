import ContatoSection from './pages/ContatoSection';

/**
 * Composição raiz do site single-page. As seções (Figma: inicio, sobre,
 * interesse, quem, live, contato, footer) são montadas aqui na ordem do
 * design, cada uma vinda de uma issue própria da M2.
 */
function App() {
  return (
    <main>
      <ContatoSection />
    </main>
  );
}

export default App;
