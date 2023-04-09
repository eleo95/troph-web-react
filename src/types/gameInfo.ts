export interface GameInfo {
    GameID: string;
    ConsoleID: number;
    ConsoleName: string;
    Title: string;
    ImageIcon: string;
    LastPlayed: string;	
    MyVote: any;
}

export interface PlayerInfo {
    UserID: string;
    ID: string;
    Points: string;
    TotalSoftcorePoints: string;
    UserPic: string;
    Motto: string;
    RichPresenceMsg: string;
    Rank: number;
    TotalRanked: string;
    MemberSince: string;
    RecentlyPlayed: GameInfo[];

}