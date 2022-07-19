

// import { Link } from 'react-router-dom'

import useAllGames from '../hooks/useAllGames'


interface Props {
    onBack: Function;
    onSelected: Function;
    selectedGame: string;
}

const ShowAllGames = ({onBack,onSelected,selectedGame}:Props) => {

    const onError = (error: Error) => {
        // console.log("Something went wrong...", error)
    }

    const onSuccess = (data: any) => {
        // console.log("great! so, a sideeffect goes here", data)
    }

    const { data, isLoading, isError, error } = useAllGames(onSuccess, onError)

    if (isLoading) (<h2>Loading...</h2>)
    if (isError) (<h2>{error.message}</h2>)

    return (
        <div className='flex flex-col font-lexend pt-4 '>
          
               
                <div className='flex justify-between px-2 items-center w-full'>
                    <div className='flex space-x-2'>
                    <img onClick={() => onBack()} className='w-8 h-8 cursor-pointer' src="https://icongr.am/material/chevron-left.svg?size=32&color=000" alt="" />
                    <h2 className='text-xl'>All Games</h2>
                    </div>
                    {/* <span className='font-bold text-xs cursor-pointer' onClick={()=>onSelected('771')}>Show all</span> */}
                </div>
                <div className='space-y-1 px-2 pt-2'>
                    {
                        data?.map(({ GameID, Title, ConsoleName, ImageIcon }) => (
                          
                            <div key={GameID} className={`p-2 rounded-md cursor-pointer transition-all 200ms ease-out  ${selectedGame=== GameID ? 'text-white bg-black':'hover:bg-gray-100'}`} onClick={()=>onSelected(GameID)}>
                                    <div className='flex items-start'>
                                        <img className='w-12 h-12 rounded-md' src={`https://retroachievements.org${ImageIcon??''}`} alt="" />
                                        <div className='flex flex-col space-y-0 ml-2'>
                                            <span className='font-bold text-sm'>{Title}</span>
                                        </div>
                                    </div>
                            </div>
                        ))
                    }
                </div>
        </div>
    )
}



export default ShowAllGames