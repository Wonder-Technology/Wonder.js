export abstract class EventDispatcher {
    public abstract trigger(...args): any;
}