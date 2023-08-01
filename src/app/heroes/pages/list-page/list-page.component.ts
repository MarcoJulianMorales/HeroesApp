import { Component, OnInit } from '@angular/core';
import { IHero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{
  public heroes: IHero [] = [];

  constructor(private heroesService: HeroesService){

  }

  ngOnInit(): void {
    this.heroesService.getHeroes()
    .subscribe( resp => {
      this.heroes = resp
    })
  }
}
