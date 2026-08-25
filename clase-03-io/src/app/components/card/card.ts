import { Component, input } from '@angular/core';
import { ICard } from '../../interfaces/card';

@Component({
  imports: [],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  cardInput = input<ICard>();
}
