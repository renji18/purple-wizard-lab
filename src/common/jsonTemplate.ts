import { toast } from "sonner"

export interface jsonObjectInterface {
  labName: string
  providerType: string
  // infrastructure: {}
  // machines: []
}

const createJsonObject = (data: {
  fileName: string
  id: string
  server?: string
  canvas?: any
}) => {
  if (data.server) {
    if (Array.isArray(data.canvas) && data.canvas?.length > 0) {
      const jsonObject: jsonObjectInterface = {
        labName: data.fileName,
        providerType: data.server,
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
