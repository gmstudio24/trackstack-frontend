import { useAlert } from "./useAlert"

const {add} = useAlert();
export const useError = (message: string, onClose?: () => void) => {
  add({
    title: 'error',
    message: message,
    type: 'error',
    onClose: onClose
  })
}