import { INSERT_COLLECTION } from "../../services/APIurls";
import { http } from "../../services/AxiosHelper";

export const sendData = async (form: FormData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const result = await http.post(INSERT_COLLECTION, form, config);
    return { type: "success", message: "Create collection successfully." };
  } catch (e: any) {
    return { type: "error", message: e.message };
  }
};
