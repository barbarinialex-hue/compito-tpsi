import { Component, input, output } from '@angular/core';
import { Studente } from '../modelli/studente';

@Component({
  selector: 'app-studente-card',
  standalone: true,
  templateUrl: './studente-card.html',
})
export class StudenteCard {
  readonly studente = input.required<Studente>();
  readonly azioni = input(true);
  readonly rimosso = output<Studente>();

  elimina(): void {
    this.rimosso.emit(this.studente());
  }
}
