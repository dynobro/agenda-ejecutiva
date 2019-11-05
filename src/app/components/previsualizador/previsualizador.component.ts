import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-previsualizador',
  templateUrl: './previsualizador.component.html',
  styleUrls: ['./previsualizador.component.scss']
})
export class PrevisualizadorComponent implements OnChanges {
  

  constructor() { }

  @Output()
  cambiaEstado: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  itemClick: EventEmitter<any> = new EventEmitter<any>();

  _fechaInicial:Date = null;

  @Input('fecha-inicial')
  set fechaInicial(value: any){
    this._fechaInicial = new Date(value.year, value.month-1, value.day);
  }

  @Input()
  periocidad:number = 0;

  fechasVisita = [];


  ngOnChanges(changes: SimpleChanges): void {
    this.renderVisitas();
    this.cambiaEstado.emit(this.fechasVisita);
  }

  private renderVisitas() {
    this.fechasVisita = [];
    if(this.periocidad > 0){
      let fec = moment(this._fechaInicial);
      let division = 720 / this.periocidad;
      for(let i:number = 0; i<=division; i++) {
        
        if(fec.toDate().toLocaleString('default', { weekday: 'long' }) === 'sábado'){
          fec = fec.add(2,'days');
        }else if(fec.toDate().toLocaleString('default', { weekday: 'long' }) === 'domingo'){
          fec = fec.add(1, 'days');
        }

        this.fechasVisita.push({
          month: fec.toDate().toLocaleString('default', { month: 'long' }),
          year: fec.year(),
          weekDay: fec.toDate().toLocaleString('default', { weekday: 'long' }).substr(0,3) + '.',
          day: fec.toDate().getDate().toLocaleString().padStart(2,'0'),
          date: fec.toDate(),
          id: undefined
        })

        fec = fec.add(this.periocidad, 'days');
      }
    }
  }

  onItemClick(itemValue: any){
    this.itemClick.emit(itemValue);
  }
}