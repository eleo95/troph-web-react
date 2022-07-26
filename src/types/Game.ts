export interface Game {
    ID: string;
    Title: string;
    ConsoleID: string;
    ConsoleName: string;
    ImageIcon: string;
    ImageTitle: string;
    ImageIngame: string;
    ImageBoxArt: string;
    Publisher: string;
    Developer: string;
    Genre: string;
    Released: string;
    LastPlayed: string;
    NumAchievements: number;
    NumDistinctPlayersCasual: string;
    NumDistinctPlayersHardcore: string;
    NumAwardedToUser: number;
    NumAwardedToUserHardcore: number;
    UserCompletion: string;
    UserCompletionHardcore: string;
    Achievements: Achievement[]

}

export interface Achievement {
    ID: string;
    NumAwarded: string;
    NumAwardedHardcore: string;
    Title:  string;
    Description:  string;
    Points:  string;
    TrueRatio: string;
    Author:  string;
    DateModified: string;
    DateCreated:  string;
    BadgeName:  string;
    DisplayOrder:  string;
    DateEarned: string;
    // MemAddr: string;
}
