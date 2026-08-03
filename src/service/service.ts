import axios, {AxiosResponse} from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export interface TasksData {
    content: {
        id: number,
        title: string,
        difficulty: string,
        numberOfSolutions: number,
        descriptionOfTask: string
    }[],
    totalPages: number,
    totalElements: number,
    size: number,
    number: number
}

export interface FetchTasksParams {
    currentPage: number;
    pageSize: number;
    difficulty?: string;
    searchValue?: string;
    sortName?: 'asc' | 'desc' | 'none';
    sortDifficulty?: 'asc' | 'desc' | 'none';
    sortSolutions?: 'asc' | 'desc' | 'none';
}

type SortFieldName = "TITLE" | "DIFFICULTY" | "NUMBER_OF_SOLUTIONS";
type SortDirection = "ASC" | "DESC";

export interface SortField {
    filedName: SortFieldName;
    direction: SortDirection;
}

export interface TasksRequestBody {
    page: number,
    size: number,
    difficulty?: string,
    title?: string,
    numberOfSolutions?: number,
    sortFiled?: SortField[];
}

const getTasks = createAsyncThunk<
    TasksData,
    FetchTasksParams,
    { rejectValue: string }
>(
    'tasksData/fetchTasks',
    async (params, {rejectWithValue}) => {
    const {
            currentPage,
            pageSize,
            difficulty,
            searchValue,
            sortName,
            sortDifficulty,
            sortSolutions,
        } = params;
        try {
            let tasksRequestBody: TasksRequestBody = {
                page: currentPage,
                size: pageSize
            };

            if (difficulty && difficulty !== 'all') {
                tasksRequestBody.difficulty = difficulty.toUpperCase();
            }

            if (searchValue) {
                tasksRequestBody.title = searchValue;
            }

            const sortFiled: SortField[] = [];

            if (sortName !== 'none') {
                sortFiled.push({
                    filedName: 'TITLE',
                    direction: sortName === 'asc' ? 'ASC' : 'DESC',
                });
            }

            if (sortDifficulty !== 'none') {
                sortFiled.push({
                    filedName: 'DIFFICULTY',
                    direction: sortDifficulty === 'asc' ? 'ASC' : 'DESC',
                });
            }

            if (sortSolutions !== 'none') {
                sortFiled.push({
                    filedName: 'NUMBER_OF_SOLUTIONS',
                    direction: sortSolutions === 'asc' ? 'ASC' : 'DESC',
                });
            }

            if (sortFiled.length > 0) {
                tasksRequestBody.sortFiled = sortFiled;
            }

            const response: AxiosResponse<TasksData> = await axios.post<TasksData>(
                'https://localhost:8443/api/v1/tasks',
                tasksRequestBody,
                {withCredentials: true}
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to load tasks')
        }
    }
);

export default getTasks;

