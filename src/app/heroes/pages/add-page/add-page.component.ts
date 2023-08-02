import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IHero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styles: [
  ]
})
export class AddPageComponent implements OnInit{
  public heroForm = new FormGroup({
    id:                new FormControl(''),
    superhero:         new FormControl('', {nonNullable:true}),
    publisher:         new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:         new FormControl(''),
    first_appearance:  new FormControl(''),
    characters:        new FormControl(''),
    alt_img:           new FormControl(''),
  })

  public creators = [
    {
      id: 'DC Comics', desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics', desc: 'Marvel - Comics'
    }
  ];

  constructor(
    private heroesService: HeroesService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ){}
  
  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesService.getById(id) ),
    )
    .subscribe( hero => {
      if(!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);
      return;
    })
  }

  get currentHero(): IHero {
    return this.heroForm.value as IHero;
  }

  onSubmit(): void {
    if(!this.heroForm) return;

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero => {
        //TODO: show snackbar
        this.showSnackbar( hero.superhero + ' updated successfully' );
      });

      return;
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe(hero => {
      //TODO: show snackbar & navigate to heroes/edit/id
      this.showSnackbar(hero.superhero + ' added successfully');
      this.router.navigate(['heroes/edit', hero.id])
    })
  }

  onDelete(){
    if(!this.currentHero.id) throw Error('ID is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result:boolean) => result),
      switchMap( () => this.heroesService.deleteHero(this.currentHero.id)),
      filter( (wasDeleted: boolean) => wasDeleted),
      ).
    subscribe( () => {
      this.router.navigateByUrl('/heroes')
    })


    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;

    //   this.heroesService.deleteHero(this.currentHero.id)
    //   .subscribe(resp =>{
    //     if(resp)
    //       this.router.navigateByUrl('/heroes');
    //   });
    //   this.router.navigateByUrl('/heroes')
    // });
  }

  showSnackbar(message: string): void{
    this.snackbar.open(message, 'done',{
      duration: 1000
    });
  }
}