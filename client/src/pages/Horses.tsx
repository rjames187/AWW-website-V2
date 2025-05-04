import HorseProfile from '../components/HorseProfile';
import { DataService } from '../DataService';
import './horses.css';

const horses = DataService.getHorses();

function Horses() {
  return (
    <main>
      <section id="horses">
        <div>
          <h1>Meet our Horses!</h1>
          <a href="https://form.jotform.com/203338511533044">🗳️Vote for Therapy Horse of the Year!🗳️</a>
          { horses.map((horse) => <HorseProfile key={horse.name} data={horse} />) }
        </div>
      </section>
    </main>
  )
}

export default Horses;