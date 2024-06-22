import { Link } from "react-router-dom";

export default function Home() {

  return <div>
    <div className="fixed w-dvw">
        <img src="src/assets/home-wallpaper.png" className="w-full h-full brightness-[40%]"></img>
        
    </div>
    <div className="fixed w-full h-full flex flex-col justify-center items-center overflow-clip">
        <p className="font-round text-sky-100 text-6xl">Welcome to PowerPlay!</p>
        <p className="mt-0.5 font-round text-sky-100 text-xl">Empower Your Tech Experience.</p>
        <Link className="bg-sky-100 mt-7 font-round px-7 py-3 rounded-md text-sky-950 font-bold tracking-wider" to={"/catalog"}>GO TO PRODUCTS</Link>
    </div>
  </div>;
}