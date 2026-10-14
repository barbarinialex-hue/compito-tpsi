import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Studente } from '../modelli/studente';
import { StudentiService } from '../services/studenti-service';

@Component({
  selector: 'app-inserimento',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './inserimento.html',
})
export class Inserimento {
  private readonly studentiService = inject(StudentiService);
  private readonly router = inject(Router);

  modello: Omit<Studente, 'id'> = {
    nome: '',
    classe: '',
    mediaVoti: 0,
  };

  salva(modulo: NgForm): void {
    if (modulo.invalid) {
      return;
    }

    this.studentiService.aggiungi(this.modello);
    this.router.navigate(['/elenco']);
  }
}
