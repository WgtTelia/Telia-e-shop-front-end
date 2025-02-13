import apiClient from '@/lib/services/apiClient';

interface Entity {
    id: number;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>(isArray: boolean, params?: URLSearchParams) {
        const controller = new AbortController();
        const request = isArray
            ? apiClient.get<T[]>(this.endpoint, {
                  signal: controller.signal,
                  params,
              })
            : apiClient.get<T>(this.endpoint, {
                  signal: controller.signal,
                  params,
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
