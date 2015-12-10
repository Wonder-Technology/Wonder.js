/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class RigidBody extends Component {
        public sequenceNumber:number = 2;
        public friction:number = 0;
        public restitution:number = 0;

        public init() {
            this.addBody();
        }

        protected abstract addBody();

        protected isPhysicsEngineAdapterExist(){
            return !!Director.getInstance().scene && !!Director.getInstance().scene.physicsEngineAdapter;
        }

        @require(function () {
            assert(this.gameObject.getComponent(Collider), Log.info.FUNC_MUST_DEFINE("collider component when add rigid body component"));
            assert(this.gameObject.getComponent(Collider).shape, Log.info.FUNC_SHOULD("create collider.shape before adding rigid body component"));
        })
        protected addBodyToPhysicsEngine(method:string, data:any = {}) {
            var engineAdapter:IPhysicsEngineAdapter = this.getPhysicsEngineAdapter(),
                position = this.gameObject.transform.position,
                rotation = this.gameObject.transform.rotation,
                shape = this.gameObject.getComponent<Collider>(Collider).shape;

            engineAdapter[method](
                this.gameObject, shape, wdCb.ExtendUtils.extend({
                    position: position,
                    rotation: rotation,

                    onContact: wdCb.FunctionUtils.bind(this, this._onContact),
                    onCollisionStart: wdCb.FunctionUtils.bind(this, this._onCollisionStart),
                    onCollisionEnd: wdCb.FunctionUtils.bind(this, this._onCollisionEnd),

                    friction: this.friction,
                    restitution: this.restitution
                }, data)
            );
        }

        protected getPhysicsEngineAdapter() {
            return Director.getInstance().scene.physicsEngineAdapter;
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
    }
}

