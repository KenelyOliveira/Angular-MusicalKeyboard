import { Component, Input } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'hello',
  template: `<h1>Escala Musical</h1>
            <button (click)="mudaNota(1);">C</button>
            <button (click)="mudaNota(2)">D</button>
            <button (click)="mudaNota(3)">E</button>
            <button (click)="mudaNota(4)">F</button>
            <button (click)="mudaNota(5)">G</button>
            <button (click)="mudaNota(6)">A</button>
            <button (click)="mudaNota(7)">B</button>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;

  constructor() {


  }

  //https://dkrn4sk0rn31v.cloudfront.net/2018/09/28065939/Captura-de-Tela-2018-09-28-a%CC%80s-06.58.35.png
  notas = [ 
    { chave: 1, frequencia: 261.6 },
    { chave: 2, frequencia: 293.7 },
    { chave: 3, frequencia: 329.6 },
    { chave: 4, frequencia: 349.2 },
    { chave: 5, frequencia: 392.0 },
    { chave: 6, frequencia: 440.0 },
    { chave: 7, frequencia: 493.9 }
    
  ];

  mudaNota(chave) {
    let context = new AudioContext();
    let oscillator = context.createOscillator();

    //oscillator.type = 'sine';
    oscillator.connect(context.destination);
    oscillator.frequency.value = this.notas.filter(nota => nota.chave == chave)[0].frequencia;
    oscillator.start();

    let timer = Observable.timer(2000,1000);
    timer.subscribe(t=> {
        oscillator.stop();
    });

  }
}
