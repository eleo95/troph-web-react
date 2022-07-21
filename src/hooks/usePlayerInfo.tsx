import { useQuery } from "react-query"
import { PlayerInfo } from '../types/gameInfo'

const fetchRcentGames = () => {
    const raUser =  import.meta.env.VITE_RA_USER
    return fetch(`https://retroachievements.org/API/API_GetUserSummary.php?z=${raUser}&y=${import.meta.env.VITE_RA_API_KEY}&u=${raUser}&g=5&a=5`)
    //return fetch('user_summary.json')
        .then(res => res.json())
        .then(data => ({
            ...data,
            UserID: data.LastActivity.User
        }))
}
    

export const usePlayerInfo = (onSuccess: ((data: any) => void), onError: (error: Error) => void) => {
    return useQuery<PlayerInfo, Error>(
        'recent_games',
        fetchRcentGames,
        {
            onSuccess,
            onError,
            staleTime: 1000 * 60 // 60s
        }
    )

}

