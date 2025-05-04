import { Director } from "../data/directors";
import { getPhoneString } from "./utils";

interface DirectorProfileProps {
    data: Director;
}

function DirectorProfile({ data }: DirectorProfileProps) {
    return (
        <div>
            <figure>
                <img src={`./directors/${data.file}`} alt={data.name} />
                <figcaption>
                    <h2>{data.name}</h2>
                    { data.title && <p>{data.title}</p>}
                    { data.email && <a href={`mailto:${data.email}`}>{data.email}</a>}
                    { data.phone && <a href={`tel:${data.phone}`}>{getPhoneString(data.phone)}</a> }
                </figcaption>
            </figure>
            { data.description && <p>{data.description}</p> }
        </div>
    )
}

export default DirectorProfile;