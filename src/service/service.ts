import axios, {AxiosError, AxiosResponse} from "axios";

interface Task {
    title: string,
    level: string,
    amount: number
}

function getTasks(page: number) {
    axios.get<Task[]>('http://192.168.3.13:8084/api/v1/tasks', {
        params: {
            "page": page
        }

    })
        .then((response: AxiosResponse<Task[]>) => {
            console.log(response.data);
        })
        .catch((error: AxiosError) => {
            console.log(error);
        })
}


export default getTasks;

