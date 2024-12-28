import axios, {AxiosResponse} from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

/*
interface Task {
    tittle: string,
    taskDifficultyLevel: string,
    numberOfSolutions: number
}

interface TaskState {
    dataTask: Task[],
    currentPage: number,
    totalPage: number,
    status: string,
    error: null
}
*/

export interface TasksData {
    dataTask: {
            id: string,
            tittle: string,
            taskDifficultyLevel: string,
            numberOfSolutions: number
    }[],
    currentPage: number,
    totalPage: number
}


interface GetParams {
    page: number,
    difficultly?: string
}

const getTasks = createAsyncThunk<TasksData, { url: string, page: number, difficulty: string }, { rejectValue: string }>(
    'tasks/fetchTasks',
    async ({url, page, difficulty}, {rejectWithValue}) => {
        try {
            let getParams: GetParams = { page: page };

            if (difficulty && difficulty !== 'all') {
                getParams.difficultly = difficulty;
            }

            const response: AxiosResponse<TasksData> = await axios.get<TasksData>(
                url,
                {
                    params: getParams
                }
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to load tasks')
        }
    }
);


/*
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
*/

export default getTasks;

