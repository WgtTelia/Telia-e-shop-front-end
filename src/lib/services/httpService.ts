import apiClient from '@/lib/services/apiClient';

interface Entity {
    id: number;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    // Method for when the response is an array
    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }
    //method for when the response is an object (like products in the latest API version)
    getObject<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T>(this.endpoint, {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }

    getById<T>(id: number) {
        const controller = new AbortController();
        const request = apiClient.get<T>(this.endpoint + '/' + id, {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }

    create<T>(data: T) {
        const controller = new AbortController();
        const request = apiClient.post<T>(this.endpoint, data, {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }

    //this method may need a refactor once we have an endpoint for submitting the lead form
    update<T extends Entity>(entity: T) {
        const controller = new AbortController();
        const request = apiClient.put<T>(
            this.endpoint + '/' + entity.id,
            entity,
            {
                signal: controller.signal,
            }
        );
        return { request, cancel: () => controller.abort() };
    }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
