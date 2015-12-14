/// <reference path="../../../../filePath.d.ts"/>
module wd {
    export interface IPhysicsEngineAdapter {
        world:any;

        init():void;
        update(time:number):void;
        addDynamicBody(gameObject:GameObject, shape:Shape, options:any):void;
        addKinematicBody(gameObject:GameObject, shape:Shape, options:any):void;
        addStaticBody(gameObject:GameObject, shape:Shape, options:any):void;
        addLockConstraint(gameObject:GameObject, lockConstraint:LockConstraint):void;
        removeLockConstraint(gameObject:GameObject):void;
        addDistanceConstraint(gameObject:GameObject, distanceConstraint:DistanceConstraint):void;
        removeDistanceConstraint(gameObject:GameObject):void;
        addPointToPointConstraint(gameObject:GameObject, pointToPointConstraint:PointToPointConstraint):void;
        removePointToPointConstraint(pointToPointConstraint:PointToPointConstraint):void;
    }
}

