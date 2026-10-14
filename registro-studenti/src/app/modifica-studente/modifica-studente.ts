import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Studente } from '../modelli/studente';
import { StudentiService } from '../services/studenti-service';

@Component({
  selector: 'app-modifica-studente',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './modifica-studente.html',
})
export class ModificaStudente {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentiService = inject(StudentiService);

  readonly id = signal<number | null>(null);
  readonly nome = signal('');
  readonly classe = signal('');
  readonly mediaVoti = signal(0);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id.set(id);

    const studente = this.studentiService.trova(id);

    if (studente) {
      this.nome.set(studente.nome);
      this.classe.set(studente.classe);
      this.mediaVoti.set(studente.mediaVoti);
    }
  }

  salva(): void {
    const idCorrente = this.id();

    if (idCorrente === null) {
      return;
    }

    this.studentiService.aggiorna(idCorrente, {
      nome: this.nome(),
      classe: this.classe(),
      mediaVoti: this.mediaVoti(),
    });

    this.router.navigate(['/dettaglio', idCorrente]);
  }
}
