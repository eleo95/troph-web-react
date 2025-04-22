import { useEffect, useState } from "react";

import GameDetails from "./GameDetails";
import { usePlayerInfo } from "../hooks/usePlayerInfo";
import ShowAllGames from "./ShowAllGames";
import { LoadingPage } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../hooks/UseCurrentUserContext";
import UserData from "../types/UserData";
import UserProfile from "./UserProfile";
import TabSwitcher from "../components/TabSwitcher";
import GameSearch from "./GameSearch";
import Header from "../components/Header";

const Dashboard = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [showAllOpened, setShowAllOpened] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const { user } = useCurrentUserContext();

  const { data, isLoading, isError, error, isFetching } = usePlayerInfo(
    user as UserData
  );

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user, navigate]);

  if (Object.keys(user).length === 0) {
    return <LoadingPage />;
  }

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  console.log("wwwwwwwwwww", selectedGame);

  return (
    <div className="flex font-lexend px-2 h-screen">
      <div
        className={
          selectedGame || showAllOpened
            ? `hidden ${showAllOpened ? "" : "md:block"} md:w-1/3`
            : "w-full transition-all duration-700 min-w-1/3 md:w-1/3 h-full flex flex-col"
        }
      >
        <Header />
        {open ? (
          <UserProfile
            user={data}
            onShowAll={setShowAllOpened}
            selectedGame={selectedGame}
            onSelected={setSelectedGame}
          />
        ) : (
          <GameSearch
            user={user as UserData}
            selectedGame={selectedGame}
            onSelected={setSelectedGame}
          />
        )}
        <div className="flex h-full"></div>
        <TabSwitcher open={open} setOpen={() => setOpen(!open)} />
      </div>
      {showAllOpened && (
        <div
          className={`${
            selectedGame ? "hidden md:block" : ""
          } h-full overflow-auto w-full md:w-1/3  `}
        >
          <ShowAllGames
            user={user as UserData}
            onBack={() => setShowAllOpened(false)}
            onSelected={setSelectedGame}
            selectedGame={selectedGame}
          />
        </div>
      )}
      {selectedGame ? (
        <div className="h-full overflow-auto w-full md:pl-4">
          <GameDetails
            user={user as UserData}
            gameId={selectedGame}
            onBack={() => setSelectedGame(null)}
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

export default Dashboard;
