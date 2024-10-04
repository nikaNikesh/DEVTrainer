import axios, {AxiosResponse} from "axios";

let getTasks = async <T>(url: string, page: number, difficulty: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios.get<T>(
            url,
            {
                params: {
                    page: page,
                    difficultly: difficulty
                }
            }
        );
        return response.data;

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
}

export default getTasks;

