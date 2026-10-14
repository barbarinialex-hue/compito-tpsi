import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Studente } from '../modelli/studente';
import { StudentiService } from '../services/studenti-service';

@Component({
  selector: 'app-dettaglio-studente',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dettaglio-studente.html',
})
export class DettaglioStudente {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentiService = inject(StudentiService);

  readonly studente = signal<Studente | null>(null);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.studente.set(this.studentiService.trova(id));
    });
  }

  vaiAlSuccessivo(): void {
    const corrente = this.studente();

    if (!corrente) {
      return;
    }

    const successivo = this.studentiService.successivo(corrente.id);

    if (successivo) {
      this.router.navigate(['/dettaglio', successivo.id]);
    }
  }

  rimuovi(): void {
    const corrente = this.studente();

    if (!corrente) {
      return;
    }

    this.studentiService.rimuovi(corrente.id);
    this.router.navigate(['/elenco']);
  }
}
