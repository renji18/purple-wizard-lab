import openIcon from "../../assets/open.svg"
import componentIcon from "../../assets/Chart.svg"

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
      content: Array<{ name: string; shape: string; dependsOn?: string }>
    }>
  }>
  selectedServer: string
  openSidebar: () => void
  appendToWhiteBoard: (arg1: string, arg2: string, arg3?: string) => void
}) => {
  return (
    <div className="absolute flex justify-center items-center right-0 h-full">
      <div
        className={`bg-themeDarkWhite dark:bg-themeLightBlack h-[65%] max-h-[65%] rounded-l-2xl flex justify-center items-center px-1.5 cursor-pointer ${
          open ? "" : "hidden"
        }`}
        onClick={closeSidebar}
      >
        <img src={openIcon} className="rotate-180 origin-center" alt="" />
      </div>
      <div
        className={`bg-themeDarkWhite dark:bg-themeLightBlack h-[65%] max-h-[65%] overflow-y-scroll ${
          open ? "w-full pr-3 py-5 rounded-r-2xl" : "w-10 rounded-2xl"
        }`}
      >
        {open ? (
          <div>
            <p className="text-center text-2xl font-medium">Components</p>
            <div className="my-5">
              {serverData
                ?.find((d) => d.name === selectedServer)
                ?.components.map((sdc, indx1) => (
                  <div className="mb-5" key={indx1}>
                    <p className="text-2xl font-semibold mb-2">{sdc?.name}</p>
                    <div className="space-y-3">
                      {sdc?.content?.map((sdcc, indx2) => (
                        <div
                          className="flex items-center border-b border-b-[#4A4A4A] last:border-none"
                          onClick={() =>
                            appendToWhiteBoard(
                              sdcc.shape,
                              sdcc.name,
                              sdcc.dependsOn
                            )
                          }
                          key={indx2}
                        >
                          {indx1 === 0 && (
                            <img
                              src={componentIcon}
                              alt=""
                              className="h-[20px] w-[20px]"
                            />
                          )}
                          <p className="p-2 tracking-wide">{sdcc?.name}</p>
                        </div>
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
