import { useNavigate } from "react-router-dom"
import { MyDispatch, MySelector } from "../redux/store"
import { useDispatch } from "react-redux"
import { setCurrentFile } from "../redux/canvasSlice"
import fileIcon from "../assets/Folder.svg"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<MyDispatch>()
  const { allFiles } = MySelector((state) => state.canvas)

  return (
    <div className="text-themeDarkBlack dark:text-themeLightWhite flex flex-1">
      {allFiles ? (
        <div className="m-10 p-5 bg-themeLightWhite dark:bg-themeLightBlack rounded-xl w-full">
          <div className="grid grid-cols-3 text-black dark:text-white pb-3 mb-5 text-3xl font-semibold tracking-wide">
            <p>No</p>
            <p>File Name</p>
            <p>File Id</p>
          </div>
          <div className="max-h-[70vh] overflow-y-scroll">
            {Array.isArray(allFiles) &&
              allFiles.map(
                (
                  af: { id: string; fileName: string; canvas?: string },
                  index: number
                ) => (
                  <div
                    className="grid grid-cols-3 text-xl text-[#8F8F8F] tracking-wide p-2 hover:text-purple-600 transition-all duration-150 ease-linear cursor-pointer border-b border-b-[#4A4A4A] last:border-none"
                    key={af.id}
                    onClick={() =>
                      dispatch(setCurrentFile({ id: af.id, navigate }))
                    }
                  >
                    <p>{index}</p>
                    <div className="flex items-center gap-2">
                      <img src={fileIcon} alt="" className="h-[20px] w-[20px]" />
                      <p>{af.fileName}</p>
                    </div>
                    <p>{af.id}</p>
                  </div>
                )
              )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-1">
          <p className="text-4xl">No Files Yet</p>
        </div>
      )}
    </div>
  )
}

export default Home
