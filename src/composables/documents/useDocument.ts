import {useAlert} from "../useAlert";
import {useApi} from "../useApi";

export type DocumentType = "stand-handover" | "stand-return-reminder";

export const useDocument = () => {
  const {post} = useApi();

  const issueDocument = ({
    type,
    location,
    items,
    data = {}
  }: {
    type: DocumentType;
    location: any;
    items: any[];
    data?: Record<string, any>;
  }) => {
    return post("documents/create", {type, location, items, data})
      .then((data) => {
        return data.data.id;
      })
      .catch(() => {
        useAlert().add({
          type: "error",
          message: "common.cannotCreateDocument",
          title: "common.error",
        });
        throw new Error("Cannot create document");
      });
  };

  const openDocument = (id: string) => {
    window.open(
      import.meta.env.VITE_API_URL + "documents/view/" + id,
      "_blank",
    );
  };

  return {issueDocument, openDocument};
};
