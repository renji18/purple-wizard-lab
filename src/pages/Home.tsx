import { useNavigate } from "react-router-dom"

const Home = ({
  allFiles,
}: {
  allFiles: Array<{ id: string; fileName: string }> | null | undefined
}) => {
  const navigate = useNavigate()

  return (
    <div className="text-themeDarkBlack dark:text-themeLightWhite flex flex-1">
      {allFiles ? (
        <div className="m-10 p-5 border-2 border-purple-500 w-full">
          <div className="grid grid-cols-2 border-b border-b-purple-500 pb-3 mb-5 text-center text-3xl font-semibold tracking-wide">
            <p>File Id</p>
            <p>File Name</p>
          </div>
          {Array.isArray(allFiles) &&
            allFiles.map((af) => (
              <div
                className="grid grid-cols-2 text-center text-2xl tracking-wide py-2 hover:text-purple-600 transition-all duration-150 ease-linear cursor-pointer"
                key={af.id}
                onClick={() => navigate(`/canvas/${af.id}`)}
              >
                <p>{af.id}</p>
                <p>{af.fileName}</p>
              </div>
            ))}
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
