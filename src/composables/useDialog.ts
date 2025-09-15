export enum DialogButtonsType {
  OK = "ok",
  YES_NO = "yes-no",
  YES_NO_CANCEL = "yes-no-cancel",
}

export enum DialogResponse {
  OK = "ok",
  YES = "yes",
  NO = "no",
  CANCEL = "cancel",
}

export type dialogHandler = (
  title: string,
  message: string,
  buttons: DialogButtonsType,
  resolve: (response: DialogResponse) => any
) => any;

let handler: dialogHandler | null = null;

export function useDialog() {
  const openDialog = async (
    title: string,
    message: string,
    buttons: DialogButtonsType = DialogButtonsType.OK
  ) => {
    if (handler === null) {
      throw new Error("No dialog handler registered");
    } 

    const promise = new Promise<DialogResponse>((resolve) => {
      handler!(title, message, buttons, resolve);
    });

    return promise;
  };

  const registerHandler = (dialogHandler: dialogHandler) => {
    handler = dialogHandler;
  };

  return { registerHandler, openDialog };
}
