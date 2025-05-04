import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'
import Nav from './components/Nav'
import Home from './pages/Home';
import About from './pages/About';

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
      </Routes>
      <Footer pages={PAGES} />
    </>
  )
}

export default App
