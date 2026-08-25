import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { ICard } from '../../interfaces/card';

@Component({
  imports: [Card],
  selector: 'app-tutoriales',
  styleUrl: './tutoriales.css',
  templateUrl: './tutoriales.html',
})
export class Tutoriales {
  // cards: Array<ICard> = [
  cards: ICard[] = [
    {
      img: 'https://argentinaestudia.com/wp-content/uploads/2021/06/Logo_UTN.jpg',
      titulo: 'Aprende Angular',
      texto: 'a través de playground',
      textoLink: 'Empieza a programar',
      link: 'https:google.com',
    },
    {
      img: 'https://argentinaestudia.com/wp-content/uploads/2021/06/Logo_UTN.jpg',
      titulo: 'Cambia tu vida',
      texto: 'a través de playground 2',
      textoLink: 'Empieza a programar 2',
      link: 'https:google.com',
    },
    {
      img: 'https://argentinaestudia.com/wp-content/uploads/2021/06/Logo_UTN.jpg',
      titulo: 'Aprende a volar',
      texto: 'a través de playground',
      textoLink: 'Empieza a programar',
      link: 'https:google.com',
    },
  ];

  // agregar() {
  //   this.cards.push({
  //     img: 'https://argentinaestudia.com/wp-content/uploads/2021/06/Logo_UTN.jpg',
  //     titulo: 'Aprende Angular 2',
  //     texto: 'a través de playground 2',
  //     textoLink: 'Empieza a programar 2',
  //     link: 'https:google.com',
  //   });
  // }

  // modificar() {
  //   this.cards[4].img = 'asdasd';
  // }
}
