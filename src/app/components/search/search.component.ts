import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map, tap } from 'rxjs/operators';
import { Clima, ClimaFiltrado } from '../../interfaces/clima.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('inputCiudad') InputCiudad: ElementRef;

  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apikey = `&appid=c1df596cfc1479fb330e64b2b1bff357`;
  public climaFiltrado: ClimaFiltrado;
  public MostrarTarjeta: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ObtenerClimaActual();
  }

  private ObtenerClimaActual() {
    fromEvent(this.InputCiudad.nativeElement, 'keyup')
      .pipe(
        tap(() => (this.MostrarTarjeta = false)),
        debounceTime(1500),
        pluck('target', 'value'),
        switchMap((nombreCiudad) =>
          this.http.get(`${this.url}${nombreCiudad}${this.apikey}`).pipe(
            map((clima: Clima) => {
              return {
                NombreCiudad: clima.name,
                ClimaActual: clima.weather[0].main,
                TemperaturaActual: clima.main.temp,
                TemperaturaMaxima: clima.main.temp_max,
                TemperaturaMinima: clima.main.temp_min,
                Imagen:clima.weather[0].icon
              };
            })
          )
        )
      )
      .subscribe(
        (objetoFiltrado: ClimaFiltrado) => {
          this.climaFiltrado = objetoFiltrado;
          this.MostrarTarjeta = true;
        },
        () => this.ObtenerClimaActual()
      );
  }
}
