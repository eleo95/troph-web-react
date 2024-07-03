export interface GameInfo {
  GameID:            number;
  ConsoleID:         number;
  ConsoleName:       string;
  Title:             string;
  ImageIcon:         string;
  ImageTitle:        string;
  ImageIngame:       string;
  ImageBoxArt:       string;
  LastPlayed:        string;
  AchievementsTotal: number;
}

export interface PlayerInfo {
  User: string;
  MemberSince: string;
  LastActivity: {
    ID:           number;
    timestamp:    null;
    activitytype: null;
    User:         string;
  };
  RichPresenceMsg: string;
  LastGameID: number;
  ContribCount: number;
  ContribYield: number;
  TotalPoints: number;
  TotalSoftcorePoints: number;
  TotalTruePoints: number;
  Permissions: number;
  Untracked: number;
  ID: number;
  UserWallActive: number;
  Motto: string;
  Rank: null;
  RecentlyPlayedCount: number;
  RecentlyPlayed: GameInfo[];
  UserPic: string;
  TotalRanked: number;
  Status: string;
  UserID: string;
}
