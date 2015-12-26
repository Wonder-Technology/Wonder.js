/// <reference path="../../../../filePath.d.ts"/>
module wd {
    export interface IPhysicsEngineAdapter {
        world:any;

        init():void;
        update(elapsedTime:number):void;

        getGravity(gravity:number):Vector3;
        setGravity( gravity:Vector3):void;
        getFriction(obj:GameObject, friction:number):number;
        setFriction(obj:GameObject, friction:number):void;
        getRestitution(obj:GameObject, restitution:number):number;
        setRestitution(obj:GameObject, restitution:number):void;
        getLinearDamping(obj:GameObject):number;
        setLinearDamping(obj:GameObject, linearDamping:number):void;
        getAngularDamping(obj:GameObject):number;
        setAngularDamping(obj:GameObject, angularDamping:number):void;
        getMass(obj:GameObject):number;
        setMass(obj:GameObject, mass:number):void;
        getVelocity(obj:GameObject):Vector3;
        setVelocity(obj:GameObject, velocity:Vector3):void;
        getAngularVelocity(obj:GameObject):Vector3;
        setAngularVelocity(obj:GameObject, angularVelocity:Vector3):void;

        addDynamicBody(gameObject:GameObject, shape:Shape, options:any):void;
        addKinematicBody(gameObject:GameObject, shape:Shape, options:any):void;
        addStaticBody(gameObject:GameObject, shape:Shape, options:any):void;
        addLockConstraint(gameObject:GameObject, lockConstraint:LockConstraint):void;
        removeLockConstraint(gameObject:GameObject):void;
        addDistanceConstraint(gameObject:GameObject, distanceConstraint:DistanceConstraint):void;
        removeDistanceConstraint(gameObject:GameObject):void;
        addHingeConstraint(gameObject:GameObject, hingeConstraint:HingeConstraint):void;
        removeHingeConstraint(gameObject:GameObject):void;
        addPointToPointConstraint(gameObject:GameObject, pointToPointConstraint:PointToPointConstraint):void;
        removePointToPointConstraint(pointToPointConstraint:PointToPointConstraint):void;
    }
}

