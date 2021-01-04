import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from '../models/heroe.model';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }
    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe((response) => {
        console.log(response);
      });
    } else {
      this.heroesService.crearHeroe(this.heroe).subscribe((response) => {
        console.log(response);
        this.heroe = response;
      });
    }
  }
}
