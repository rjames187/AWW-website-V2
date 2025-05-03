import { SponsorCategory, SPONSORS } from "./data/sponsors";

export class DataService {
    public static getSponsors(): SponsorCategory[] {
        return SPONSORS;
    }
}