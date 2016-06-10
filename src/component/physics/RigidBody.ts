module wd {
    export abstract class RigidBody extends Component {
        private _friction:number = 0;
        @operateBodyDataGetterAndSetter("Friction")
        @cloneAttributeAsBasicType()
        get friction(){
            return this._friction;
        }
        set friction(friction:number){
            this._friction = friction;
        }

        private _restitution:number = 0;
        @operateBodyDataGetterAndSetter("Restitution")
        @cloneAttributeAsBasicType()
        get restitution(){
            return this._restitution;
        }
        set restitution(restitution:number){
            this._restitution = restitution;
        }

        private _children:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        @cloneAttributeAsCloneable()
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

        @cloneAttributeAsCloneable({
            isInjectTarget:true
        })
        public lockConstraint:LockConstraint = LockConstraint.create(this);
        @cloneAttributeAsCloneable({
            isInjectTarget:true
        })
        public distanceConstraint:DistanceConstraint = DistanceConstraint.create(this);
        @cloneAttributeAsCloneable({
            isInjectTarget:true
        })
        public hingeConstraint:HingeConstraint = HingeConstraint.create(this);
        @cloneAttributeAsCloneable({
            isInjectTarget:true
        })
        public pointToPointConstraintList:PointToPointConstraintList = PointToPointConstraintList.create(this);

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:PhysicsEngine = PhysicsEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
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
            super.removeFromObject(entityObject);

            PhysicsEngine.getInstance().removeChild(this);

        }

        public dispose(){
            this._children.forEach((child:GameObject) => {
                child.removeTag("isRigidbodyChild");
            }, this);
        }

        public getPhysicsEngineAdapter() {
            return PhysicsEngine.getInstance().physicsEngineAdapter;
        }

        public isPhysicsEngineAdapterExist(){
            return !!this.getPhysicsEngineAdapter();
        }

        @execOnlyOnce("_initBody")
        public initBody(){
            this.addBody();
        }

        @execOnlyOnce("_initConstraint")
        public initConstraint(){
            this.addConstraint();
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
            ScriptEngine.getInstance().execEntityObjectScriptWithData(this.entityObject, "onContact", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionStart(collideObject:GameObject) {
            ScriptEngine.getInstance().execEntityObjectScriptWithData(this.entityObject, "onCollisionStart", wdCb.Collection.create([collideObject]));
        }

        private _onCollisionEnd() {
            ScriptEngine.getInstance().execEntityObjectScript(this.entityObject, "onCollisionEnd");
        }

        private _isContainer(entityObject:GameObject){
            var rigidBody = entityObject.getComponent<RigidBody>(RigidBody);

            return rigidBody.children.getCount() > 0;
        }
    }
}
