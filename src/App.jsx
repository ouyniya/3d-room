import "./App.css";
import ThreeDHome from "./components/3DHome";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Song from "./components/Song";

function App() {
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <Navbar />
        <div className="absolute w-full h-full overflow-hidden">
          {/* main */}
          <div className="mx-auto w-[100%] h-[100%]">
            <ThreeDHome />
          </div>

          {/* menu */}
          <Menu />

          {/* background */}
          <div className="-z-50 opacity-80 absolute bottom-0 left-[50%] -translate-x-1/2 w-[150%] h-full bg-radial-[at_50%_50%] from-[#0b0301] to-[#2e150c] to-80%"></div>
          <div className="-z-51 absolute bottom-[0%] left-[50%] -translate-x-1/2 w-[100%] h-full"></div>
        </div>

        {/* Footer */}
        <Footer />

        <Song />
      </div>
    </>
  );
}

export default App;
