interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

type Winner = 'DRAW' | 'AWAY_TEAM' | 'HOME_TEAM';

interface Score {
  winner: Winner | null;
  duration: string;
  fullTime: {
    home: null | number;
    away: null | number;
  };
  halfTime: {
    home: null | number;
    away: null | number;
  };
}

interface Filters {
  dateFrom: string;
  dateTo: string;
  permission: string;
  status: string[];
  limit: number;
}

interface ResultSet {
  count: number;
  competitions: string;
  first: string;
  last: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
}

interface Odds {
  msg: string;
}

export type Match = {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: string | null;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  odds: Odds;
  referees: Referee[];
};

export type MatchesResponse = {
  matches: Match[];
  filters: {
    dateFrom: string;
    dateTo: string;
    permission: string;
  };
  resultSet: {
    count: number;
    competitions: string;
    first: string;
    last: string;
    played: number;
  };
};

export interface FixturesResponse {
  filters: {
    season: string;
  };
  resultSet: {
    count: number;
    first: string;
    last: string;
    played: number;
  };
  competition: Competition;
  matches: Match[];
}

export interface MatchHistoryResponse {
  filters: Filters;
  resultSet: ResultSet;
  matches: Match[];
}

interface Referee {
  id: number;
  name: string;
  type: string;
  nationality: string;
}

interface WinnerTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}

// Modify Season to include optional winner
interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: WinnerTeam | null;
}

interface TeamStats {
  id: number;
  name: string;
  wins: number;
  draws: number;
  losses: number;
}

export interface HeadToHeadResponse {
  filters: {
    limit: string;
    permission: string;
  };
  resultSet: {
    count: number;
    competitions: string;
    first: string;
    last: string;
  };
  aggregates: {
    numberOfMatches: number;
    totalGoals: number;
    homeTeam: TeamStats;
    awayTeam: TeamStats;
  };
  matches: Match[];
}
