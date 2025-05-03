import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'
import Nav from './components/Nav'
import Home from './pages/home';

export type Page = {
  name: string;
}

const PAGES: Page[] = [
  { name: 'About' },
  { name: "Amy's Wish Club"},
  { name: 'Horses' },
  { name: 'Support' }
];

function App() {

  return (
    <>
      <Nav pages={PAGES} />
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Footer pages={PAGES} />
    </>
  )
}

export default App
