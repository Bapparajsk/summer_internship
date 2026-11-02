type EventMap = {
    settingsChanged: "updated";
    lifelineUsed: string;
};

type Listener = () => void;

type Subscription = {
    target: string;
    listener: Listener;
};

class TypedEventEmitter<Events extends Record<string, unknown>> {
    private listeners = new Map<keyof Events, Set<Subscription>>();

    subscribe<K extends keyof Events>(
        event: K,
        target: string,
        listener: Listener
    ): () => void {
        let eventListeners = this.listeners.get(event);

        if (!eventListeners) {
            eventListeners = new Set();
            this.listeners.set(event, eventListeners);
        }

        const subscription = { target, listener };

        eventListeners.add(subscription);

        return () => {
            eventListeners!.delete(subscription);

            if (eventListeners!.size === 0) {
                this.listeners.delete(event);
            }
        };
    }

    emit<K extends keyof Events>(event: K, target?: string ): void {
        const eventListeners = this.listeners.get(event);

        if (!eventListeners?.size) return;

        for (const subscription of eventListeners) {
            if (target !== undefined && subscription.target !== target) {
                continue;
            }

            subscription.listener();
            return; // Stop after the first matching listener is called
        }
    }

    clear<K extends keyof Events>(event?: K): void {
        if (event !== undefined) {
            this.listeners.delete(event);
        } else {
            this.listeners.clear();
        }
    }
}

export const roomEvents = new TypedEventEmitter<EventMap>();

// emits
export const emitSettingsChanged = () => {
    roomEvents.emit("settingsChanged", "updated");
};

export const emitLifelineUsed = (target: string) => {
    roomEvents.emit("lifelineUsed", target);
};