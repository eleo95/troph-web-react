import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

import GameDetails from "./GameDetails";
import { usePlayerInfo } from "../hooks/usePlayerInfo";
import ShowAllGames from "./ShowAllGames";
import { ConsolesCodesMap } from "../utils/ConsoleRepo";
import { LoadingPage } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../hooks/UseCurrentUserContext";
import UserData from "../types/UserData";
import TrophyIcon from "../components/icons/TrophyIcon";

dayjs.extend(relativeTime);

const Dashboard = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [showAllOpened, setShowAllOpened] = useState(false);
  const navigate = useNavigate()


  const {user} = useCurrentUserContext()
  
  const { data, isLoading, isError, error, isFetching } = usePlayerInfo(
    user as UserData
  );

  useEffect(()=>{
    if(Object.keys(user).length === 0){
      navigate("/")
    }
  },[user, navigate])

  if (Object.keys(user).length === 0) {
    return (
      <LoadingPage/>
    );
  }

  function clearUser() {
    window.localStorage.removeItem("currentUser")

  }

  if (isLoading || isFetching) {
    return (
      <LoadingPage/>
    );
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // console.log(data);

  return (
    <div className="flex font-lexend px-2">
      <div
        className={
          selectedGame || showAllOpened
            ? `hidden ${showAllOpened ? "" : "md:block"} md:w-1/3`
            : "w-full min-w-1/3 md:w-1/3"
        }
      >
        <div className="flex justify-start gap-2 items-center mt-4">
              <TrophyIcon size={24} className="hover:rotate-12 transition-transform" />
          <h2 className="text-xl">Turbocheevos</h2>
          <div className="flex-1"></div>
          <form onSubmit={clearUser} className="border-2 border-black px-2 rounded-full">
            <button type="submit">Log Out</button>
          </form>
        </div>
        <div className="flex items-center mx-2 mt-4">
          <div className="flex flex-col items-center leading-none justify-center">
            <div className="w-16 h-16 relative">
              <img
                src={`https://retroachievements.org${data?.UserPic ?? ""}`}
                alt=""
                className="rounded-full w-16 h-16"
              />
              <div className="w-3 h-3 bg-red-500 absolute bottom-1 right-1 rounded-full border-2 border-white" />
            </div>
            <span className="text-center">{data?.UserID}</span>
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
                {parseInt(data?.TotalSoftcorePoints ?? "0").toLocaleString(
                  "en-US"
                )}
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
                {data?.MemberSince.slice(0, 4)}
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
                {parseInt(data?.TotalRanked ?? "0").toLocaleString("en-US")}
              </span>
              <span className="text-sm">Rank</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <h2 className="sm:text-xl">Recent Played Games</h2>
          <button
            className="font-bold text-xs cursor-pointer bg-black text-white px-2 rounded-full"
            onClick={() => setShowAllOpened(!showAllOpened)}
          >
            Show all
          </button>
        </div>
        <div className="space-y-1 pt-2">
          {data?.RecentlyPlayed.map(
            ({ GameID, Title, ConsoleID, LastPlayed, ImageIcon }) => (
              <div
                key={GameID}
                className={`p-2 rounded-md cursor-pointer transition-all 200ms ease-out  ${
                  selectedGame === GameID
                    ? "text-white bg-black"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedGame(GameID)}
              >
                <div className="flex items-start">
                  <img
                    className="w-12 h-12 rounded-md"
                    src={`https://retroachievements.org${ImageIcon ?? ""}`}
                    alt=""
                  />
                  <div className="flex flex-col gap-1 ml-2">
                    <span className="font-bold text-sm">{Title}</span>
                    <span className="text-xs flex gap-1 items-center">
                      <span className={`text-xs rounded-full max-w-fit px-1 border-2 ${
                        selectedGame === GameID
                        ? "border-white text-white "
                        : "border-gray-800 text-black"
                      }`}>
                        {ConsolesCodesMap.get(ConsoleID)}
                      </span>
                      <span>&#8226;</span>
                      Played {dayjs(LastPlayed).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
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
            onBack={() => setSelectedGame("")}
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
