export type BettingOption = {
  name: string;
  odds: number;
}

export type BettingCategory = {
  type: string;
  options: BettingOption[];
}

export type Competitors = {
  home: string;
  away: string;
}

export type Score = {
  home: number;
  away: number;
}

export type Match = {
  id: string;
  sportIcon: string;
  sportType: string;
  competitors: Competitors;
  startTime: string;
  currentScore: Score;
  bettingOptions: BettingCategory[];
}

export type MatchesData = {
  matches: Match[];
}

export type SelectedOdd = {
  matchId: string;
  categoryType: string;
  optionName: string;
}
