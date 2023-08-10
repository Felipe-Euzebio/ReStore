import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { PaginatedResponse } from '../models/pagination';

axios.defaults.baseURL = 'http://localhost:5000/api/'; 
axios.defaults.withCredentials = true;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

const responseBody = (response: AxiosResponse) => response?.data;

axios.interceptors.response.use(async response => {
    
    await sleep();

    const pagination = response.headers['pagination'];

    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }

    return response;

}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors: string[] = [];

                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }

                throw modalStateErrors.flat();
            }
            toast.error(data.title);
            break;

        case 401:
            toast.error(data.title);
            break;

        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
    
        default:
            break;
    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams)    => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {})                   => axios.post(url, body).then(responseBody),
    put: (url: string, body: {})                    => axios.put(url, body).then(responseBody),
    delete: (url: string)                           => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: (params: URLSearchParams)     => requests.get('products', params),
    details: (id: number)               => requests.get(`products/${id}`),
    fetchFilters: ()                    => requests.get('products/filters'),
}

const TestErrors = {
    get400: ()              => requests.get('buggy/bad-request'),
    get401: ()              => requests.get('buggy/unauthorized'),
    get404: ()              => requests.get('buggy/not-found'),
    get500: ()              => requests.get('buggy/server-error'),
    getValidationError: ()  => requests.get('buggy/validation-error'),
}

const Basket = {
    get: ()                                                => requests.get('basket'),
    addItem: (productId: number, quantity: number = 1)     => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity: number = 1)  => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;
