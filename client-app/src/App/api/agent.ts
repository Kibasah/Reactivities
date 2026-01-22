import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { Photo, Profile, UserActivity } from "../models/profile";
import { Kesedaran } from "../models/kesedaran";
import { Pemantauan } from "../models/pemantauan";

const sleep = (delay: number) => {
    return new Promise(resolve => setTimeout(resolve, delay));
};


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}


const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: any) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowings: (username: string, predicate: string) => requests
        .get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) =>
        requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}

const KesedaranAgent = {
    list: () => requests.get<Kesedaran[]>('/kesedaran'),
    details: (id: string) => requests.get<Kesedaran>(`/kesedaran/${id}`),
    create: (kesedaran: Kesedaran) => requests.post<void>('/kesedaran', kesedaran),
    update: (kesedaran: Kesedaran) => requests.put<void>(`/kesedaran/${kesedaran.id}`, kesedaran),
    delete: (id: string) => requests.del<void>(`/kesedaran/${id}`),
}

const PemantauanAgent = {
    list: () => requests.get<Pemantauan[]>('/pemantauan'),
    details: (id: string) => requests.get<Pemantauan>(`/pemantauan/${id}`),
    create: (pemantauan: Pemantauan) => requests.post<void>('/pemantauan', pemantauan),
    update: (pemantauan: Pemantauan) => requests.put<void>(`/pemantauan/${pemantauan.id}`, pemantauan),
    delete: (id: string) => requests.del<void>(`/pemantauan/${id}`),
}

const agent = {
    Activities,
    Account,
    Profiles,
    Kesedaran: KesedaranAgent,
    Pemantauan: PemantauanAgent
}

export default agent;