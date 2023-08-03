import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IHero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: IHero [] = [];
  public selectedHero?: IHero;

  constructor(private heroesService: HeroesService, private router: Router){

  }

  searchHero(): void{
    const value: string = this.searchInput.value || '';
    console.log(value)
    this.heroesService.getSuggestions(value)
    .subscribe(heroes => {
      this.heroes = heroes
    });
  }

  onSelectOption(event:MatAutocompleteSelectedEvent): void{
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    const hero: IHero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
    this.router.navigate(['/heroes/edit', hero.id])
  }
}