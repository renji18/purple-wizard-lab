import { useNavigate } from "react-router-dom"
import { MyDispatch, MySelector } from "../redux/store"
import { useDispatch } from "react-redux"
import { setCurrentFile } from "../redux/canvasSlice"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<MyDispatch>()
  const { allFiles } = MySelector((state) => state.canvas)

  return (
    <div className="text-themeDarkBlack dark:text-themeLightWhite flex flex-1">
      {allFiles ? (
        <div className="m-10 p-5 border-2 border-purple-500 w-full">
          <div className="grid grid-cols-2 border-b border-b-purple-500 pb-3 mb-5 text-center text-3xl font-semibold tracking-wide">
            <p>File Id</p>
            <p>File Name</p>
          </div>
          {Array.isArray(allFiles) &&
            allFiles.map(
              (af: { id: string; fileName: string; canvas?: string }) => (
                <div
                  className="grid grid-cols-2 text-center text-2xl tracking-wide py-2 hover:text-purple-600 transition-all duration-150 ease-linear cursor-pointer"
                  key={af.id}
                  onClick={() =>
                    dispatch(setCurrentFile({ id: af.id, navigate }))
                  }
                >
                  <p>{af.id}</p>
                  <p>{af.fileName}</p>
                </div>
              )
            )}
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
