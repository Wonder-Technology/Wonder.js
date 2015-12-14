/// <reference path="../../../../../../filePath.d.ts"/>
module wd{
    export class CannonLockConstraint extends CannonConstraint{
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonLockConstraintDataList) {
        	var obj = new this(world, gameObjectDataList, constraintDataList);

        	return obj;
        }

        constructor(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonLockConstraintDataList) {
            super();

            this.world = world;
            this.gameObjectList = gameObjectDataList;
            this.constraintDataList = constraintDataList;
        }

        protected world:CANNON.World = null;
        protected gameObjectList:CannonGameObjectDataList = null;
        protected constraintDataList:CannonLockConstraintDataList = CannonLockConstraintDataList.create();


        @require(function(gameObject:GameObject, lockConstraint:LockConstraint){
            assert(this.gameObjectList.findBodyByGameObject(gameObject) !== null, Log.info.FUNC_SHOULD("add rigid body"));
            assert(this._findBody(lockConstraint.connectedBody), Log.info.FUNC_SHOULD("add connectedBody"));
        })
        public addConstraint(gameObject:GameObject, lockConstraint:LockConstraint){
            var constraint = null,
                body:CANNON.Body = this.gameObjectList.findBodyByGameObject(gameObject),
                connectedBody:CANNON.Body = this._findBody(lockConstraint.connectedBody);

            if(lockConstraint.maxForce){
                constraint = new CANNON.LockConstraint(body, connectedBody, lockConstraint.maxForce);
            }
            else{
                constraint = new CANNON.LockConstraint(body, connectedBody);
            }

            this.world.addConstraint(constraint);

            this.constraintDataList.add(gameObject, constraint);
        }

        public removeConstraint(gameObject:GameObject){
            var constraint = this.constraintDataList.findConstraintByGameObject(gameObject);

            if(constraint){
                this.world.removeConstraint(constraint);
            }

            this.constraintDataList.remove(gameObject);
        }

        private _findBody(rigidBody:RigidBody){
            return this.gameObjectList.findBodyByGameObject(rigidBody.gameObject);
        }
    }
}
