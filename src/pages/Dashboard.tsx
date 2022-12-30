import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

import GameDetails from "./GameDetails";
import { usePlayerInfo } from "../hooks/usePlayerInfo";
import ShowAllGames from "./ShowAllGames";
import { ConsolesCodesMap } from "../utils/ConsoleRepo";

dayjs.extend(relativeTime);

const Dashboard = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [showAllOpened, setShowAllOpened] = useState(false);

  const onError = (error: Error) => {
    // console.log("Something went wrong...", error)
  };

  const onSuccess = (data: any) => {
    // console.log("great! so, a sideeffect goes here", data)
  };

  const { data, isLoading, isError, error, isFetching } = usePlayerInfo(
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

//   console.log(data);

  return (
    <div className="flex font-lexend m-2">
      <div
        className={
          selectedGame || showAllOpened
            ? `hidden ${showAllOpened ? "" : "md:block"} md:w-1/2`
            : "w-full min-w-1/2 md:w-1/2"
        }
      >
        <div className="flex justify-start gap-2 items-center mt-4">
        <img
                className="w-6 h-6 hover:rotate-12 transition-transform"
                src="https://icongr.am/material/trophy.svg?size=148&color=000000"
                alt=""
              />
          <h2 className="text-xl">Turbocheevos</h2>
        </div>
        <div className="flex items-center mx-2">
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
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Recent Played Games</h2>
          <span
            className="font-bold text-xs cursor-pointer"
            onClick={() => setShowAllOpened(!showAllOpened)}
          >
            Show all
          </span>
        </div>
        <div className="space-y-1  pt-2">
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
                    <span className="text-xs flex gap-1">
                      <span className="text-xs bg-gray-800 text-white rounded-full max-w-fit px-1">
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
            selectedGame ? "hidden md:block md:w-1/2" : ""
          } h-screen overflow-auto w-full md:w-1/2  `}
        >
          <ShowAllGames
            onBack={() => setShowAllOpened(false)}
            onSelected={setSelectedGame}
            selectedGame={selectedGame}
          />
        </div>
      )}
      {selectedGame ? (
        <div className="h-screen overflow-auto w-full px-4">
          <GameDetails
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
