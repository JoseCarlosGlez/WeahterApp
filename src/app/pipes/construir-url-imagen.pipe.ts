import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'construirUrlImagen',
})
export class ConstruirUrlImagenPipe implements PipeTransform {
  private urlImage: string = 'http://openweathermap.org/img/wn/';
  private urlImageComplementaria = '@2x.png';

  transform(value: string): unknown {
    return `${this.urlImage}${value}${this.urlImageComplementaria}`;
  }
}
