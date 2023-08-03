import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { IHero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{
  public hero?: IHero

  constructor(
    private heroesService: HeroesService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){

  }

  ngOnInit(): void {
    window.scrollTo({ top: 0 })
    this.activatedRoute.params
    .pipe(
      delay(1000),
      switchMap(({id}) => this.heroesService.getById(id)),
    )
    .subscribe(hero => {
      if(!hero){
        return this.router.navigate(['heroes/list'])
      }

      this.hero = hero;
      console.log(hero)
      return;
    })  
  }

  goBack(): void{
    this.router.navigateByUrl('/heroes/list')
  }
}