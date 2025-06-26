function Navbar() {
  return (
    <div className="z-10 absolute top-[0%] w-full h-[8%] text-amber-50 px-4 lg:px-0">
      <div className="max-w-5xl mx-auto h-full flex justify-between items-center">
        <div className="logo">
          <a href="https://www.nysdev.com"
          >
          <p className="text-xl lg:text-3xl font-damion hover:scale-110 duration-300">NysDev</p>
          </a>
        </div>
        <div className="menu">
          <ul className="flex gap-8 opacity-70 text-md lg:text-xl font-concertOne">
            <a href="https://www.nysdev.com/">
              <li className="hover:scale-110 duration-300">Home</li>
            </a>
            <a href="https://github.com/ouyniya">
              <li className="hover:scale-110 duration-300">GitHub</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
