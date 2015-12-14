/// <reference path="../../../../../../filePath.d.ts"/>
module wd{
    export abstract class CannonConstraint{
        constructor(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:any) {
            this.world = world;
            this.gameObjectList = gameObjectDataList;
            this.constraintDataList = constraintDataList;
        }

        protected world:CANNON.World = null;
        protected gameObjectList:CannonGameObjectDataList = null;
        protected constraintDataList:any = null;

        @require(function(gameObject:GameObject, pointToPointConstraint:PointToPointConstraint){
            assert(this.gameObjectList.findBodyByGameObject(gameObject) !== null, Log.info.FUNC_SHOULD("add rigid body"));
            assert(this.findBody(pointToPointConstraint.connectedBody), Log.info.FUNC_SHOULD("add connectedBody"));
        })
        public addConstraint(gameObject:GameObject, wonderConstraint:any){
            var constraint = null,
                body:CANNON.Body = this.gameObjectList.findBodyByGameObject(gameObject);

            constraint = this.createCannonConstraint(body, wonderConstraint);

            this.world.addConstraint(constraint);

            this.addToConstraintDataList(gameObject, wonderConstraint, constraint);
        }

        protected abstract createCannonConstraint(body:CANNON.Body, wonderConstraint:PhysicsConstraint):CANNON.Constraint;
        protected abstract addToConstraintDataList(gameObject:GameObject, wonderConstraint:PhysicsConstraint, cannonConstraint:CANNON.Constraint):void;

        protected findBody(rigidBody:RigidBody){
            return this.gameObjectList.findBodyByGameObject(rigidBody.gameObject);
        }
    }
}
