/// <reference path="../../../../filePath.d.ts"/>
module wd {
    export interface IPhysicsEngineAdapter {
        world:any;

        init():void;
        update(time:number):void;
        addDynamicBody(gameObject:GameObject, shape:Shape, options:any):void;
    }
}

