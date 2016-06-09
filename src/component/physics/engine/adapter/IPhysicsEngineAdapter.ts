module wd {
    export interface IPhysicsEngineAdapter {
        world:any;

        init():void;
        update(elapsed:number):void;

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

        addDynamicBody(entityObject:GameObject, shape:Shape, options:any):void;
        addKinematicBody(entityObject:GameObject, shape:Shape, options:any):void;
        addStaticBody(entityObject:GameObject, shape:Shape, options:any):void;
        addLockConstraint(entityObject:GameObject, lockConstraint:LockConstraint):void;
        removeLockConstraint(entityObject:GameObject):void;
        addDistanceConstraint(entityObject:GameObject, distanceConstraint:DistanceConstraint):void;
        removeDistanceConstraint(entityObject:GameObject):void;
        addHingeConstraint(entityObject:GameObject, hingeConstraint:HingeConstraint):void;
        removeHingeConstraint(entityObject:GameObject):void;
        addPointToPointConstraint(entityObject:GameObject, pointToPointConstraint:PointToPointConstraint):void;
        removePointToPointConstraint(pointToPointConstraint:PointToPointConstraint):void;
    }
}

