import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Studente } from '../modelli/studente';
import { StudentiService } from '../services/studenti-service';
import { StudenteCard } from '../studente-card/studente-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StudenteCard, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  private readonly studentiService = inject(StudentiService);

  readonly studenti = this.studentiService.studenti;
  readonly numero = this.studentiService.numero;
  readonly migliore = this.studentiService.migliore;

  rimuovi(studente: Studente): void {
    this.studentiService.rimuovi(studente.id);
  }
}
