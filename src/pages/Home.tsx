import { useNavigate } from "react-router-dom"
import { MyDispatch, MySelector } from "../redux/store"
import { useDispatch } from "react-redux"
import { deleteFile, setCurrentFile } from "../redux/canvasSlice"
import fileIcon from "../assets/Folder.svg"
import { MdDeleteOutline } from "react-icons/md"
import { Box, Modal } from "@mui/material"
import { useState } from "react"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<MyDispatch>()
  const { allFiles } = MySelector((state) => state.canvas)

  const [deleteModalData, setDeleteModalData] = useState<{
    open: boolean
    id?: string
  }>({
    open: false,
  })

  return (
    <div className="text-themeDarkBlack dark:text-themeLightWhite flex flex-1">
      {allFiles ? (
        <div className="m-10 p-5 bg-themeLightWhite dark:bg-themeLightBlack rounded-xl w-full">
          <div className="grid grid-cols-4 text-black dark:text-white pb-3 mb-5 text-3xl font-semibold tracking-wide">
            <p>No</p>
            <p>File Name</p>
            <p>File Id</p>
            <p className="text-center">Delete file</p>
          </div>
          <div className="max-h-[70vh] overflow-y-scroll">
            {Array.isArray(allFiles) &&
              allFiles.map(
                (
                  af: { id: string; fileName: string; canvas?: string },
                  index: number
                ) => (
                  <div
                    className="grid grid-cols-4 text-xl text-[#8F8F8F] tracking-wide p-2 hover:text-purple-600 transition-all duration-150 ease-linear cursor-pointer border-b border-b-[#4A4A4A] last:border-none"
                    key={af.id}
                    onClick={() =>
                      dispatch(setCurrentFile({ id: af.id, navigate }))
                    }
                  >
                    <p>{index}</p>
                    <div className="flex items-center gap-2">
                      <img
                        src={fileIcon}
                        alt=""
                        className="h-[20px] w-[20px]"
                      />
                      <p>{af.fileName}</p>
                    </div>
                    <p>{af.id}</p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteModalData({ id: af.id, open: true })
                      }}
                      className="flex justify-center"
                    >
                      <MdDeleteOutline color="#9333ea" size={25} />
                    </div>
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

      <Modal
        open={deleteModalData.open}
        onClose={() => setDeleteModalData({ open: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            outline: "none",
            borderRadius: "8px",
          }}
        >
          <p className="text-2xl font-prosto text-center">
            Are you sure you want to <br /> Delete This File?
          </p>
          <button
            onClick={() => {
              dispatch(deleteFile(deleteModalData.id))
              setDeleteModalData({ open: false })
            }}
            className={
              "text-white mt-5 bg-purple-600 px-4 w-full py-2 rounded-lg text-xl"
            }
          >
            Delete
          </button>
        </Box>
      </Modal>
    </div>
  )
}

export default Home
