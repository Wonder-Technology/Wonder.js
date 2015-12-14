/// <reference path="../../../filePath.d.ts"/>
module wd{
    export abstract class PhysicsConstraint{
        constructor(rigidBody:RigidBody){
            this.rigidBody = rigidBody;
        }

        public maxForce:number = null;

        protected rigidBody:RigidBody = null;
    }

    export class LockConstraint extends PhysicsConstraint{
        public static create(rigidBody:RigidBody) {
            var obj = new this(rigidBody);

            return obj;
        }

        private _connectedBody:RigidBody = null;
        get connectedBody(){
            return this._connectedBody;
        }
        set connectedBody(connectedBody:RigidBody){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._connectedBody = connectedBody;

            if(!this.rigidBody.isPhysicsEngineAdapterExist()){
                return;
            }

            engineAdapter = this.rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removeLockConstraint(this.rigidBody.gameObject);

            this.rigidBody.addConstraint();
        }
    }

    export class DistanceConstraint extends PhysicsConstraint{
        public static create(rigidBody:RigidBody) {
            var obj = new this(rigidBody);

            return obj;
        }

        private _connectedBody:RigidBody = null;
        get connectedBody(){
            return this._connectedBody;
        }
        set connectedBody(connectedBody:RigidBody){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._connectedBody = connectedBody;

            if(!this.rigidBody.isPhysicsEngineAdapterExist()){
                return;
            }

            engineAdapter = this.rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removeDistanceConstraint(this.rigidBody.gameObject);

            this.rigidBody.addConstraint();
        }

        //todo support change distance
        public distance:number = null;
    }

    export class HingeConstraint extends PhysicsConstraint{
        public static create(rigidBody:RigidBody) {
            var obj = new this(rigidBody);

            return obj;
        }

        private _connectedBody:RigidBody = null;
        get connectedBody(){
            return this._connectedBody;
        }
        set connectedBody(connectedBody:RigidBody){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._connectedBody = connectedBody;

            if(!this.rigidBody.isPhysicsEngineAdapterExist()){
                return;
            }

            engineAdapter = this.rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removeHingeConstraint(this.rigidBody.gameObject);

            this.rigidBody.addConstraint();
        }

        //todo support change pivot
        public pivotA:Vector3 = null;
        public pivotB:Vector3 = null;
        //todo support change axis
        public axisA:Vector3 = null;
        public axisB:Vector3 = null;
    }

    export class PointToPointConstraint extends PhysicsConstraint{
        public static create(rigidBody:RigidBody) {
            var obj = new this(rigidBody);

            return obj;
        }

        public connectedBody:RigidBody = null;

        //todo support change pivot
        public pivotA:Vector3 = null;
        public pivotB:Vector3 = null;
    }

    export class PointToPointConstraintList{
        public static create(rigidBody:RigidBody) {
            var obj = new this(rigidBody);

            return obj;
        }

        constructor(rigidBody:RigidBody){
            this._rigidBody = rigidBody;
        }

        private _rigidBody:RigidBody = null;
        private _list:wdCb.Collection<PointToPointConstraint> = wdCb.Collection.create<PointToPointConstraint>();

        public forEach(func:(PointToPointConstraint) => void, context = root){
            this._list.forEach(func, context);
        }

        public getCount(){
            return this._list.getCount();
        }

        public addChild(constraint:PointToPointConstraint){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._list.addChild(constraint);

            if(!this._rigidBody.isPhysicsEngineAdapterExist()){
                return;
            }

            engineAdapter = this._rigidBody.getPhysicsEngineAdapter();

            engineAdapter.addPointToPointConstraint(this._rigidBody.gameObject, constraint);
        }

        public addChildren(arg:Array<PointToPointConstraint>|wdCb.List<PointToPointConstraint>){
            if(JudgeUtils.isArray(arg)){
                for(let constraint of <Array<PointToPointConstraint>>arg){
                    this.addChild(constraint);
                }
            }
            else{
                let constraintList = <wdCb.List<PointToPointConstraint>>arg;

                constraintList.forEach((constraint:PointToPointConstraint) => {
                    this.addChild(constraint);
                }, this);
            }
        }

        public removeChild(constraint:PointToPointConstraint){
            var engineAdapter = null;

            this._list.removeChild(constraint);

            if(!this._rigidBody.isPhysicsEngineAdapterExist()){
                return;
            }

            engineAdapter = this._rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removePointToPointConstraint(constraint);
        }
    }

}
