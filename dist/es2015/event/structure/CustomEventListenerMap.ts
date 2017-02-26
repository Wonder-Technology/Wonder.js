import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { EventListenerMap } from "./EventListenerMap";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { CustomEventRegisterData } from "../binder/CustomEventRegister";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { EEventName } from "../object/EventNameHandler";
import { JudgeUtils } from "../../utils/JudgeUtils";

@registerClass("CustomEventListenerMap")
export class CustomEventListenerMap extends EventListenerMap {
    public static create() {
        var obj = new this();

        return obj;
    }

    private _globalListenerMap: Hash<Collection<CustomEventRegisterData>> = Hash.create<Collection<CustomEventRegisterData>>();
    private _targetRecordMap: Hash<EntityObject> = Hash.create<EntityObject>();

    public hasChild(target: EntityObject) {
        return target.customEventMap.getCount() > 0;
    }

    public appendChild(eventName: EEventName, data: any);
    public appendChild(target: EntityObject, eventName: EEventName, data: any);

    public appendChild(...args) {
        if (args.length === 2) {
            let eventName: EEventName = args[0],
                data: any = args[1];

            this._globalListenerMap.appendChild(<any>eventName, data);
        }
        else {
            let target: EntityObject = args[0],
                eventName: EEventName = args[1],
                data: any = args[2];

            this._targetRecordMap.addChild(this.buildFirstLevelKey(target), target);

            target.customEventMap.appendChild(this.buildSecondLevelKey(eventName), data);
        }
    }

    public forEachAll(func: (list: Collection<CustomEventRegisterData>, eventName: EEventName) => void) {
        this._globalListenerMap.forEach(func);

        this._targetRecordMap.forEach((target: EntityObject) => {
            target.customEventMap.forEach(func);
        });
    }

    public forEachEventName(func: (list: Collection<CustomEventRegisterData>, eventName: EEventName) => void) {
        this._globalListenerMap.forEach(func);
    }

    public clear() {
        this._globalListenerMap.removeAllChildren();

        this._targetRecordMap.forEach((target: EntityObject) => {
            target.customEventMap.removeAllChildren();
        });
        this._targetRecordMap.removeAllChildren();
    }

    public getChild(eventName: EEventName): Collection<CustomEventRegisterData>;
    public getChild(target: EntityObject): Collection<CustomEventRegisterData>;
    public getChild(target: EntityObject, eventName: EEventName): Collection<CustomEventRegisterData>;

    public getChild(...args): any {
        if (args.length === 1 && JudgeUtils.isString(args[0])) {
            let eventName = args[0];

            return this._globalListenerMap.getChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            let target = args[0];

            return target.customEventMap;
        }
        else if (args.length === 2) {
            let target = args[0],
                eventName = args[1],
                secondMap = null;

            secondMap = target.customEventMap;

            if (!secondMap) {
                return null;
            }

            return secondMap.getChild(this.buildSecondLevelKey(eventName));
        }
    }

    public removeChild(eventName: EEventName): void;
    public removeChild(target: EntityObject): void;

    public removeChild(eventName: EEventName, handler: Function): void;
    public removeChild(uid: number, eventName: EEventName): void;
    public removeChild(target: EntityObject, eventName: EEventName): void;

    public removeChild(target: EntityObject, eventName: EEventName, handler: Function): void;


    public removeChild(...args): void {
        if (args.length === 1 && JudgeUtils.isString(args[0])) {
            let eventName = args[0];

            this._globalListenerMap.removeChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            let target = args[0];

            target.customEventMap.removeAllChildren();
            this._targetRecordMap.removeChild(this.buildFirstLevelKey(target));
        }
        else if (args.length === 2 && JudgeUtils.isString(args[0])) {
            let eventName = args[0],
                handler = args[1],
                list = null;

            list = this._globalListenerMap.getChild(eventName);

            if (!!list) {
                list.removeChild((val: CustomEventRegisterData) => {
                    return val.originHandler === handler;
                });

                if (list.getCount() === 0) {
                    this._globalListenerMap.removeChild(eventName);
                }
            }
        }
        else if (args.length === 2 && JudgeUtils.isNumber(args[0])) {
            let uid = args[0],
                eventName = args[1],
                secondMap = null;

            secondMap = <any>(this._targetRecordMap.getChild(this.buildFirstLevelKey(uid)));

            if (!!secondMap) {
                secondMap.removeChild(this.buildSecondLevelKey(eventName));
            }
        }
        else if (args.length === 2 && args[0] instanceof EntityObject) {
            let target = args[0],
                eventName = args[1],
                secondMap = null;

            secondMap = target.customEventMap;

            if (!!secondMap) {
                secondMap.removeChild(this.buildSecondLevelKey(eventName));
            }
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            let target = args[0],
                eventName = args[1],
                handler = args[2],
                secondMap = null;

            secondMap = target.customEventMap;

            if (!!secondMap) {
                let secondList = secondMap.getChild(eventName);

                if (!!secondList) {
                    secondList.removeChild((val: CustomEventRegisterData) => {
                        return val.originHandler === handler;
                    });

                    if (secondList.getCount() === 0) {
                        secondMap.removeChild(eventName);
                    }
                }
            }
        }
    }

    protected buildFirstLevelKey(target: EntityObject);
    protected buildFirstLevelKey(uid: number);

    protected buildFirstLevelKey(...args) {
        var v = args[0],
            uid = v.uid;

        if (uid) {
            return String(uid);
        }

        return v;
    }
}