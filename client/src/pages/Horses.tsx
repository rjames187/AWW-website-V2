import { useContext } from 'react';
import HorseProfile from '../components/HorseProfile';
import './horses.css';
import { DataContext } from '../context/DataContext';
import { ContentObject } from '../components/cms/types';
import { Horse } from '../data/horses';

const CDN_HOST = import.meta.env.VITE_CDN_HOST;

const mapToHorse = (object: ContentObject): Horse => {
  return {
    name: object.name,
    description: object.description,
    file: `${CDN_HOST}/${object.file.uploadKey}`,
    bf: object.bf
  };
}

function Horses() {
  const { data } = useContext(DataContext);

  const dataToRender = data?.Horses ?? [];

  return (
    <main>
      <section id="horses">
        <div>
          <h1>Meet our Horses!</h1>
          { /* therapy horse link goes here */ }
          { dataToRender.map((horse) => <HorseProfile key={horse.name} data={mapToHorse(horse)} />) }
        </div>
      </section>
    </main>
  )
}

export default Horses;