module wd{
    export abstract class PhysicsConstraint{
        constructor(rigidBody:RigidBody){
            this.rigidBody = rigidBody;
        }

        @cloneAttributeAsBasicType()
        public maxForce:number = null;

        protected rigidBody:RigidBody = null;

        public clone(rigidBody:RigidBody){
            return CloneUtils.clone(this, null, [rigidBody]);
        }
    }

    export class LockConstraint extends PhysicsConstraint{
        public static create(rigidBody:RigidBody) {
            var obj = new this(rigidBody);

            return obj;
        }

        private _connectedBody:RigidBody = null;
        @cloneAttributeAsBasicType()
        get connectedBody(){
            return this._connectedBody;
        }
        set connectedBody(connectedBody:RigidBody){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._connectedBody = connectedBody;

            engineAdapter = this.rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removeLockConstraint(this.rigidBody.entityObject);

            this.rigidBody.addConstraint();
        }
    }

    export class DistanceConstraint extends PhysicsConstraint{
        public static create(rigidBody:RigidBody) {
            var obj = new this(rigidBody);

            return obj;
        }

        private _connectedBody:RigidBody = null;
        @cloneAttributeAsBasicType()
        get connectedBody(){
            return this._connectedBody;
        }
        set connectedBody(connectedBody:RigidBody){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._connectedBody = connectedBody;

            engineAdapter = this.rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removeDistanceConstraint(this.rigidBody.entityObject);

            this.rigidBody.addConstraint();
        }

        //todo support change distance
        @cloneAttributeAsBasicType()
        public distance:number = null;
    }

    export class HingeConstraint extends PhysicsConstraint{
        public static create(rigidBody:RigidBody) {
            var obj = new this(rigidBody);

            return obj;
        }

        private _connectedBody:RigidBody = null;
        @cloneAttributeAsBasicType()
        get connectedBody(){
            return this._connectedBody;
        }
        set connectedBody(connectedBody:RigidBody){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._connectedBody = connectedBody;

            engineAdapter = this.rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removeHingeConstraint(this.rigidBody.entityObject);

            this.rigidBody.addConstraint();
        }

        //todo support change pivot
        @cloneAttributeAsCloneable()
        public pivotA:Vector3 = null;
        @cloneAttributeAsCloneable()
        public pivotB:Vector3 = null;
        //todo support change axis
        @cloneAttributeAsCloneable()
        public axisA:Vector3 = null;
        @cloneAttributeAsCloneable()
        public axisB:Vector3 = null;
    }

    export class PointToPointConstraint extends PhysicsConstraint{
        public static create() {
            var obj = new this(null);

            return obj;
        }

        @cloneAttributeAsBasicType()
        public connectedBody:RigidBody = null;

        //todo support change pivot
        @cloneAttributeAsCloneable()
        public pivotA:Vector3 = null;
        @cloneAttributeAsCloneable()
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
        @cloneAttributeAsCustomType(function(source:PointToPointConstraintList, target:PointToPointConstraintList, memberName:string){
            target[memberName] = source[memberName].clone(true);
        })
        private _list:wdCb.Collection<PointToPointConstraint> = wdCb.Collection.create<PointToPointConstraint>();

        public clone(rigidBody:RigidBody){
            return CloneUtils.clone(this, null, [rigidBody]);
        }

        public forEach(func:(PointToPointConstraint) => void, context = root){
            this._list.forEach(func, context);
        }

        public getCount(){
            return this._list.getCount();
        }

        public getChildren(){
            return this._list;
        }

        public getChild(index:number){
            return this._list.getChild(index);
        }

        public addChild(constraint:PointToPointConstraint){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._list.addChild(constraint);

            engineAdapter = this._rigidBody.getPhysicsEngineAdapter();

            engineAdapter.addPointToPointConstraint(this._rigidBody.entityObject, constraint);
        }

        public addChildren(arg:Array<PointToPointConstraint>|wdCb.List<PointToPointConstraint>){
            if(JudgeUtils.isArrayExactly(arg)){
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

            engineAdapter = this._rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removePointToPointConstraint(constraint);
        }
    }

}

