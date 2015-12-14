/// <reference path="../../../../../../filePath.d.ts"/>
module wd{
    export class CannonPointToPointConstraint extends CannonConstraint{
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonPointToPointConstraintDataList) {
        	var obj = new this(world, gameObjectDataList, constraintDataList);

        	return obj;
        }

        constructor(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, constraintDataList:CannonPointToPointConstraintDataList) {
            super();

            this.world = world;
            this.gameObjectList = gameObjectDataList;
            this.constraintDataList = constraintDataList;
        }

        protected world:CANNON.World = null;
        protected gameObjectList:CannonGameObjectDataList = null;
        protected constraintDataList:CannonPointToPointConstraintDataList = CannonPointToPointConstraintDataList.create();


        @require(function(gameObject:GameObject, pointToPointConstraint:PointToPointConstraint){
            assert(this.gameObjectList.findBodyByGameObject(gameObject) !== null, Log.info.FUNC_SHOULD("add rigid body"));
            assert(this._findBody(pointToPointConstraint.connectedBody), Log.info.FUNC_SHOULD("add connectedBody"));
        })
        public addConstraint(gameObject:GameObject, pointToPointConstraint:PointToPointConstraint){
            var constraint = null,
                body:CANNON.Body = this.gameObjectList.findBodyByGameObject(gameObject),
                connectedBody:CANNON.Body = this._findBody(pointToPointConstraint.connectedBody),
                pivotA = CannonUtils.convertToCannonVector3(pointToPointConstraint.pivotA),
                pivotB = CannonUtils.convertToCannonVector3(pointToPointConstraint.pivotB);

            if(pointToPointConstraint.maxForce){
                constraint = new CANNON.PointToPointConstraint(body, pivotA, connectedBody, pivotB, pointToPointConstraint.maxForce);
            }
            else{
                constraint = new CANNON.PointToPointConstraint(body, pivotA, connectedBody, pivotB);
            }

            this.world.addConstraint(constraint);

            this.constraintDataList.add(pointToPointConstraint, constraint);
        }

        public removeConstraint(pointToPointConstraint:PointToPointConstraint){
            var constraint = this.constraintDataList.findCannonConstraintByPointToPointConstraint(pointToPointConstraint);

            if(constraint){
                this.world.removeConstraint(constraint);
            }

            this.constraintDataList.remove(pointToPointConstraint);
        }

        private _findBody(rigidBody:RigidBody){
            return this.gameObjectList.findBodyByGameObject(rigidBody.gameObject);
        }
    }
}
