type Listener = () => void;

const listeners = new Set<Listener>();

export function subscribeLearningStore(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitLearningStore(): void {
  for (const listener of listeners) listener();
}
