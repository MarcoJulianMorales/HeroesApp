import { Component, OnInit } from '@angular/core';
import { IHero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{
  public heroes: IHero [] = [];
  public isLoading = true;

  constructor(private heroesService: HeroesService){

  }

  ngOnInit(): void {
    this.heroesService.getHeroes()
    .pipe(
      delay(800),
      tap(() => this.isLoading=false),
    )
    .subscribe( resp => {
      this.heroes = resp
    })
  }
}
