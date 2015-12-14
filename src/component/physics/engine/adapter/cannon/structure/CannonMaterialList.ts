/// <reference path="../../../../../../filePath.d.ts"/>
module wd {
    export class CannonMaterialList{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _dataList:wdCb.Collection<CannonMaterialData> = wdCb.Collection.create<CannonMaterialData>();

        public remove(obj:GameObject){
            this._dataList.removeChild(({gameObject, material}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }

        public findMaterialByGameObject(obj:GameObject){
            var result = this._dataList.findOne(({gameObject, material}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });

            return result !== null ? result.material : null;
        }

        public add(obj:GameObject, material:CANNON.Material){
            this._dataList.addChild({
                gameObject:obj,
                material:material
            });
        }

        public addContactMaterial(world:CANNON.World, currentMaterial:CANNON.Material, friction:number, restitution:number){
            this._dataList.forEach(({gameObject, material}) => {
                world.addContactMaterial(new CANNON.ContactMaterial(material, currentMaterial, {
                    friction: friction,
                    restitution: restitution
                }));
            });
        }

        public getContactMaterialData(world:CANNON.World, currentMaterial:CANNON.Material, dataName:string){
            var result = null;

            this._dataList.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                result = contactMaterial[dataName];

                return wdCb.$BREAK;
            });

            return result;
        }

        public getContactMaterials(world:CANNON.World, currentMaterial:CANNON.Material){
            var resultArr = [];

            this._dataList.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                resultArr.push(contactMaterial);
            });

            return resultArr;
        }

        public setContactMaterialData(world:CANNON.World, currentMaterial:CANNON.Material, dataName:string, data:any){
            this._dataList.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                contactMaterial[dataName] = data;
            });
        }
    }

    export type CannonMaterialData = {
        gameObject:GameObject,
        material:CANNON.Material
    }
}
