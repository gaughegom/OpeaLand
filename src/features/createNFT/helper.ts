import { http } from "../../services/AxiosHelper";

import { INSERT_ITEM } from "../../services/APIurls";

export const sendData = async (form: FormData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const result = await http.post(INSERT_ITEM, form, config);
    return {
      status: "success",
      message: "Create NFT successfully!"
    };
  } catch (e: any) {
    return {
      status: "error",
      message: e.data.message
    };
  }
};
