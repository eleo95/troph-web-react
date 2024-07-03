

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