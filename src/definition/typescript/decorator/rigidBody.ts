/// <reference path="../../../filePath.d.ts"/>
module wd {
    export function operateBodyDataGetterAndSetter(dataName) {
        return function (target, name, descriptor) {
            var getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function () {
                if(this.isPhysicsEngineAdapterExist()){
                    let data = this.getPhysicsEngineAdapter()[`get${dataName}`](this.gameObject);

                    return data !== null ? data : this[`_${lowerFirstChar(dataName)}`];
                }

                return getter.call(this);
            };

            descriptor.set = function(val){
                setter.call(this, val);

                if(this.isPhysicsEngineAdapterExist()){
                    this.getPhysicsEngineAdapter()[`set${dataName}`](this.gameObject, val);
                }
            };

            return descriptor;
        }
    }


    export function operateWorldDataGetterAndSetter(dataName) {

        return function (target, name, descriptor) {
                var getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function () {
                var scene = Director.getInstance().scene;

                if(isWorldDefined(scene)){
                    let data = scene.physicsEngineAdapter[`get${dataName}`]();

                    return data !== null ? data : this[`_${lowerFirstChar(dataName)}`];
                }

                return getter.call(this);
            };

            descriptor.set = function(val){
                var scene = Director.getInstance().scene;

                setter.call(this, val);

                if(isWorldDefined(scene)){
                    scene.physicsEngineAdapter[`set${dataName}`](val);
                }
            };

            return descriptor;
        }
    }

    function isWorldDefined(scene:Scene){
        return scene.physicsEngineAdapter && scene.physicsEngineAdapter.world;
    }

    function lowerFirstChar(str){
        var firstChar = str.slice(0, 1);

        return `${firstChar.toLowerCase()}${str.slice(1)}`;
    }
}
