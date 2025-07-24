import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'
import Nav from './components/Nav'
import Home from './pages/Home';
import About from './pages/About';
import AmysWishClub from './pages/AmysWishClub';
import Horses from './pages/Horses';
import Support from './pages/Support';
import CMSEditor from './pages/CMSEditor';
import LoginPage from './pages/Login';

export type Page = {
  name: string;
  href: string;
}

const PAGES: Page[] = [
  { name: 'About', href: '/about' },
  { name: "Amy's Wish Club", href: '/awc'},
  { name: 'Horses', href: '/horses' },
  { name: 'Support', href: '/support' },
];

function App() {

  return (
    <>
      <Nav pages={PAGES} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/awc" element={<AmysWishClub/>} />
        <Route path="/horses" element={<Horses/>} />
        <Route path="/support" element={<Support/>} />
        <Route path="/cms" element={<CMSEditor/>} />
        <Route path="/cms/login" element={<LoginPage />} />
      </Routes>
      <Footer pages={PAGES} />
    </>
  )
}

export default App
