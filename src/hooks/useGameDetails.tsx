import { useQuery } from "react-query"
import { Game } from '../types/Game'

const fetchGame = ({queryKey}:any):Promise<Game> => {
    const gameId = queryKey[1]
    const raUser =  import.meta.env.VITE_RA_USER
    return fetch(`https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?z=${raUser}&y=${import.meta.env.VITE_RA_API_KEY}&u=${raUser}&g=${gameId}`)
    // return fetch('/game_detail.json')
    .then(res => res.json())
    .then(data => ({
        ...data,
        Achievements: Object.values(data.Achievements)
    }))
}

const useGameDetails = (gameID:string, onSuccess:((data:any)=>void), onError:(error:Error)=>void) => {
   return useQuery<Game, Error>(
        ['recent_games',gameID],
        fetchGame,
        {
            onSuccess,
            onError,
            staleTime: 1000 * 60 * 5 // 5 min
        }
    )

}

export default useGameDetails