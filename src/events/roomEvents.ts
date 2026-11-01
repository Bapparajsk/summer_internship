type EventMap = {
    settingsChanged: undefined;
    lifelineUsed: undefined;
};

type Listener = () => void;

class TypedEventEmitter<Events extends Record<string, unknown>> {
    private listeners = new Map<keyof Events, Set<Listener>>();

    subscribe<K extends keyof Events>(
        event: K,
        listener: Listener
    ): () => void {
        let eventListeners = this.listeners.get(event);

        if (!eventListeners) {
            eventListeners = new Set<Listener>();
            this.listeners.set(event, eventListeners);
        }

        eventListeners.add(listener);

        return () => {
            eventListeners?.delete(listener);

            if (eventListeners?.size === 0) {
                this.listeners.delete(event);
            }
        };
    }

    emit<K extends keyof Events>(event: K): void {
        const eventListeners = this.listeners.get(event);

        if (!eventListeners?.size) return;

        // Snapshot protects iteration if listeners unsubscribe during emit.
        [...eventListeners].forEach((listener) => listener());
    }

    clear<K extends keyof Events>(event?: K): void {
        if (event !== undefined) {
            this.listeners.delete(event);
            return;
        }

        this.listeners.clear();
    }
}

export const roomEvents = new TypedEventEmitter<EventMap>();

// emits

export const emitSettingsChanged = () => {
    roomEvents.emit("settingsChanged");
};

export const emitLifelineUsed = () => {
    roomEvents.emit("lifelineUsed");
}