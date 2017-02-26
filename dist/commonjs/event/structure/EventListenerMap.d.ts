/// <reference types="wonder-commonlib" />
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { EEventName } from "../object/EventNameHandler";
import { EntityObject } from "../../core/entityObject/EntityObject";
export declare abstract class EventListenerMap {
    abstract getChild(...args: any[]): Collection<any>;
    abstract removeChild(...args: any[]): any;
    abstract hasChild(...args: any[]): boolean;
    abstract appendChild(...args: any[]): void;
    abstract forEachAll(func: (list: Collection<any>, eventName: EEventName) => void): void;
    abstract forEachEventName(func: (list: Collection<any>, eventName: EEventName) => void): void;
    abstract clear(): void;
    protected abstract buildFirstLevelKey(target: EntityObject | HTMLElement): string;
    protected buildSecondLevelKey(eventName: EEventName): string;
}
