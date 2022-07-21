import { useQuery } from "react-query"
import { GameInfo } from "../types/gameInfo"

const fetchGame = ():Promise<GameInfo[]> => {
    const raUser =  import.meta.env.VITE_RA_USER
    return fetch(`https://retroachievements.org/API/API_GetUserCompletedGames.php?z=${raUser}&y=${import.meta.env.VITE_RA_API_KEY}&u=${raUser}`)
    // return fetch('/game_detail.json')
    .then(res => res.json())
}

export const useAllGames = ( onSuccess:((data:any)=>void), onError:(error:Error)=>void) => {
   return useQuery<GameInfo[], Error>(
        ['all_games'],
        fetchGame,
        {
            onSuccess,
            onError,
            staleTime: 1000 * 60 * 5 // 5 min
        }
    )

}