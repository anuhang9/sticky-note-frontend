import { Card } from "../components/card";
import { ColorGroup } from "../components/color-group";
import { useEffect, useRef, useState } from "react";

interface DynamicDivColor {
  headerColor: string;
  bodyColor: string;
}

interface DynamicDivPosition {
  positionX: string;
  positionY: string
}

interface NoteFormat {
  id: string;
  noteDivColor: DynamicDivColor;
  noteDivPosition: DynamicDivPosition;
  noteData: string
}

interface handleclickToAddNoteFormat{
  id: string;
  headerColor: string;
  bodyColor: string;
}

export const Home = () => {
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const divPosition = useRef({ x: 0, y: 0 });
  const stickyDivRef = useRef<HTMLDivElement>(null);
  const parentDiv = useRef<HTMLDivElement>(null);
  const [noteData, setNoteData] = useState<NoteFormat[]>([]);
  const [writtenNote, setWrittenNote] = useState("")

  const handleMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (!stickyDivRef.current) return;
    const stickyRect = stickyDivRef.current.getBoundingClientRect()
    const headerHight = 26;

    const draggablePart =
      evt.clientY >= stickyRect.top &&
      evt.clientY <= stickyRect.top + headerHight;

    if (draggablePart) {
      divPosition.current = {
        x: evt.clientX - position.x,
        y: evt.clientY - position.y,
      };
      if (stickyDivRef.current) {
        stickyDivRef.current.style.cursor = "grab";
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseMove = (evt: MouseEvent) => {
    if (!parentDiv.current || !stickyDivRef.current) return;

    const parentRect = parentDiv.current.getBoundingClientRect();
    const stickyRect = stickyDivRef.current.getBoundingClientRect();

    // Get raw position
    let newX = evt.clientX - divPosition.current.x;
    let newY = evt.clientY - divPosition.current.y;

    const marginX = 16;
    const marginY = 16;
    // Clamp to parent edges
    newX = Math.max(
      -marginX,
      Math.min(newX, parentRect.width - stickyRect.width - marginX)
    );
    newY = Math.max(
      -marginY,
      Math.min(newY, parentRect.height - stickyRect.height - marginY)
    );

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleMouseUp = () => {
    if (stickyDivRef.current) {
      stickyDivRef.current.style.cursor = "auto";
    }
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleclickToAddNote = ({id, headerColor, bodyColor}: handleclickToAddNoteFormat, evt) => {
    setNoteData((prevNoteData) => [
      ...prevNoteData,
      {
        id,
          headerColor,
          bodyColor,
      },
    ]);
  };
  const handleOnChange =(evt: React.ChangeEvent)=>{
    setWrittenNote(evt.target.value)
  }
  // if()
  localStorage.setItem("notes", writtenNote)
  let getnote = localStorage.getItem("notes")
  setWrittenNote(getnote)

  console.log(writtenNote)

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="absolute top-0 gap-10 p-10 min-h-screen w-full flex items-center justify-center">
      <div className=" w-32 flex items-center">
        <ColorGroup handleclickToAddNote={handleclickToAddNote} />
      </div>
      <div
        ref={parentDiv}
        className=" w-[calc(100vw-128px)] h-[calc(100vh-80px)] relative"
      >
        {noteData.map((data) => {
          return (
            <Card
              key={data.id}
              position={position}
              stickyDivRef={stickyDivRef}
              handleMouseDown={handleMouseDown}
              headerColor={data.headerColor}
              bodyColor ={data.bodyColor}
              noteData={writtenNote}
              handleOnChange = {handleOnChange}
            />
          );
        })}
















      </div>
    </div>
  );
};
