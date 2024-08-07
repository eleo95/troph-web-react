import { useQuery } from "@tanstack/react-query"
import { GameInfo } from "../types/gameInfo"
import UserData from "../types/UserData"

const fetchGame = (user:UserData):Promise<GameInfo[]> => {
    // const raUser =  import.meta.env.VITE_RA_USER
    // const user = queryKey[1] as UserData
    return fetch(`https://retroachievements.org/API/API_GetUserCompletedGames.php?z=${user.userName}&y=${user.apiKey}&u=${user.userName}`)
    // return fetch('/game_detail.json')
    .then(res => res.json())
}

export const useAllGames = (user: UserData) => {
   return useQuery<GameInfo[], Error>(
       {
        queryKey: ['all_games',user],
        queryFn: () => fetchGame(user),
        staleTime: 1000 * 60 * 5 // 5 min
       }
    )

}