import Footer from './components/Footer'
import Nav from './components/Nav'

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
      <Footer pages={PAGES} />
    </>
  )
}

export default App
