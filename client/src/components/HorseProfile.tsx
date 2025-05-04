import { Horse } from "../data/horses";

interface HorseProfileProps {
  data: Horse;
}

function HorseProfile({ data }: HorseProfileProps) {
  return (
    <div>
      <figure>
        <img src={`./horses/${data.file}`} alt={data.name} />
        <figcaption>
          <h2>{data.name}</h2>
          { data.bf && data.bf.map((year) => <p>{`👑${year} Therapy Horse of the Year👑`}</p>)}
        </figcaption>
      </figure>
      <p>{data.description}</p>
    </div>
  )
}

export default HorseProfile;