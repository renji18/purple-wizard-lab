import { toast } from "sonner"
import componentsObj, { componentsObjTemplate } from "./componentsObj"

export interface jsonObjectInterface {
  labName: string
  providerType: string
  machines: Array<componentsObjTemplate>
  // infrastructure: {}
}

const createJsonObject = (data: {
  fileName: string
  id: string
  server?: string
  canvas?: any
}) => {
  if (data.server) {
    if (Array.isArray(data.canvas) && data.canvas?.length > 0) {
      const filterDeletedOrShapes = data?.canvas?.filter(
        (co) => !co?.isDeleted && co?.type === "text"
      )

      const machineData: Array<componentsObjTemplate> = []

      filterDeletedOrShapes?.forEach((obj1) => {
        const match = componentsObj?.find(
          (obj2) => obj1.originalText === obj2.name
        )
        if (match) machineData.push(match)
      })

      const jsonObject: jsonObjectInterface = {
        labName: data.fileName,
        providerType: data.server,
        machines: machineData,
      }

      return JSON.stringify(jsonObject)
    } else {
      toast.error("Please Edit the Canvas to Export Something")
      return false
    }
  } else {
    toast.error("No Server Selected")
    return false
  }
}

export default createJsonObject
