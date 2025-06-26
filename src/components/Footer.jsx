function Footer() {
  return (
    <div className="z-10 absolute bottom-[25px] mx-auto w-screen text-amber-100/50 antialiased text-sm">
        <div className="flex justify-center items-center gap-2">
        <p>Made by</p>
        <span className="font-damion text-lg">{" NysDev "}</span>
        <span>{"at"}</span>
        <span><a href="https://www.nysdev.com/">nysdev.com</a></span>

        </div>
    </div>
  )
}
export default Footer