import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative h-[calc(100vh-6px)] w-full overflow-hidden"> 
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "url('src/assets/home-wallpaper.png')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(40%)' }}>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <p className="font-round text-sky-100 text-4xl md:text-6xl text-center">Welcome to PowerPlay!</p>
        <p className="mt-0.5 font-round text-sky-100 text-lg md:text-xl text-center">Empower Your Tech Experience.</p>
        <Link className="bg-sky-100 mt-5 md:mt-7 font-round px-5 md:px-7 py-2 md:py-3 rounded-md text-sky-950 font-bold tracking-wider" to={"/catalog"}>GO TO PRODUCTS</Link>
      </div>
    </div>
  );
}
