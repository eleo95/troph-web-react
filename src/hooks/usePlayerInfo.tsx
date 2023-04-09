import { useQuery } from "react-query"
import { PlayerInfo } from '../types/gameInfo'
import UserData from "../types/UserData"

const fetchRcentGames = ({queryKey}:any) => {
    const user = queryKey[1] as UserData
    if(!user) return Promise.reject('No User/Apikey registered!')
    // const raUser =  import.meta.env.VITE_RA_USER
    // return fetch(`https://retroachievements.org/API/API_GetUserSummary.php?z=${raUser}&y=${import.meta.env.VITE_RA_API_KEY}&u=${raUser}&g=5&a=5`)
    return fetch(`https://retroachievements.org/API/API_GetUserSummary.php?z=${user.userName}&y=${user.apiKey}&u=${user.userName}&g=5&a=5`)
    // return fetch('user_summary.json')
        .then(res => res.json())
        .then(data => ({
            ...data,
            UserID: data.LastActivity.User
        })).catch((e)=>{
            throw Error('Wrong User or key!')
        })
}
    

export const usePlayerInfo = (user:UserData, onSuccess?: ((data: any) => void), onError?: (error: Error) => void) => {
 
    return useQuery<PlayerInfo, Error>(
        ['player_info', user],
        fetchRcentGames,
        {
            onSuccess,
            onError,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 // 60s
        }
    )

}

