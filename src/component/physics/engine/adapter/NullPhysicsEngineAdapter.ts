module wd {
    export class NullPhysicsEngineAdapter implements IPhysicsEngineAdapter {
        public static create() {
            var obj = new this();

            return obj;
        }

        public world:any = null;

        public getGravity(gravity:number){
            return null;
        }

        public setGravity( gravity:Vector3){
        }

        public getFriction(obj:GameObject, friction:number){
            return null;
        }

        public setFriction(obj:GameObject, friction:number){
        }

        public getRestitution(obj:GameObject, restitution:number){
            return null;
        }

        public setRestitution(obj:GameObject, restitution:number){
        }

        public getLinearDamping(obj:GameObject){
            return null;
        }

        public setLinearDamping(obj:GameObject, linearDamping:number){
        }

        public getAngularDamping(obj:GameObject){
            return null;
        }

        public setAngularDamping(obj:GameObject, angularDamping:number){
        }

        public getMass(obj:GameObject){
            return null;
        }

        public setMass(obj:GameObject, mass:number){
        }

        public getVelocity(obj:GameObject){
            return null;
        }

        public setVelocity(obj:GameObject, velocity:Vector3){
        }

        public getAngularVelocity(obj:GameObject){
            return null;
        }

        public setAngularVelocity(obj:GameObject, angularVelocity:Vector3){
        }

        public init() {
        }

        public addDynamicBody(entityObject:GameObject, data:any) {
        }

        public addKinematicBody(entityObject:GameObject, data:any) {
        }

        public addStaticBody(entityObject:GameObject, data:any) {
        }

        public addLockConstraint(entityObject:GameObject, lockConstraint:LockConstraint){
        }

        public removeLockConstraint(entityObject:GameObject){
        }

        public addDistanceConstraint(entityObject:GameObject, distanceConstraint:DistanceConstraint){
        }

        public removeDistanceConstraint(entityObject:GameObject){
        }

        public addHingeConstraint(entityObject:GameObject, hingeConstraint:HingeConstraint){
        }

        public removeHingeConstraint(entityObject:GameObject){
        }

        public addPointToPointConstraint(entityObject:GameObject, pointToPointConstraint:PointToPointConstraint){
        }

        public removePointToPointConstraint(pointToPointConstraint:PointToPointConstraint){
        }

        public removeGameObject(obj:GameObject){
        }

        public removeConstraints(obj:GameObject){
        }

        public update(elapsed:number):void {
        }
    }
}

