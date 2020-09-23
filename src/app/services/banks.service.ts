import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../interfaces/bank';

@Injectable({
    providedIn: 'root',
})
export class BanksService {

    constructor(private http: HttpClient) {
    }

    getBanks(): Promise<Bank[]> {
        return this.http.get<Bank[]>(`./assets/data/banks.json`).toPromise();
    }
}
