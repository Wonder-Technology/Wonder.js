export declare abstract class EventHandler {
    abstract on(...args: any[]): any;
    abstract off(...args: any[]): any;
    abstract trigger(...args: any[]): any;
}
