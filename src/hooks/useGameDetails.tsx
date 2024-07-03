import { useQuery } from "@tanstack/react-query";
import { GameType } from "../types/Game";
import UserData from "../types/UserData";

const fetchGame = (gameId: number, user: UserData): Promise<GameType> => {
  // const raUser =  import.meta.env.VITE_RA_USER
  return (
    fetch(
      `https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?z=${user.userName}&y=${user.apiKey}&u=${user.userName}&g=${gameId}`
    )
      // return fetch(`https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?z=${user.}&y=${import.meta.env.VITE_RA_API_KEY}&u=${raUser}&g=${gameId}`)
      // return fetch('/game_detail.json')
      .then((res) => res.json())
      .then((data) => {
        // console.log("hahahha", data);
        return {
          ...data,
          Achievements: Object.values(data.Achievements),
        };
      })
  );
};

export const useGameDetails = (user: UserData, gameID: number) => {
  return useQuery<GameType, Error>({
    queryKey: ["game_detail", gameID],
    queryFn: () => fetchGame(gameID, user),
    staleTime: 1000 * 60 * 10, // 5 min
  });
};
