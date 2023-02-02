import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { map, retry } from 'rxjs/operators';
import { CanApiOptions } from './api.type';

@Injectable()
export class ApiService {

    constructor(private httpService: HttpService) {
    }

    async request(option: CanApiOptions) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.httpService
                    .request(option).pipe(
                        map((res: any) => {
                            return res.data;
                        })
                    )
                    .toPromise();

                resolve(res);
            } catch (error) {
                reject(error)
            }
        })
    }


    async post<T>(
        url: string,
        body: any,
        headers?: any
    ) {
        const data = (
            await this.httpService
                .post<T>(url, body, { headers })
                .toPromise()
        ).data;
        return data;
    }

    async get<T>(
        url: string,
        params?: any,
        headers?: any
    ) {
        try {
            const response = await this.httpService
                .get<T>(url, {
                    headers,
                    params,
                })
                .toPromise();
            return response.data;
        } catch (error) {
            return error;
        }
    }


}
