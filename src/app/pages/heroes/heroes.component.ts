import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { HeroeModel } from '../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando: boolean = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.cargando = true;

    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
      this.cargando = false;
    });
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
        this.heroesService.borrarHeroe(heroe.id).subscribe();
        this.heroes.splice(i, 1);
      }
    });
  }
}
