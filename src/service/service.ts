import axios, {AxiosResponse} from "axios";

// interface Task {
//     tittle: number,
//     taskDifficultyLevel: number,
//     numberOfSolutions: number
// }

//'http://192.168.3.13:8084/api/v1/tasks'

let getTasks = async <T>(url: string, param: number): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios.get<T>(
            url,
            {
                params: {
                    page: param
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

