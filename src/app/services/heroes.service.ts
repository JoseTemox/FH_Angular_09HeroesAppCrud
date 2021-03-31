import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "https://crudheroes-97aea-default-rtdb.firebaseio.com";

  constructor(private http: HttpClient ) { }


  crearHeroe(heroe: HeroeModel){
    return this.http.post(`${ this.url }/heroes.json`,heroe)
      .pipe(
        map( (resp: any) => {
          heroe.id = resp.name;
          return heroe;

        }));
  }

  actualizarHeroe(heroe: HeroeModel){

    const heroTemp = {
      ...heroe
    };
    delete heroTemp.id


    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroTemp);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(
          this.crearArreglo    //es otra forma de implementar la linea comentada
          //resp => {this.crearArreglo(resp)}
        ),delay(0)
      );
  }

  private crearArreglo(heroesObj: object){

    const heroes: HeroeModel[] = [];
    if(heroesObj === null){ return [];}//validacion en caso de que este vacio
    Object.keys(heroesObj).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id =  key;
      heroes.push(heroe);

    });


   return  heroes;
  }

  getHeroe(id: string){
    return this.http.get(`${this.url}/heroes/${ id }.json`);

  }

  borrarHeroe(id: string ){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
