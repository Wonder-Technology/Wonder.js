/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export class CannonStaticBody extends CannonBody {
        public static create(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, materialList:CannonMaterialList) {
            var obj = new this(world, gameObjectDataList, materialList);

            return obj;
        }

        protected createBody({
            }):CANNON.Body{
            return new CANNON.Body({
                mass: 0
            });
        }
    }
}

