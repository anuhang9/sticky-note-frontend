import type { RefObject } from "react";

interface Position {
  x: number,
  y: number
}
interface PropsHome {
  position: Position,
  handleMouseDown: (evt: React.MouseEvent<HTMLDivElement>)=>void,
  stickyDivRef: RefObject<HTMLDivElement  | null>
}
export const Card = ({position, handleMouseDown, stickyDivRef}:PropsHome) => {
  return (
    <div
      className="m-4 bg-red-400 rounded-t-md w-52"
      style={{
        position: "absolute",
        zIndex: "1",
        top: position.y,
        left: position.x,
      }}
      onMouseDown={handleMouseDown}
      ref={stickyDivRef}
    >
      <button className="relative -right-45 m-2 -top-1 cursor-pointer font-bold">
        X
      </button>
      <textarea className="bg-red-200 w-52 -my-3 rounded-b-md min-h-52 resize-none focus:outline-none font-mono p-2 text-sm"></textarea>
    </div>
  );
};
