import { FC } from "react";

interface IconProps {
    size?: number;
    color?: string;
    className?: string;
}

const TrophyIcon:FC<IconProps> = ({size,color,className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size??"148"}
      height={size??"148"}
      fill={color??"currentColor"}
      version="1.1"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M18 2c-.9 0-2 1-2 2H8c0-1-1.1-2-2-2H2v9c0 1 1 2 2 2h2.2c.4 2 1.7 3.7 4.8 4v2.08C8 19.54 8 22 8 22h8s0-2.46-3-2.92V17c3.1-.3 4.4-2 4.8-4H20c1 0 2-1 2-2V2h-4M6 11H4V4h2v7m14 0h-2V4h2v7z"></path>
    </svg>
  );
}

export default TrophyIcon;