module wd {
    export function operateBodyDataGetterAndSetter(dataName) {
        return function (target, name, descriptor) {
            var getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function () {
                let data = this.getPhysicsComponentContainerAdapter()[`get${dataName}`](this.entityObject);

                return data !== null ? data : this[`_${lowerFirstChar(dataName)}`];
            };

            descriptor.set = function(val){
                setter.call(this, val);

                this.getPhysicsComponentContainerAdapter()[`set${dataName}`](this.entityObject, val);
            };

            return descriptor;
        }
    }


    export function operateWorldDataGetterAndSetter(dataName) {

        return function (target, name, descriptor) {
                var getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function () {
                var physicsEngineAdapter:IPhysicsEngineAdapter = PhysicsComponentContainer.getInstance().physicsEngineAdapter;

                if(isWorldDefined(physicsEngineAdapter)){
                    let data = physicsEngineAdapter[`get${dataName}`]();

                    return data !== null ? data : this[`_${lowerFirstChar(dataName)}`];
                }

                return getter.call(this);
            };

            descriptor.set = function(val){
                var physicsEngineAdapter:IPhysicsEngineAdapter = PhysicsComponentContainer.getInstance().physicsEngineAdapter;

                setter.call(this, val);

                if(isWorldDefined(physicsEngineAdapter)){
                    physicsEngineAdapter[`set${dataName}`](val);
                }
            };

            return descriptor;
        }
    }

    function isWorldDefined(physicsEngineAdapter:IPhysicsEngineAdapter){
        return physicsEngineAdapter && physicsEngineAdapter.world;
    }

    function lowerFirstChar(str){
        var firstChar = str.slice(0, 1);

        return `${firstChar.toLowerCase()}${str.slice(1)}`;
    }
}
