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

    export class LockConstraint{
        public static create(rigidBody:RigidBody) {
        	var obj = new this(rigidBody);

        	return obj;
        }

        constructor(rigidBody:RigidBody){
            this._rigidBody = rigidBody;
        }

        private _connectedBody:RigidBody = null;
        get connectedBody(){
            return this._connectedBody;
        }
        set connectedBody(connectedBody:RigidBody){
            var engineAdapter:IPhysicsEngineAdapter = null;

            this._connectedBody = connectedBody;

            if(!this._rigidBody.isPhysicsEngineAdapterExist()){
                return;
            }

            engineAdapter = this._rigidBody.getPhysicsEngineAdapter();

            engineAdapter.removeLockConstraint(this._rigidBody.gameObject);

            this._rigidBody.addConstraint();
        }

        public maxForce:number = null;

        private _rigidBody:RigidBody = null;
    }
}
