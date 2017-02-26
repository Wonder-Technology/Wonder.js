import { Entity } from "../../core/Entity";
export declare abstract class Buffer extends Entity {
    buffer: any;
    abstract resetData(data: any, ...args: any[]): void;
    dispose(): void;
}
