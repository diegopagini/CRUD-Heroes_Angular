import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { HeroeModel } from '../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<HeroeModel[]>;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  borrarHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Esta seguro que desea borar a ${heroe.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.heroesService
          .borrarHeroe(heroe.id)
          .pipe(tap(() => this.getHeroes()))
          .subscribe();
      }
    });
  }

  private getHeroes(): void {
    this.heroes$ = this.heroesService.getHeroes();
  }
}
