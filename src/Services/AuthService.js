import HttpClientXml from "../utils/HttpClientXml";

const getLogin = async (data) => {
    let endPoint = "login";
    return HttpClientXml.post(endPoint, data);
};

export default {
    getLogin,
}