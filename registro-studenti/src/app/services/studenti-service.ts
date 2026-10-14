import { computed, Service, signal } from '@angular/core';
import { Studente } from '../modelli/studente';

@Service()
export class StudentiService {
  private readonly dati = signal<Studente[]>([
    { id: 1, nome: 'Alice Rossi', classe: '5A', mediaVoti: 8.7 },
    { id: 2, nome: 'Marco Bianchi', classe: '5B', mediaVoti: 7.9 },
    { id: 3, nome: 'Sofia Verdi', classe: '5A', mediaVoti: 9.1 },
    { id: 4, nome: 'Luca Neri', classe: '5C', mediaVoti: 6.8 },
    { id: 5, nome: 'Giulia Moretti', classe: '5B', mediaVoti: 8.3 },
  ]);

  readonly studenti = this.dati.asReadonly();

  readonly numero = computed(() => this.dati().length);

  readonly migliore = computed(() => {
    return [...this.dati()].sort((a, b) => b.mediaVoti - a.mediaVoti)[0] ?? null;
  });

  aggiungi(studente: Omit<Studente, 'id'>): Studente {
    const nuovoStudente: Studente = {
      ...studente,
      id: this.prossimoId(),
    };

    this.dati.update((studentiCorrenti) => [...studentiCorrenti, nuovoStudente]);
    return nuovoStudente;
  }

  rimuovi(id: number): void {
    this.dati.update((studentiCorrenti) => studentiCorrenti.filter((studente) => studente.id !== id));
  }

  trova(id: number): Studente | null {
    return this.dati().find((studente) => studente.id === id) ?? null;
  }

  successivo(id: number): Studente | null {
    const elenco = this.dati();
    const posizione = elenco.findIndex((studente) => studente.id === id);

    if (posizione === -1) {
      return null;
    }

    return elenco[(posizione + 1) % elenco.length] ?? null;
  }

  aggiorna(id: number, aggiornamenti: Partial<Studente>): Studente | null {
    const trovato = this.trova(id);

    if (!trovato) {
      return null;
    }

    const aggiornato: Studente = {
      ...trovato,
      ...aggiornamenti,
    };

    this.dati.update((studentiCorrenti) =>
      studentiCorrenti.map((studente) => (studente.id === id ? aggiornato : studente)),
    );

    return aggiornato;
  }

  private prossimoId(): number {
    return this.dati().reduce((massimo, studente) => Math.max(massimo, studente.id), 0) + 1;
  }
}
