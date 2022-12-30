const GameDetailsLoading = () => {
  return (
    <div>
      <div className="flex justify-start w-full py-4 animate-pulse">
        <img
          className="w-8 h-8 cursor-pointer "
          src="https://icongr.am/material/close.svg?size=32&color=ffffff"
          alt=""
        />
        <h1 className="text-2xl">Game Details</h1>
      </div>
      <div className="flex pb-4 animate-pulse">
        <div className="w-24 h-24 rounded-md bg-gray-500 flex justify-center items-center">
          <img
            className="w-16 h-16 cursor-pointer "
            src="https://icongr.am/material/gamepad-variant-outline.svg?size=148&color=ffffff"
            alt=""
          />
        </div>
        <div className="flex flex-col ml-2 gap-1">
          <div className="w-64 h-8 rounded-md bg-gray-400" />
          <div className="w-24 h-4 rounded-md bg-gray-300" />
          <div className="w-20 h-4 rounded-md bg-gray-300" />
          <div className="w-20 h-4 rounded-md bg-gray-300" />
        </div>
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl">Achievements</h1>
        {/* <p>{data?.NumAwardedToUser + "/" + data?.NumAchievements}</p> */}
      </div>

      <div className="w-full  mb-4  bg-gray-200 rounded-full h-2 dark:bg-gray-300 animate-pulse">
        {/* <div className="bg-black h-2 rounded-full" style={{width: data?.UserCompletion}}></div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-pulse">
        {Array.from([0, 1, 3, 4, 5, 6]).map((e) => {
          return (
            <div
              key={"key_" + e}
              id={"id_" + e}
              className={`p-2 rounded-md bg-gray-100`}
              onClick={() => {}}
            >
              {/* <Link to={`/game/${GameID}`}> */}
              <div className="flex items-start  w-full">
                {/* <img className='w-12 h-12 rounded-md ' src={userpic} alt="" /> */}
                <div className="w-12 h-12 rounded-md bg-gray-300" />
                <div className="flex flex-col gap-2 ml-2 w-full">
                  <div className="w-48 h-4 rounded-md bg-gray-400" />
                  <div className="w-full h-2 rounded-md bg-gray-300" />
                  <div className="w-36 h-2 rounded-md bg-gray-300" />
                </div>
              </div>
              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameDetailsLoading;
