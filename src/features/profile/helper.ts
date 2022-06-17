import { UPDATE_WALLET } from "../../services/APIurls";
import { http } from "../../services/AxiosHelper";

export function validateEmail(input: string) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex) || input === "") {
    return true;
  } else {
    return false;
  }
}
export function validateUserName(input: string) {
  var validRegex = /^[a-zA-Z0-9.\-\_]+$/;

  if (input.match(validRegex) || input === "") {
    return true;
  } else {
    return false;
  }
}

export const sendData = async (form: FormData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const result = await http.put(UPDATE_WALLET, form, config);
    return {
      type: "success",
      message: "Update info successfully!"
    };
  } catch (e: any) {
    return {
      type: "error",
      message: e.data.message
    };
  }
};
