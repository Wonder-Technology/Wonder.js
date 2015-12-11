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

    function lowerFirstChar(str){
        var firstChar = str.slice(0, 1);

        return `${firstChar.toLowerCase()}${str.slice(1)}`;
    }
}
