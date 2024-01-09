export class Subject<T> {
    // Crée un nouveau sujet d'événement
    private listeners: ((t: T) => void)[] = [];

    // Ajoute un listener à l'événement 
    listen(listener: (t: T) => void) {
        this.listeners.push(listener);
    }
    // Déclenche l'événement
    raise(event: T) {
        for (var listener of this.listeners)
            listener(event);
    }
}