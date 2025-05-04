import { Director, DIRECTORS } from "./data/directors";
import { SponsorCategory, SPONSORS } from "./data/sponsors";

export class DataService {
    public static getSponsors(): SponsorCategory[] {
        return SPONSORS;
    }

    public static getDirectors(): Director[] {
        return DIRECTORS;
    }
}