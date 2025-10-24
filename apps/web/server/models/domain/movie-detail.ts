export interface MovieDetail {
    id: string;
    url: string;
    primaryTitle: string;
    originalTitle: string;
    type: string;
    description: string;
    primaryImage: string;
    thumbnails: Thumbnail[];
    trailer: string;
    startYear: number;
    releaseDate: Date;
    interests: string[];
    countriesOfOrigin: string[];
    externalLinks: any[];
    spokenLanguages: string[];
    filmingLocations: any[];
    productionCompanies: ProductionCompany[];
    grossWorldwide: number;
    genres: string[];
    isAdult: boolean;
    runtimeMinutes: number;
    averageRating: number;
    numVotes: number;
    directors: Director[];
    writers: Director[];
    cast: Cast[];
}

export interface Cast {
    id: string;
    url: string;
    fullName: string;
    primaryImage: string;
    thumbnails: Thumbnail[];
    job: string;
    characters: string[];
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Director {
    id: string;
    url: string;
    fullName: string;
}

export interface ProductionCompany {
    id: string;
    name: string;
}