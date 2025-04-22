import { cn } from "../utils/cn";

interface Props {
  open: boolean;
  setOpen: () => void;
}

export default function TabSwitcher({ open, setOpen }: Props) {
  return (
    <div className="flex flex-1 h-full justify-around my-2">
      <button
        onClick={setOpen}
        className={cn(
          "my-2",
          open
            ? "border-b-2 border-b-black text-black"
            : "border-b-2 border-transparent text-gray-400"
        )}
      >
        Profile
      </button>
      <button
        onClick={setOpen}
        className={cn(
          "my-2",
          !open
            ? "border-b-2 border-b-black text-black"
            : "border-b-2 border-transparent text-gray-400"
        )}
      >
        Search
      </button>
    </div>
  );
}
