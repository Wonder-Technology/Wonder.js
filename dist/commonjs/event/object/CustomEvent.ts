import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Event } from "./Event";
import { EEventType } from "./EEventType";
import { ExtendUtils } from "wonder-commonlib/dist/commonjs/utils/ExtendUtils";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { DomEvent } from "./DomEvent";
import { EntityObject } from "../../core/entityObject/EntityObject";

@registerClass("CustomEvent")
export class CustomEvent extends Event {
    public static create(eventName: string);
    public static create(eventName: string, userData: any);

    public static create(...args) {
        var obj = null;

        if (args.length === 1) {
            obj = new this(args[0]);
        }
        else {
            obj = new this(args[0], args[1]);
        }

        return obj;
    }

    constructor(eventName: string);
    constructor(eventName: string, userData: any);

    constructor(...args) {
        super(args[0]);

        if (args.length === 2) {
            let userData = args[1];

            this.userData = userData;
        }
    }

    public readonly type: EEventType = EEventType.CUSTOM;

    public userData: any = null;


    public copyPublicAttri(destination, source: any) {
        var property = null;

        ExtendUtils.extend(destination, function(item, property) {
            return property.slice(0, 1) !== "_"
                && !JudgeUtils.isFunction(item);
        });

        return destination;
    }

    public clone(): CustomEvent {
        var eventObj = CustomEvent.create(<any>this.name);

        return <CustomEvent>this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
    }

    //@requireCheck(function(event:PointEvent){
    //    if(event.target){
    //        assert(event.target instanceof EntityObject, Log.info.FUNC_MUST_BE("target", "EntityObject"));
    //    }
    //})
    public getDataFromDomEvent(event: DomEvent) {
        this.target = <EntityObject>event.target;
        this.currentTarget = event.currentTarget;
        this.isStopPropagation = event.isStopPropagation;
    }
}