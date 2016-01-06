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

        @require(function(entityObject:GameObject, pointToPointConstraint:PointToPointConstraint){
            assert(this.gameObjectList.findBodyByGameObject(entityObject) !== null, Log.info.FUNC_SHOULD("add rigid body"));
            assert(this.findBody(pointToPointConstraint.connectedBody), Log.info.FUNC_SHOULD("add connectedBody"));
        })
        public addConstraint(entityObject:GameObject, wonderConstraint:any){
            var constraint = null,
                body:CANNON.Body = this.gameObjectList.findBodyByGameObject(entityObject);

            constraint = this.createCannonConstraint(body, wonderConstraint);

            this.world.addConstraint(constraint);

            this.addToConstraintDataList(entityObject, wonderConstraint, constraint);
        }

        protected abstract createCannonConstraint(body:CANNON.Body, wonderConstraint:PhysicsConstraint):CANNON.Constraint;
        protected abstract addToConstraintDataList(entityObject:GameObject, wonderConstraint:PhysicsConstraint, cannonConstraint:CANNON.Constraint):void;

        protected findBody(rigidBody:RigidBody){
            return this.gameObjectList.findBodyByGameObject(rigidBody.entityObject);
        }
    }
}
