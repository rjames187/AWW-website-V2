export interface Sponsor {
    name: string;
    file?: string;
    href?: string;
}

export interface SponsorCategory {
    category: string;
    items: Sponsor[];
}

export const SPONSORS: SponsorCategory[] = [
  {
    category: 'Diamond Buckle',
    items: [
      {
        name: 'Herchman Family Foundation'
      },
      {
        name: 'The Crespi Family'
      }
    ]
  },
  {
    category: 'Gold Buckle ($3,000)',
    items: [
      {
        name: 'The Grubbs Family'
      },
      {
        name: 'Dr. Joan and Dr. Joe Kay'
      },
      {
        name: 'Tracy and Jason Thomas'
      },
      {
        name: 'UST Fuel Solutions',
        file: 'ust.png',
        href: 'https://ustfuel.com/'
      }
    ]
  },
  {
    category: 'Silver Buckle',
    items: [
      {
        name: 'The Oehl Family'
      },
      {
        name: 'JB and Mary Lou Sandlin Foundation'
      },
      {
        name: 'Precision Eagle Pools and Remodeling',
        file: 'preceagle.png',
        href: 'https://precisioneaglepools.com/'
      },
      {
        name: 'Ride with Pride Inc.',
        file: 'rdwp.png',
        href: 'http://www.ridewithprideinc.com/'
      }
    ]
  },
  {
    category: 'Bronze Buckle',
    items: [
      {
        name: 'Outlaw Equine Hospital Rehab and Center',
        file: 'ole.png',
        href: 'https://www.outlawequinevet.com/'
      },
      {
        name: 'The Collins Family'
      },
      {
        name: 'EPS Consulting LLC'
      },
      {
        name: 'Staci and Sloan Harris'
      },
      {
        name: 'Princeton Foundation'
      },
      {
        name: 'The Straten Family'
      },
      {
        name: 'Complete Care Southlake',
        file: 'ccs.jpg',
        href: 'https://www.visitcompletecare.com/er-locations/southlake-er/'
      },
      {
        name: 'Methodist Southlake Medical Center',
        file: 'msmc.png',
        href: 'https://www.methodisthealthsystem.org/methodist-southlake-medical-center/'
      }
    ]
  },
  {
    category: 'Ruby Buckle',
    items: [
      {
        name: 'The Krieser Family'
      },
      {
        name: 'The Williams Family'
      },
      {
        name: 'The McCaskill Family'
      },
      {
        name: 'The Bobrowski Family'
      },
      {
        name: 'The Warner Family'
      },
      {
        name: 'NSR Ag Products LLC'
      },
      {
        name: 'Pilat and Kourosh Law Pllc',
        file: 'pkl.png',
        href: 'https://pilatandkouroshlaw.com/'
      },
      {
        name: 'Ascension Search Partners',
        file: 'asp.png',
        href: 'https://ascensionsearchpartners.com/'
      },
      {
        name: 'First Financial Bank',
        file: 'ffb.png',
        href: 'https://ffin.com/'
      },
      {
        name: 'D Flawless Concierge Jewelers',
        file: 'dfcj.png',
        href: 'https://dflawlessjewelers.com/'
      },
      {
        name: 'Integrative Pain and Wellness Center',
        file: 'ipwc.png',
        href: 'https://ipawc.com/'
      },
      {
        name: 'Pappas and Company CPAs P.C.',
        file: 'pccpa.png',
        href: 'https://www.thisismycpa.com/'
      },
      {
        name: 'Law Office of Dana L. White, PLLC',
        file: 'lodw.png',
        href: 'https://www.danawhitefamilylaw.com/'
      },
      {
        name: 'Litaker Realty',
        file: 'lr.png',
        href: 'https://www.litakerrealty.com/'
      },
      {
        name: 'Cosmetic and Family Dentistry of North Texas',
        file: 'cafdnt.gif',
        href: 'https://dentistincolleyville.com/'
      }
    ]
  }
];