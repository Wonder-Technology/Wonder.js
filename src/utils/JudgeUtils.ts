module wd {
    export class JudgeUtils extends wdCb.JudgeUtils{
        public static isView(obj) {
            return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
        }


        public static isEqual(target1:any, target2:any){
            if((!target1 && target2) || (target1 && !target2)){
                return false;
            }

            if(target1.uid && target2.uid){
                return target1.uid === target2.uid;
            }

            return target1 === target2;
        }

        public static isPowerOfTwo(value:number) {
            return (value & (value - 1)) === 0 && value !== 0;
        }

        public static isFloatArray(data:any){
            return EntityObject.prototype.toString.call(data) === "[object Float32Array]" || EntityObject.prototype.toString.call(data) === "[object Float16Array]";
        }

        /*!
        can't use "target instanceof interface"!

        refer to:
        http://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
         https://typescript.codeplex.com/discussions/401501
         */
        public static isInterface(target:any, memberOfInterface:string){
            return !!target[memberOfInterface];
        }

        public static isOctreeObject(entityObject:EntityObject){
            return entityObject.hasComponent(Octree);
        }

        public static isSelf(self:Entity, entityObject:Entity){
            return self.uid === entityObject.uid;
        }
    }
}
