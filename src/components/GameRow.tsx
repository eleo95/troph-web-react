import dayjs from "dayjs";
import { GameInfo } from "../types/gameInfo";
import { ConsolesCodesMap } from "../utils/ConsoleRepo";

interface Props {
  gameInfo: GameInfo;
  onSelected: (gameId: number) => void;
  selectedGame: number|null;
}

export default function GameRow({ gameInfo, selectedGame, onSelected }: Props) {
  const { GameID, Title, ConsoleID,LastPlayed, ImageIcon } = gameInfo;
//   console.log(gameInfo)
//   console.log(dayjs(LastPlayed).fromNow())
  return (
    <button
      className={`text-start w-full p-2 rounded-md cursor-pointer transition-all 200ms ease-out  ${
        selectedGame === GameID ? "text-white bg-black" : "hover:bg-gray-100"
      }`}
      onClick={() => onSelected(GameID)}
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
            <span
              className={`text-xs rounded-full max-w-fit px-1 border-2 ${
                selectedGame === GameID
                  ? "border-white text-white "
                  : "border-gray-800 text-black"
              }`}
            >
              {ConsolesCodesMap.get(ConsoleID)}
            </span>
            {
                LastPlayed && (
                    <>
                        <span>&#8226;</span>
                        Played {dayjs(LastPlayed).fromNow()}
                    </>
                )
            }
          </span>
        </div>
      </div>
    </button>
  );
}
