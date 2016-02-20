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
            if(JudgeUtils.isArrayExactly(children)){
                let arr = <Array<GameObject>>children;

                this._children = wdCb.Collection.create<GameObject>(arr);
            }
            else{
                let list = <wdCb.Collection<GameObject>>children;

                this._children = list;
            }

            this._children.forEach((child:GameObject) => {
                child.addTag("isRigidbodyChild");
            });
        }

        public entityObject:GameObject;

        public lockConstraint:LockConstraint = LockConstraint.create(this);
        public distanceConstraint:DistanceConstraint = DistanceConstraint.create(this);
        public hingeConstraint:HingeConstraint = HingeConstraint.create(this);
        public pointToPointConstraintList:PointToPointConstraintList = PointToPointConstraintList.create(this);

        private _afterInitSubscription:wdFrp.IDisposable = null;
        private _afterInitRigidbodyAddConstraintSubscription:wdFrp.IDisposable = null;

        public init() {
            var self = this;

            /*!
            addBody should after its and its children's collider component init
             */
            this._afterInitSubscription = EventManager.fromEvent(<any>EEngineEvent.AFTER_GAMEOBJECT_INIT)
                .subscribe(() => {
                    self._afterInitHandler();
                });

            /*!
            add constraint should after all body added
             */
            this._afterInitRigidbodyAddConstraintSubscription = EventManager.fromEvent(<any>EEngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT)
                .subscribe(() => {
                    self._afterInitRigidbodyAddConstraintHandler();
                });
        }

        public addConstraint(){
            var engineAdapter:IPhysicsEngineAdapter = this.getPhysicsEngineAdapter();

            if(this.lockConstraint && this.lockConstraint.connectedBody){
                engineAdapter.addLockConstraint(this.entityObject, this.lockConstraint);
            }

            if(this.distanceConstraint && this.distanceConstraint.connectedBody){
                engineAdapter.addDistanceConstraint(this.entityObject, this.distanceConstraint);
            }

            if(this.hingeConstraint && this.hingeConstraint.connectedBody){
                engineAdapter.addHingeConstraint(this.entityObject, this.hingeConstraint);
            }

            if(this.pointToPointConstraintList && this.pointToPointConstraintList.getCount() > 0){
                this.pointToPointConstraintList.forEach((constraint:PointToPointConstraint) => {
                    engineAdapter.addPointToPointConstraint(this.entityObject, constraint);
                }, this);
            }
        }

        public removeFromObject(entityObject:GameObject){
            var engineAdapter:IPhysicsEngineAdapter = this.getPhysicsEngineAdapter();

            if(engineAdapter){
                this.getPhysicsEngineAdapter().removeGameObject(entityObject);

                this.getPhysicsEngineAdapter().removeConstraints(entityObject);
            }

            super.removeFromObject(entityObject);
        }

        public dispose(){
            this._children.forEach((child:GameObject) => {
                child.removeTag("isRigidbodyChild");
            }, this);

            this._afterInitSubscription && this._afterInitSubscription.dispose();
            this._afterInitRigidbodyAddConstraintSubscription && this._afterInitRigidbodyAddConstraintSubscription.dispose();
        }

        public getPhysicsEngineAdapter() {
            return Director.getInstance().scene.physicsEngineAdapter;
        }

        public isPhysicsEngineAdapterExist(){
            return !!Director.getInstance().scene && !!Director.getInstance().scene.physicsEngineAdapter;
        }

        protected abstract addBody();

        @require(function () {
            if(this._isContainer(this.entityObject)){
                assert(!this.entityObject.getComponent(Collider), Log.info.FUNC_SHOULD_NOT("container", "add collider component in the case of compound"));
            }
            else{
                assert(!!this.entityObject.getComponent(Collider), Log.info.FUNC_MUST_DEFINE("collider component when add rigid body component"));
                assert(!!this.entityObject.getComponent(Collider).shape, Log.info.FUNC_SHOULD("create collider.shape before adding rigid body component"));
            }
        })
        protected addBodyToPhysicsEngine(method:string, data:any = {}) {
            var engineAdapter:IPhysicsEngineAdapter = this.getPhysicsEngineAdapter(),
                position = this.entityObject.transform.position,
                rotation = this.entityObject.transform.rotation;

            engineAdapter[method](
                this.entityObject, wdCb.ExtendUtils.extend({
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
            this.entityObject.execScript("onContact", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionStart(collideObject:GameObject) {
            this.entityObject.execScript("onCollisionStart", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionEnd() {
            this.entityObject.execScript("onCollisionEnd");
        }

        private _isContainer(entityObject:GameObject){
            var rigidBody = entityObject.getComponent<RigidBody>(RigidBody);

            return rigidBody.children.getCount() > 0;
        }

        @execOnlyOnce("_isAfterInit")
        private _afterInitHandler(){
            this.addBody();
        }

        @execOnlyOnce("_isAfterInitRigidbodyAddConstraint")
        private _afterInitRigidbodyAddConstraintHandler(){
            this.addConstraint();
        }
    }
}
