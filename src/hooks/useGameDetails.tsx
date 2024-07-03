import { useQuery } from "@tanstack/react-query"
import { GameType } from '../types/Game'
import UserData from "../types/UserData"

const fetchGame = ({queryKey}:any):Promise<GameType> => {
    const gameId = queryKey[1]
    const user=queryKey[2] as UserData
    // const raUser =  import.meta.env.VITE_RA_USER
    return fetch(`https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?z=${user.userName}&y=${user.apiKey}&u=${user.userName}&g=${gameId}`)
    // return fetch(`https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?z=${user.}&y=${import.meta.env.VITE_RA_API_KEY}&u=${raUser}&g=${gameId}`)
    // return fetch('/game_detail.json')
    .then(res => res.json())
    .then(data => { 
        console.log("hahahha",data)
        return {
            ...data,
            Achievements: Object.values(data.Achievements)
        }
    })
}

export const useGameDetails = (user:UserData, gameID:string, onSuccess:((data:any)=>void), onError:(error:Error)=>void) => {
   return useQuery<GameType, Error>(
        {
            queryKey:[`game_detail_${gameID}`,gameID, user],
            queryFn: fetchGame,
            staleTime: 1000 * 60 * 10 // 5 min
        }
    )

}