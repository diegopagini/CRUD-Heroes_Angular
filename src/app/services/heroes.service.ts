import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../pages/models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://crud-heroes-921a6-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((response: any) => {
        heroe.id = response.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemporal = {
      ...heroe,
    };
    delete heroeTemporal.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemporal);
  }
}
