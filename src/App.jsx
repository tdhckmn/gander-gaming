import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Grok from './pages/Grok.jsx';
import Tools from './pages/Tools.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grok" element={<Grok />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
