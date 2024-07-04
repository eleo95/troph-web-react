import TrophyIcon from "../components/icons/TrophyIcon";
import { PlayerInfo } from "../types/gameInfo";
import GameRow from "../components/GameRow";
import { useNavigate } from "react-router-dom";

interface Props {
  user?: PlayerInfo;
  onSelected: (gameId: number) => void;
  selectedGame: number | null;
  onShowAll: (state: boolean) => void;
}

export default function UserProfile({
  user,
  selectedGame,
  onSelected,
  onShowAll,
}: Props) {
  const navigate = useNavigate();

  function clearUser() {
    window.localStorage.removeItem("currentUser");
    navigate("/home", { replace: true });
  }

  return (
    <>
      <div className="flex justify-start gap-2 items-center mt-4">
        <TrophyIcon
          size={24}
          className="hover:rotate-12 transition-transform"
        />
        <h2 className="text-xl">Turbocheevos</h2>
        <div className="flex-1"></div>
        <form
          onSubmit={clearUser}
          className="border-2 border-black px-2 rounded-full"
        >
          <button type="submit">Log Out</button>
        </form>
      </div>
      <div className="flex items-center mx-2 mt-4">
        <div className="flex flex-col items-center leading-none justify-center">
          <div className="w-16 h-16 relative">
            <img
              src={`https://retroachievements.org${user?.UserPic ?? ""}`}
              alt=""
              className="rounded-full w-16 h-16"
            />
            <div className="w-3 h-3 bg-red-500 absolute bottom-1 right-1 rounded-full border-2 border-white" />
          </div>
          <span className="text-center">{user?.UserID}</span>
        </div>
        <div className="flex flex-1"></div>
        <div className="flex space-x-4 flex-1 justify-around ml-8 py-4">
          <div className="flex flex-col items-center">
            <img
              className="w-6 h-6"
              src="https://icongr.am/material/plus-circle-multiple-outline.svg?size=32&color=000"
              alt=""
            />
            <span className="font-bold text-sm">
              {user?.TotalSoftcorePoints.toLocaleString("en-US")}
            </span>
            <span className="text-sm">Points</span>
          </div>
          <div className="flex flex-col  items-center">
            <img
              className="w-6 h-6"
              src="https://icongr.am/material/history.svg?size=32&color=000"
              alt=""
            />
            <span className="font-bold text-sm">
              {user?.MemberSince.slice(0, 4)}
            </span>
            <span className="text-sm">Since</span>
          </div>
          <div className="flex flex-col  items-center ">
            <img
              className="w-6 h-6"
              src="https://icongr.am/material/poll.svg?size=32&color=000"
              alt=""
            />
            <span className="font-bold text-sm">
              {user?.TotalRanked.toLocaleString("en-US")}
            </span>
            <span className="text-sm">Rank</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h2 className="sm:text-xl">Recent Played Games</h2>
        <button
          className="font-bold text-xs cursor-pointer bg-black text-white px-2 rounded-full"
          onClick={() => onShowAll(true)}
        >
          Show all
        </button>
      </div>
      <div className="space-y-1 pt-2">
        {user?.RecentlyPlayed.map((gameInfo) => (
          <GameRow
            gameInfo={gameInfo}
            key={gameInfo.GameID}
            onSelected={onSelected}
            selectedGame={selectedGame}
          />
        ))}
      </div>
    </>
  );
}
