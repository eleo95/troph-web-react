import { useQuery } from "@tanstack/react-query"
import { PlayerInfo } from '../types/gameInfo'
import UserData from "../types/UserData"

const fetchRcentGames = (user: UserData) => {
    // const user = user as UserData
    if(!user) return Promise.reject('No User/Apikey registered!')
    // const raUser =  import.meta.env.VITE_RA_USER
    // return fetch(`https://retroachievements.org/API/API_GetUserSummary.php?z=${raUser}&y=${import.meta.env.VITE_RA_API_KEY}&u=${raUser}&g=5&a=5`)
    return fetch(`https://retroachievements.org/API/API_GetUserSummary.php?z=${user.userName}&y=${user.apiKey}&u=${user.userName}&g=5&a=5`)
    // return fetch('user_summary.json')
        .then(res => res.json())
        .then(data => ({
            ...data,
            UserID: data.LastActivity.User
        })).catch(()=>{
            throw Error('Wrong User or key!')
        })
}
    

export const usePlayerInfo = (user:UserData) => {
 
    return useQuery<PlayerInfo, Error>({
        queryKey: ['player_info'],
        queryFn: () =>fetchRcentGames(user),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 // 60s
    })

}

