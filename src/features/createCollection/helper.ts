import { http } from "../../services/AxiosHelper";

export const sendData = async (form: FormData) => {
    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    // const result =
    //     //selectedAvt && (await axios.post(`http:/localhost:32/api/test`, formData, config));
    //     await http.post(`http://localhost:32/api/users/test`, form, config);
    return "success"
};
