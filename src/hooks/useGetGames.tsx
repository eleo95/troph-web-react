import { useQuery } from "@tanstack/react-query";
import { GameInfo, GameInfoAlt } from "../types/gameInfo";
import UserData from "../types/UserData";

const fetchGames = (
  consoleId: number,
  user?: UserData
): Promise<GameInfo[] | GameInfoAlt[]> => {
  // const raUser =  import.meta.env.VITE_RA_USER
  // const user = queryKey[1] as UserData
  if (!user) throw Error("User creds not found!");
  return (
    fetch(
      `https://retroachievements.org/API/API_GetGameList.php?z=${user.userName}&y=${user.apiKey}&i=${consoleId}&f=1`
    )
      // return fetch('/game_detail.json')
      .then((res) => res.json())
  );
};

export const useGetGames = (
  consoleId: number,
  enabled: boolean,
  user?: UserData
) => {
  return useQuery<GameInfo[] | GameInfoAlt[], Error>({
    queryKey: [`get_games_${consoleId}`, user],
    queryFn: () => fetchGames(consoleId, user),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    enabled,
  });
};
