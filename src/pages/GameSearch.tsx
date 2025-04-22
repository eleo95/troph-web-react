import { useMemo, useState } from "react";
import { ConsolesCodesMap } from "../utils/ConsoleRepo";
import { useGetGames } from "../hooks/useGetGames";
import UserData from "../types/UserData";
import GameRow from "../components/GameRow";
import { GameInfoAlt } from "../types/gameInfo";

interface Props {
  onSelected: (gameId: number) => void;
  selectedGame: number | null;
  user?: UserData;
}
export default function GameSearch({ user, selectedGame, onSelected }: Props) {
  const [consoleId, setConsoleId] = useState("5");
  const [query, setQuery] = useState("");
  const [canFetch, setCanFetch] = useState(false);
  const { data } = useGetGames(+consoleId, canFetch, user);

  const filteredList = useMemo(() => {
    if (!data) return [];
    return [...(data as GameInfoAlt[])].filter((e) =>
      e.Title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, data]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setCanFetch(true);
  }

  console.log("aaaaaaaaaaaaadd", selectedGame);
  return (
    <div className="my-2 max-h-full overflow-y-scroll min-h-96">
      <form onSubmit={handleSubmit}>
        {/* <label> */}
        <section className="flex">
          <select
            name="console"
            className="w-full max-w-24 rounded-lg p-2"
            value={consoleId}
            onChange={(e) => {
              setQuery("");
              setConsoleId(e.target.value);
            }}
          >
            {[...ConsolesCodesMap.keys()].map((id) => {
              return (
                <option key={id} value={id} className="m-2">
                  {ConsolesCodesMap.get(id)}
                </option>
              );
            })}
          </select>
          <input
            name="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full ml-2 p-2 bg-gray-200 rounded-lg"
            placeholder="Search..."
          />
        </section>
        <button className="bg-black rounded-lg w-full text-white mt-2 p-2">
          Search
        </button>
        {/* </label> */}
      </form>
      <div className="overflow-y-auto">
        {filteredList?.map((gameInfo) => {
          const data = gameInfo as GameInfoAlt;
          return (
            <GameRow
              gameInfo={gameInfo}
              key={data.ID}
              onSelected={onSelected}
              selectedGame={selectedGame}
            />
          );
        })}
      </div>
    </div>
  );
}
