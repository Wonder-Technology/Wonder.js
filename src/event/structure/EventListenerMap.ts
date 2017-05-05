import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { EEventName } from "../object/EventNameHandler";
import { EntityObject } from "../../core/entityObject/EntityObject";

export abstract class EventListenerMap {
    public abstract getChild(...args): Collection<any>;
    public abstract removeChild(...args): any;
    public abstract hasChild(...args): boolean;
    public abstract appendChild(...args): void;

    public abstract forEachAll(func: (list: Collection<any>, eventName: EEventName) => void): void;
    public abstract forEachEventName(func: (list: Collection<any>, eventName: EEventName) => void): void;
    public abstract clear(): void;

    protected abstract buildFirstLevelKey(target: EntityObject | HTMLElement): string;

    protected buildSecondLevelKey(eventName: EEventName): string {
        return <any>eventName;
    }
}