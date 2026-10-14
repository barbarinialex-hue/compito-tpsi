# Risposte al laboratorio 03.14 - Servizi: il registro degli studenti

1. Che cos'è un servizio in Angular?
   Un servizio è una classe dedicata a incapsulare logica condivisa, come accesso a dati, business logic e gestione dello stato, che può essere iniettata in più componenti.

2. A cosa serve il decoratore @Service()?
   Serve a dichiarare che una classe è un servizio Angular e a permetterne l'iniezione automatica tramite dependency injection quando viene richiesta dai componenti.

3. Come si usa `inject()`?
   `inject()` è un helper che consente di ottenere un'istanza del servizio direttamente all'interno di un componente o di un servizio, senza passare il servizio tramite costruttore.

4. Che ruolo hanno i Signal in Angular?
   I Signal rappresentano valori reattivi che possono essere letti e aggiornati in modo dichiarativo. Sono ideali per gestire lo stato della UI in modo semplice e reattivo.

5. Cosa fa `computed()`?
   `computed()` crea un valore derivato da uno o più Signal e lo mantiene aggiornato automaticamente quando cambiano le dipendenze.

6. Come si aggiunge uno studente al registro?
   Il metodo `aggiungi()` del servizio crea un nuovo oggetto `Studente` con id incrementato e lo inserisce nell'array interno tramite `this.dati.update(...)`.

7. Come si rimuove uno studente dal registro?
   Il metodo `rimuovi(id)` filtra l'array dei dati e lascia solo gli studenti con id diverso da quello richiesto.

8. Come si legge un parametro di route in Angular?
   Si usa `ActivatedRoute`, in particolare `paramMap`, per leggere i parametri presenti nell'URL come `id`, e poi si recupera lo studente corrispondente dal servizio.

9. Che differenza c'è tra `@if` e `@for`?
   `@if` serve per mostrare un blocco solo se una condizione è vera; `@for` serve per iterare su una collezione e creare una parte di template per ogni elemento.

10. A cosa serve una route wildcard?
   La route wildcard (`**`) serve a intercettare URL non previsti e reindirizzarli a una pagina di fallback, ad esempio la home o la lista di studenti.

---

## Esempio di struttura del progetto

- `src/app/modelli/studente.ts`
- `src/app/services/studenti-service.ts`
- `src/app/home/home.ts`
- `src/app/elenco/elenco.ts`
- `src/app/inserimento/inserimento.ts`
- `src/app/dettaglio-studente/dettaglio-studente.ts`
- `src/app/modifica-studente/modifica-studente.ts`

In questo laboratorio si usa il servizio come fonte unica di verità per la lista degli studenti e i componenti si aggiornano automaticamente grazie ai Signal.
