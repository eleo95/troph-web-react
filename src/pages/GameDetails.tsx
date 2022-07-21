// import { useParams, useNavigate } from "react-router-dom"
import {useGameDetails} from "../hooks/useGameDetails"

interface Props {
    gameId: string;
    onBack: Function;
}

const GameDetails = ({ gameId, onBack }: Props) => {
    // const {gameId=''} = useParams()
    const onError = (error: Error) => {
        // console.log("Something went wrong...", error)
    }

    const onSuccess = (data: any) => {
        // console.log("great! so, a sideeffect goes here", data)
    }

    const { data, isLoading, isError, error } = useGameDetails(gameId, onSuccess, onError)
    // const navigate = useNavigate()
    if (isLoading) return (<h2>Loading...</h2>)
    if (isError) return (<h2>{error.message}</h2>)
    
    return <div>
        {/* <h2 onClick={()=>navigate(-1)}>Game Detail</h2> */}
        <div className='flex justify-start w-full py-4'>
            <img onClick={() => onBack()} className='w-8 h-8 cursor-pointer' src="https://icongr.am/material/close.svg?size=32&color=000" alt="" />
            <h1 className='text-2xl'>Game Details</h1>
        </div>
        {/* <h2 onClick={()=>onBack()}>Game Detail</h2> */}
        {/* <div className=''> */}
            <div className='flex pb-4'>
                {/* <img className='w-auto h-auto rounded-md ' src={userpic} alt="" /> */}
                <img className='w-auto h-24 rounded-md' src={`https://retroachievements.org${data?.ImageBoxArt??''}`} alt="" />
                <div className='ml-2'>
                    <h1 className='text-xl md:text-3xl font-bold'>{data?.Title}</h1>
                    <p className='text-sm md:text-md'>{data?.ConsoleName}</p>
                    <p className='text-sm md:text-md'>{data?.Developer}</p>
                    <p className='text-sm md:text-md'>{data?.Publisher}</p>
                </div>
            </div>
            <div className='flex justify-between'>
                <h1 className='text-xl'>Achievements</h1>
                <p>{data?.NumAwardedToUser + "/" + data?.NumAchievements}</p>
            </div>
            <div className="w-full  mb-4  bg-gray-200 rounded-full h-2 dark:bg-gray-300">
                <div className="bg-black h-2 rounded-full" style={{width: data?.UserCompletion}}></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                {
                    data?.Achievements.sort((a, b) => parseInt(a.DisplayOrder) - parseInt(b.DisplayOrder)).map(({ ID, Title, Description, BadgeName, DateEarned }) => {
                        return <div key={ID} id={ID} className={`p-2 rounded-md cursor-pointer transition-all 200ms ease-out hover:bg-gray-100`} onClick={() => { }}>
                            {/* <Link to={`/game/${GameID}`}> */}
                            <div className='flex items-start'>
                                {/* <img className='w-12 h-12 rounded-md ' src={userpic} alt="" /> */}
                                <img className='w-12 h-12 rounded-md ' src={`https://s3-eu-west-1.amazonaws.com/i.retroachievements.org/Badge/${BadgeName}${DateEarned ? '':'_lock'}.png`} alt="" />
                                <div className='flex flex-col space-y-0 ml-2'>
                                    <span className='font-bold text-sm'>{Title}</span>
                                    <p className='text-xs'>{Description}</p>
                                </div>
                            </div>
                            {/* </Link> */}
                        </div>
                    })
                }
            </div>

        </div>
    // </div>
}

export default GameDetails