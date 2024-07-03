import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FC, FormEvent, useEffect, useState } from "react";

import GameDetails from "./GameDetails";
import { usePlayerInfo } from "../hooks/usePlayerInfo";
import ShowAllGames from "./ShowAllGames";
import { ConsolesCodesMap } from "../utils/ConsoleRepo";
import TextField from "../components/TextField";
import TrophyIcon from "../components/icons/TrophyIcon";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import UserData from "../types/UserData";
import { LoadingPage } from "../components/Loading";

dayjs.extend(relativeTime);

const Login: FC = () => {
  const [currentUser, setCurrentUser] = useLocalStorage<UserData | null>(
    "currentUser",
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("")

  //   const { data, error } = usePlayerInfo(currentUser as UserData,enabledUserVerify)
  useEffect(() => {
    setIsLoading(true);

    if (currentUser) {
      navigate("/home");
    }

    setIsLoading(false);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsVerifying(true)

    const formElements = [...event.currentTarget.elements];
    // await setEnabledUserVerify(true)
    // try {
    const userData = formElements
      .filter((i) => !!i.id)
      .reduce((prev, next) => {
        const elem = next as HTMLInputElement;
        return {
          ...prev,
          [elem.id]: elem.value,
        };
      }, {} as UserData);

    fetch(
      `https://retroachievements.org/API/API_GetUserSummary.php?z=${userData.userName}&y=${userData.apiKey}&u=${userData.userName}&g=0&a=0`
    )
      .then((response) => {
        if (response.ok) {
            setCurrentUser(userData);
            navigate(0)
        }  else {
            setError("Conection Error. Try again later.")
        }
      })
      .catch((e: Error) => {
        setError(e.name+" : "+e.message)
        throw new Error(e.message);
        
      })
      .finally(()=>{
        setIsVerifying(false)
      });
    
  }
  if (isLoading) {
    return<LoadingPage />;
  }

  return (
    <div className="flex font-lexend px-2 h-screen dark:bg-black items-center">
      <div className={"w-full min-w-1/3 md:w-1/3"}>
        <div className="flex justify-start gap-2 items-center mb-8">
          <TrophyIcon size={24} className="hover:rotate-12 transition-transform fill-black dark:fill-white" />
          <h2 className="text-xl dark:text-white">Turbocheevos</h2>
        </div>

        {/* <div> */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <TextField id="userName" label="Username" symbol="@" />
          <TextField id="apiKey" label="Api Key" symbol="Key" />
          {
            !!error && (
                <div className="text-red-500 border-2 border-red-500 p-2 rounded-lg flex justify-between" onClick={()=>setError("")}>
                    <span>{error}</span>
                    <span className="cursor-pointer" onClick={()=>setError("")}>x</span>
                </div>
            )
          }
          <button
            disabled={isVerifying}
            className="disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-400  disabled:cursor-not-allowed p-2 rounded-xl dark:bg-white cursor-pointer border-2 border-black flex justify-center gap-2 mt-4"
            type="submit"
          > {isVerifying ? "Loging in...":"Log In"}</button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-2">
        Get Your personal web API key at <a className="text-black" href="https://retroAchievements.org" target="_blank" rel="noopener">RetroAchievements.org</a>'s Settings page.
        </p>
        {/* </div> */}
      </div>
      <div className="hidden md:flex w-full justify-center items-center dark:text-white">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            Login Page
        </span>
      </div>
    </div>
  );
};

export default Login;
