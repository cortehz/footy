interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: Winner | null;
}

interface Winner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string | null;
  lastUpdated: string;
}

export interface Competition {
  id: number;
  area: Area;
  name: string;
  code: string;
  type: 'LEAGUE' | 'CUP' | 'SUPERCUP';
  emblem: string;
  plan: string;
  currentSeason: Season;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}

interface Filters {
  client: string;
}

export interface CompetitionsResponse {
  count: number;
  filters: Filters;
  competitions: Competition[];
}
