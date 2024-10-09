import { useEffect, useState } from "react";

const DailogueBox = ({readOut})=>{

  const [allcommands ,setcommand] = useState([]);
 const arr = [
  "open Mail/gmail",
  "open LinkedIn profile",
  "open Internshala",
  "open Facebook",
  "open Instagram",
  "open github profile",
  "open YouTube",
  "open Google",
  "what is (you quistion)",
  "open Google Maps",
  "play (thing you watch in youtube)",
 ]

 useEffect(()=>{
setcommand(arr);
readOut("here is the commands")
 },[])

  return(
    <>
     <div class="bg-card rounded-lg p-4 shadow-md dialogue ">
        <h2 class="text-lg font-semibold mb-2" style={{marginLeft:'390px',marginBottom:"20px"}}>COMMANDS</h2>
        <div class=" command-box">
          {allcommands.map((data)=>(
          <div class="flex items-start items-center gap-3 command-text">
            <span class="relative flex overflow-hidden rounded-full w-8 h-8 shrink-0">
              <span class="flex h-full w-full items-center  justify-center rounded-full bg-muted"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUrSl1xKnymFK6ynCCGnja--KmhjW_Spnrw&s" alt="" /></span>
            </span>
            <div class="flex-1 bg-muted rounded-lg p-3">
              <p>{data}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DailogueBox;