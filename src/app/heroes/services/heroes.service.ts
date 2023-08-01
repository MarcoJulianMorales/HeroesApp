import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { IHero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService implements OnInit{
    private baseUrl: string = environments.baseUrl;

    constructor(private httpClient: HttpClient) { }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    
    getHeroes(): Observable<IHero []>{
        return this.httpClient.get<IHero []>(`${ this.baseUrl }/heroes`);
    }

    getById(id: string): Observable<IHero | undefined>{
        return this.httpClient.get<IHero>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError(error => of(undefined))
        );
    }

    getSuggestions(query: string): Observable<IHero []>{
        return this.httpClient.get<IHero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    }
}