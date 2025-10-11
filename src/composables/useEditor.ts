import { DialogButtonsType, DialogResponse, useDialog } from "./useDialog"
import { useSafeLock } from "./useSafeLock"

export const useEditor = () => {

  const {unlock, isLocked} = useSafeLock()
  const {openDialog} = useDialog()

  const safeExit = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      if (isLocked()) {
        openDialog('common.exit', 'common.exitConfirm', DialogButtonsType.YES_NO).then(response => {
          if (response === DialogResponse.YES) {
            unlock()
            resolve(true)
          } else {
            resolve(false)
          }
        })
      } else {
        resolve(true)
      }
    })
  }

  return {safeExit}
}