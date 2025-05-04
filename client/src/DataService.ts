import { Director, DIRECTORS } from "./data/directors";
import { Horse, HORSES } from "./data/horses";
import { SponsorCategory, SPONSORS } from "./data/sponsors";

export class DataService {
  public static getSponsors(): SponsorCategory[] {
    return SPONSORS;
  }

  public static getDirectors(): Director[] {
    return DIRECTORS;
  }

  public static getHorses(): Horse[] {
    return HORSES;
  }
}