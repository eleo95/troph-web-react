export interface GameType {
    ID:                         number;
    Title:                      string;
    ConsoleID:                  number;
    ForumTopicID:               number;
    Flags:                      null;
    ImageIcon:                  string;
    ImageTitle:                 string;
    ImageIngame:                string;
    ImageBoxArt:                string;
    Publisher:                  string;
    Developer:                  string;
    Genre:                      string;
    Released:                   string;
    IsFinal:                    number;
    RichPresencePatch:          string;
    players_total:              number;
    achievements_published:     number;
    points_total:               number;
    GuideURL:                   string;
    ConsoleName:                string;
    NumDistinctPlayers:         number;
    ParentGameID:               null;
    NumAchievements:            number;
    Achievements:{ [key: string] : Achievement }
    NumAwardedToUser:           number;
    NumAwardedToUserHardcore:   number;
    NumDistinctPlayersCasual:   number;
    NumDistinctPlayersHardcore: number;
    UserCompletion:             string;
    UserCompletionHardcore:     string;

}

export interface Achievement {
    ID:                 number;
    NumAwarded:         number;
    NumAwardedHardcore: number;
    Title:              string;
    Description:        string;
    Points:             number;
    TrueRatio:          number;
    Author:             string;
    DateModified:       string;
    DateCreated:        string;
    BadgeName:          string;
    DisplayOrder:       number;
    MemAddr:            string;
    type:               string | null;
    DateEarned?:         string;
}
