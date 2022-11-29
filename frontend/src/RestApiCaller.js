import axios from "axios";

class RestApiCaller {
    static async getQuestionOneFits(){
        const res = await axios.get(global.api_url+"/question-one-shifts")
        return res.data;
    }
}
export default RestApiCaller