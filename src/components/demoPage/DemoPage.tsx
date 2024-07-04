import { useState } from "react";

import data from "../../assets/user_summary.json";
import ShowAllGamesDemo from "./ShowAllDemo";
import GameDetailsDemo from "./GameDetailsDemo";
import UserProfile from "../../pages/UserProfile";

const DemoPage = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [showAllOpened, setShowAllOpened] = useState(false);
  const onSelected = (state: number) => {
    setSelectedGame(state);
  };

  return (
    <div className="flex font-lexend px-2">
      <div
        className={
          selectedGame || showAllOpened
            ? `hidden ${showAllOpened ? "" : "md:block"} md:w-1/3`
            : "w-full transition-all duration-700 min-w-1/3 md:w-1/3"
        }
      >
        <UserProfile
          user={data}
          onShowAll={setShowAllOpened}
          selectedGame={selectedGame}
          onSelected={setSelectedGame}
        />
      </div>
      {showAllOpened && (
        <div
          className={`${
            selectedGame ? "hidden md:block" : ""
          } h-full overflow-auto w-full md:w-1/3  `}
        >
          <ShowAllGamesDemo
            // user={user as UserData}
            onBack={() => setShowAllOpened(false)}
            onSelected={onSelected}
            selectedGame={selectedGame}
          />
        </div>
      )}
      {selectedGame ? (
        <div className="h-full overflow-auto w-full md:pl-4">
          <GameDetailsDemo
            // user={user as UserData}
            onBack={() => setSelectedGame(null)}
            gameId={selectedGame}
          />
        </div>
      ) : (
        <div className="hidden md:flex w-full justify-center items-center">
          Select a Game
        </div>
      )}
    </div>
  );
};

export default DemoPage;
