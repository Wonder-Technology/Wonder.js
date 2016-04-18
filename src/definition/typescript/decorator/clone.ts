module wd {
    var getCloneAttributeMembers = (obj:any) => {
        return obj[`___decorator_cloneAttributeMembers`];
    };

    var initCloneAttributeMembers = (obj:any) => {
        obj[`___decorator_cloneAttributeMembers`] = wdCb.Hash.create<any>();
    };

    var generateCloneableMember = (cloneType:CloneType, ...cloneDataArr) => {
        return (target:any, memberName:string | symbol) => {
            if (!getCloneAttributeMembers(target)) {
                initCloneAttributeMembers(target);
            }

            getCloneAttributeMembers(target).addChild(memberName, {
                cloneType: cloneType,
                cloneDataArr: cloneDataArr
            });
        }
    };

    export function cloneAttributeAsBasicType() {
        return generateCloneableMember(CloneType.BASIC);
    }

    export function cloneAttributeAsCloneable() {
        return generateCloneableMember(CloneType.CLONEABLE);
    }

    export function cloneAttributeAsCustomType(cloneFunc:(source:any, target:any, memberName:string, cloneData:any) => void) {
        return generateCloneableMember(CloneType.CUSTOM, cloneFunc);
    }

    export class CloneHelper{
        @require(function(source:any, cloneData:any = null, createDataArr:Array<any> = null){
            assert(!!source.constructor.name, Log.info.FUNC_CAN_NOT("get class name from source.constructor.name"));

            if(createDataArr){
                assert(JudgeUtils.isArrayExactly(createDataArr), Log.info.FUNC_MUST_BE("param:createDataArr", "be arr"));
            }
        })
        public static clone<T>(source:T, cloneData:any = null, createDataArr:Array<any> = null):T{
            var cloneAttributeMembers = getCloneAttributeMembers(source),
                className = (<any>source.constructor).name,
                target = null;

            if(createDataArr){
                target = wd[className].create.apply(wd[className], createDataArr);
            }
            else{
                target = wd[className].create();
            }

            if(!cloneAttributeMembers){
                return target;
            }

            cloneAttributeMembers.forEach(({cloneType, cloneDataArr}, memberName:string) => {
                /*!
             the "cloneAttributeMembers" is existed in the parent of the class and its children classes share the "cloneAttributeMembers"!(the "cloneAttributeMembers" isn't existed in the instance because it is add to the data at build time.)
             so here need judge to exclude the member of sibling classes
             (but here still may be wrong in the case: the sibling classes has the same attri that need be cloned.
             in this case, it should mannually define the "clone" method)
                 */
                if(target[memberName] === void 0 && source[memberName] === void 0){
                    return;
                }

                switch (cloneType){
                    case CloneType.CLONEABLE:
                        target[memberName] = source[memberName].clone();
                        break;
                    case CloneType.BASIC:
                        target[memberName] = source[memberName];
                        break;
                    case CloneType.CUSTOM:
                        let cloneFunc = cloneDataArr[0];

                        cloneFunc(source, target, memberName, cloneData);
                        break;
                }
            });

            return target;
        }

        //public static clone<T>(source:T, target:T, cloneData:any = null):T{
        //    var cloneAttributeMembers = (<any>source).__decorator_cloneAttributeMembers;
        //
        //    if(!cloneAttributeMembers){
        //        return target;
        //    }
        //
        //    cloneAttributeMembers.forEach(({cloneType, cloneDataArr}, memberName:string) => {
        //        switch (cloneType){
        //            case CloneType.CLONEABLE:
        //                target[memberName] = source[memberName].clone();
        //                break;
        //            case CloneType.BASIC:
        //                target[memberName] = source[memberName];
        //                break;
        //            case CloneType.CUSTOM:
        //                let cloneFunc = cloneDataArr[0];
        //
        //                cloneFunc(source, target, memberName, cloneData);
        //                break;
        //        }
        //    });
        //
        //    return target;
        //}
    }

    export enum CloneType{
        CLONEABLE,
        BASIC,
        CUSTOM
    }
}

