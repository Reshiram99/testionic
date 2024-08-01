export interface Pokedex {
    data:       Data[];
    page:       number;
    pageSize:   number;
    count:      number;
    totalCount: number;
}

export interface Data {
    id:                     string;
    name:                   string;
    supertype:              Supertype;
    subtypes:               string[];
    hp:                     string;
    types:                  RetreatCost[];
    evolvesFrom?:           string;
    abilities?:             Ability[];
    attacks:                Attack[];
    weaknesses:             Resistance[];
    retreatCost?:           RetreatCost[];
    convertedRetreatCost?:  number;
    set:                    Set;
    number:                 string;
    artist:                 string;
    rarity:                 Rarity;
    flavorText?:            string;
    nationalPokedexNumbers: number[];
    legalities:             Legalities;
    regulationMark?:        string;
    images:                 DatumImages;
    tcgplayer:              Tcgplayer;
    cardmarket:             Cardmarket;
    resistances?:           Resistance[];
    level?:                 string;
}

export interface Ability {
    name: string;
    text: string;
    type: string;
}

export interface Attack {
    name:                string;
    cost:                RetreatCost[];
    convertedEnergyCost: number;
    damage:              string;
    text:                string;
}

export enum RetreatCost {
    Colorless = "Colorless",
    Darkness = "Darkness",
    Fighting = "Fighting",
    Grass = "Grass",
    Metal = "Metal",
}

export interface Cardmarket {
    url:       string;
    updatedAt: UpdatedAt;
    prices:    { [key: string]: number };
}

export enum UpdatedAt {
    The20240723 = "2024/07/23",
}

export interface DatumImages {
    small: string;
    large: string;
}

export interface Legalities {
    unlimited: Expanded;
    standard?: Expanded;
    expanded?: Expanded;
}

export enum Expanded {
    Legal = "Legal",
}

export enum Rarity {
    Rare = "Rare",
    RareHolo = "Rare Holo",
    TrainerGalleryRareHolo = "Trainer Gallery Rare Holo",
}

export interface Resistance {
    type:  string;
    value: string;
}

export interface Set {
    id:           string;
    name:         string;
    series:       string;
    printedTotal: number;
    total:        number;
    legalities:   Legalities;
    ptcgoCode:    string;
    releaseDate:  string;
    updatedAt:    string;
    images:       SetImages;
}

export interface SetImages {
    symbol: string;
    logo:   string;
}

export enum Supertype {
    Pokémon = "Pokémon",
}

export interface Tcgplayer {
    url:       string;
    updatedAt: UpdatedAt;
    prices:    Prices;
}

export interface Prices {
    holofoil?:             The1_StEditionHolofoil;
    reverseHolofoil?:      The1_StEditionHolofoil;
    "1stEditionHolofoil"?: The1_StEditionHolofoil;
    unlimitedHolofoil?:    The1_StEditionHolofoil;
    normal?:               The1_StEditionHolofoil;
}

export interface The1_StEditionHolofoil {
    low:       number;
    mid:       number;
    high:      number;
    market:    number;
    directLow: number | null;
}

export interface PageRoutes {
    label?:       string;
    labelKey:     string;
    route:        string;
    featureFlag?: string;
    isModal?:     boolean;
    toggle?:      boolean;
    featureFlagValue:              boolean;
    nonTaxableSecondaryRestricted: boolean;
    externalLinkKey?: string;
    alertMsgKey?:     string;
    okBtnKey?:        string;
    cancelBtnKey?:    string;
    showBadgeValue?: boolean;
}


