// import { FC } from "react"

// const Loading:FC<{className?:string}> = ({className="w-full h-screen flex justify-center items-center"}) => {
//     return (
//        <div className={className}>
//          <div className="bg-black w-24 h-24 flex justify-center items-center rounded-full">
//         <div className="w-full h-8 animate-spin">
//           <div className="bg-white h-8 w-8 rounded-full">
//           </div>
//         </div>
//       </div>
//        </div>
//     )
// }

// export default Loading


import React from "react";
import TrophyIcon from "./icons/TrophyIcon";

const LoadingInternal = (props: { size?: number }) => {
  const size = props.size ?? 24;
  return (
    <TrophyIcon className="animate-spin" size={size}/>
  );
};

export const LoadingSpinner = React.memo(LoadingInternal);

const LoadingPageInternal = () => (
  <div className="absolute flex top-0 right-0 h-screen w-screen items-center justify-center">
    <LoadingInternal size={128} />
  </div>
);

export const LoadingPage = React.memo(LoadingPageInternal);