import { useAllGames } from "../hooks/useAllGames";
import type UserData from "../types/UserData";

interface Props {
  onBack: () => void;
  onSelected: (gameId:string) => void;
  selectedGame: string;
  user: UserData
}

const ShowAllGames = ({ onBack, onSelected, selectedGame,user }: Props) => {

  const { data, isLoading, isError, error } = useAllGames(user);

  // if (isLoading) return (<h2>Loading...</h2>)
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="flex flex-col font-lexend pt-4 h-screen">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-x-2 items-center">
          <img
            onClick={() => onBack()}
            className="w-8 h-8 cursor-pointer"
            src="https://icongr.am/material/chevron-left.svg?size=32&color=000"
            alt=""
          />
          <h2 className="text-xl">All Games</h2>
        </div>
        {/* <span className='font-bold text-xs cursor-pointer' onClick={()=>onSelected('771')}>Show all</span> */}
      </div>
      <div className="pt-2 overflow-y-auto h-fit space-y-2">
        {isLoading ? (
          <div className="w-full animate-pulse">
            {Array.from([0, 1, 3, 4, 5, 6, 7, 8, 9]).map((e) => {
              return (
                <div
                  key={"key_" + e}
                  id={"id_" + e}
                  className={`p-2 rounded-md bg-gray-100`}
                  onClick={() => {}}
                >
                  {/* <Link to={`/game/${GameID}`}> */}
                  <div className="flex items-start  w-full">
                    {/* <img className='w-12 h-12 rounded-md ' src={userpic} alt="" /> */}
                    <div className="w-12 h-12 rounded-md bg-gray-300" />
                    <div className="flex flex-col gap-2 ml-2 w-full">
                      <div className="w-48 h-4 rounded-md bg-gray-400" />
                      <div className="w-full h-2 rounded-md bg-gray-300" />
                      <div className="w-36 h-2 rounded-md bg-gray-300" />
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              );
            })}
          </div>
        ) : (
          data?.map(({ GameID, Title, ConsoleName, ImageIcon }) => (
            <div
              key={GameID}
              className={`p-2 rounded-md cursor-pointer transition-all 200ms ease-out  ${
                selectedGame === GameID
                  ? "text-white bg-black"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onSelected(GameID)}
            >
              <div className="flex items-start">
                <img
                  className="w-12 h-12 rounded-md"
                  src={`https://retroachievements.org${ImageIcon ?? ""}`}
                  alt=""
                />
                <div className="flex flex-col space-y-0 ml-2">
                  <span className="font-bold text-sm">{Title}</span>
                  <span className="text-xs flex gap-1">
                    <span className="text-xs">
                      {ConsoleName}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowAllGames;
