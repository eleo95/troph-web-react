export interface GameInfo {
    GameID: string;
    ConsoleID: string;
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
    UserPic: string;
    Motto: string;
    RichPresenceMsg: string;
    Rank: number;
    MemberSince: string;
    RecentlyPlayed: GameInfo[]

}