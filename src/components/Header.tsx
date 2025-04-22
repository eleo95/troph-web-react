import { useNavigate } from "react-router-dom";
import TrophyIcon from "./icons/TrophyIcon";

export default function Header() {
  const navigate = useNavigate();

  function clearUser() {
    window.localStorage.removeItem("currentUser");
    navigate("/home", { replace: true });
  }
  return (
    <div className="flex justify-start gap-2 items-center mt-4">
      <TrophyIcon size={24} className="hover:rotate-12 transition-transform" />
      <h2 className="text-xl">Turbocheevos</h2>
      <div className="flex-1"></div>
      <form
        onSubmit={clearUser}
        className="border-2 border-black px-2 rounded-full"
      >
        <button type="submit">Log Out</button>
      </form>
    </div>
  );
}
