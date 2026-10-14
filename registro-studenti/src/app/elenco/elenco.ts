import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentiService } from '../services/studenti-service';

@Component({
  selector: 'app-elenco',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './elenco.html',
})
export class Elenco {
  private readonly studentiService = inject(StudentiService);

  readonly studenti = this.studentiService.studenti;
  readonly filtroClasse = signal('');
  readonly ordine = signal<'nome' | 'media'>('nome');

  readonly filtrati = computed(() => {
    const filtro = this.filtroClasse().trim().toLowerCase();

    return this.studenti().filter((studente) => {
      if (!filtro) {
        return true;
      }

      return (
        studente.nome.toLowerCase().includes(filtro) ||
        studente.classe.toLowerCase().includes(filtro)
      );
    });
  });

  readonly mediaClasse = computed(() => {
    const studenti = this.filtrati();

    if (!studenti.length) {
      return '0.00';
    }

    const media = studenti.reduce((somma, studente) => somma + studente.mediaVoti, 0) / studenti.length;
    return media.toFixed(2);
  });

  readonly visibili = computed(() => {
    const elenco = [...this.filtrati()];

    if (this.ordine() === 'media') {
      elenco.sort((a, b) => b.mediaVoti - a.mediaVoti);
      return elenco;
    }

    elenco.sort((a, b) => a.nome.localeCompare(b.nome));
    return elenco;
  });

  cambiaOrdine(valore: 'nome' | 'media'): void {
    this.ordine.set(valore);
  }
}
