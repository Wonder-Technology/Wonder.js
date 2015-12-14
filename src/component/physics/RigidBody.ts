/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class RigidBody extends Component {
        private _friction:number = 0;
        @operateBodyDataGetterAndSetter("Friction")
        get friction(){
            return this._friction;
        }
        set friction(friction:number){
            this._friction = friction;
        }

        private _restitution:number = 0;
        @operateBodyDataGetterAndSetter("Restitution")
        get restitution(){
            return this._restitution;
        }
        set restitution(restitution:number){
            this._restitution = restitution;
        }

        private _children:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        get children(){
            return  this._children;
        }
        set children(children:any){
            if(JudgeUtils.isArray(children)){
                let arr = <Array<GameObject>>children;

                this._children = wdCb.Collection.create<GameObject>(arr);
            }
            else{
                let list = <wdCb.Collection<GameObject>>children;

                this._children = list;
            }

            this._children.forEach((child:GameObject) => {
                child.isRigidbodyChild = true;
            });
        }

        public lockConstraint:LockConstraint = LockConstraint.create(this);
        public distanceConstraint:DistanceConstraint = DistanceConstraint.create(this);
        public hingeConstraint:HingeConstraint = HingeConstraint.create(this);
        public pointToPointConstraintList:PointToPointConstraintList = PointToPointConstraintList.create(this);


        public init() {
            var self = this;

            /*!
            addBody should after its and its children's collider component init
             */
            EventManager.on(<any>EngineEvent.AFTER_INIT, () => {
                self.addBody();
            });

            /*!
            add constraint should after all body added
             */
            EventManager.on(<any>EngineEvent.AFTER_INIT_RIGIDBODY_ADD_CONSTRAINT, () => {
                self.addConstraint();
            });
        }

        public addConstraint(){
            var engineAdapter:IPhysicsEngineAdapter = this.getPhysicsEngineAdapter();

            if(this.lockConstraint && this.lockConstraint.connectedBody){
                engineAdapter.addLockConstraint(this.gameObject, this.lockConstraint);
            }

            if(this.distanceConstraint && this.distanceConstraint.connectedBody){
                engineAdapter.addDistanceConstraint(this.gameObject, this.distanceConstraint);
            }

            if(this.hingeConstraint && this.hingeConstraint.connectedBody){
                engineAdapter.addHingeConstraint(this.gameObject, this.hingeConstraint);
            }

            if(this.pointToPointConstraintList && this.pointToPointConstraintList.getCount() > 0){
                this.pointToPointConstraintList.forEach((constraint:PointToPointConstraint) => {
                    engineAdapter.addPointToPointConstraint(this.gameObject, constraint);
                }, this);
            }
        }

        public dispose(){
            this._children.forEach((child:GameObject) => {
                child.isRigidbodyChild = false;
            });

            this.getPhysicsEngineAdapter().removeGameObject(this.gameObject);
        }

        public getPhysicsEngineAdapter() {
            return Director.getInstance().scene.physicsEngineAdapter;
        }

        public isPhysicsEngineAdapterExist(){
            return !!Director.getInstance().scene && !!Director.getInstance().scene.physicsEngineAdapter;
        }

        protected abstract addBody();

        @require(function () {
            if(this._isContainer(this.gameObject)){
                assert(!this.gameObject.getComponent(Collider), Log.info.FUNC_SHOULD_NOT("container", "add collider component in the case of compound"));
            }
            else{
                assert(!!this.gameObject.getComponent(Collider), Log.info.FUNC_MUST_DEFINE("collider component when add rigid body component"));
                assert(!!this.gameObject.getComponent(Collider).shape, Log.info.FUNC_SHOULD("create collider.shape before adding rigid body component"));
            }
        })
        protected addBodyToPhysicsEngine(method:string, data:any = {}) {
            var engineAdapter:IPhysicsEngineAdapter = this.getPhysicsEngineAdapter(),
                position = this.gameObject.transform.position,
                rotation = this.gameObject.transform.rotation;

            engineAdapter[method](
                this.gameObject, wdCb.ExtendUtils.extend({
                    position: position,
                    rotation: rotation,

                    children: this._children,

                    lockConstraint: this.lockConstraint,

                    onContact: wdCb.FunctionUtils.bind(this, this._onContact),
                    onCollisionStart: wdCb.FunctionUtils.bind(this, this._onCollisionStart),
                    onCollisionEnd: wdCb.FunctionUtils.bind(this, this._onCollisionEnd),

                    friction: this.friction,
                    restitution: this.restitution
                }, data)
            );
        }

        private _onContact(collideObject:GameObject) {
            this.gameObject.execScript("onContact", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionStart(collideObject:GameObject) {
            this.gameObject.execScript("onCollisionStart", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionEnd() {
            this.gameObject.execScript("onCollisionEnd");
        }

        private _isContainer(gameObject:GameObject){
            var rigidBody = gameObject.getComponent<RigidBody>(RigidBody);

            return rigidBody.children.getCount() > 0;
        }
    }

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
