import { Component, Input, OnInit } from '@angular/core';
import { IHero } from '../../interfaces/hero.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit{
  ngOnInit(): void {
    if(!this.hero)
      throw Error('Hero is required')
  }
  @Input()
  public hero!: IHero

  constructor(private router: Router){

  }

  seeHero(id: string): void{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigateByUrl('/heroes/'+id);
  }
}
