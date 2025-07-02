import { Card } from "../components/card";
import { ColorGroup } from "../components/color-group";
import { useRef, useState } from "react";

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
  // const [noteValue, setNoteValue] = useState("")
  // console.log(noteData);

  const handleMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (!stickyDivRef.current) return;
    const stickyRect = stickyDivRef.current.getBoundingClientRect();

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
    // console.log(newX, newY)

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
    // console.log(id, evt)
    setNoteData((prevNoteData) => [
      ...prevNoteData,
      {
        id,
        noteDivColor: {
          headerColor,
          bodyColor,
        },
        noteDivPosition: {
          positionX: evt.clientX - divPosition.current.x,
          positionY: evt.clientY - divPosition.current.y,
        },
        noteData: "hard core data",
      },
    ]);
  };
  const handleOnChange =(evt)=>{
    // setNoteData(evt.target.value)   
    const {name, value} = evt.target; 
    setNoteData((prevData)=>({...prevData, [name]: value}))
  }
  // console.log(noteData.noteDivPosition.positionX, noteData.noteDivPosition.positionY)

  // useEffect(() => {
  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, []);

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
          // console.log(data);
          // console.log(data.noteData)
          return (
            <Card
              key={data.id}
              position={position}
              stickyDivRef={stickyDivRef}
              handleMouseDown={handleMouseDown}
              cardColor={data.noteDivColor}
              noteData={data.noteData}
              handleOnChange = {handleOnChange}
            />
            // <h1>hello</h1>
          );
        })}
        {/* <Card
          position={position}
          stickyDivRef={stickyDivRef}
          handleMouseDown={handleMouseDown}
        /> */}
      </div>
    </div>
  );
};
