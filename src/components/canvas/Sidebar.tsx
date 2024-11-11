import openIcon from "../../assets/open.svg"

const Sidebar = ({
  open,
  closeSidebar,
  serverData,
  selectedServer,
  openSidebar,
  appendToWhiteBoard,
}: {
  open: boolean
  closeSidebar: () => void
  serverData: Array<{
    name: string
    components: Array<{
      name: string
      content: Array<{ name: string; shape: string }>
    }>
  }>
  selectedServer: string
  openSidebar: () => void
  appendToWhiteBoard: (arg1: string, arg2: string) => void
}) => {
  return (
    <div className="absolute flex justify-center items-center right-0 h-full">
      <div
        className={`bg-themeDarkWhite dark:bg-themeLightBlack h-[80%] max-h-[80%] rounded-l-full border-r border-r-black dark:border-r-white flex justify-center items-center px-1.5 cursor-pointer ${
          open ? "" : "hidden"
        }`}
        onClick={closeSidebar}
      >
        <img src={openIcon} className="rotate-180 origin-center" alt="" />
      </div>
      <div
        className={`bg-themeDarkWhite dark:bg-themeLightBlack h-[80%] max-h-[80%] overflow-y-scroll ${
          open ? "rounded-none w-full px-6 py-3" : "w-10 rounded-l-full"
        }`}
      >
        {open ? (
          <div>
            <p className="text-center text-4xl font-semibold">Components</p>
            <div className="my-5">
              {serverData
                ?.find((d) => d.name === selectedServer)
                ?.components.map((sdc, indx1) => (
                  <div className="mb-5" key={indx1}>
                    <p className="text-xl font-medium mb-2">{sdc?.name}</p>
                    <div className="space-y-3">
                      {sdc?.content?.map((sdcc, indx2) => (
                        <p
                          onClick={() =>
                            appendToWhiteBoard(sdcc.shape, sdcc.name)
                          }
                          key={indx2}
                          className="px-3 py-2 border border-purple-500 rounded-lg"
                        >
                          {sdcc?.name}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div
            className="h-full w-full flex justify-center items-center cursor-pointer"
            onClick={openSidebar}
          >
            <img src={openIcon} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
