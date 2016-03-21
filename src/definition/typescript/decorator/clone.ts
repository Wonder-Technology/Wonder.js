module wd {
    var generateCloneableMember = (cloneType:CloneType, ...cloneDataArr) => {
        return (target:any, memberName:string | symbol) => {
            if (!target.__decorator_cloneAttributeMembers) {
                target.__decorator_cloneAttributeMembers = wdCb.Hash.create<any>();
            }

            target.__decorator_cloneAttributeMembers.addChild(memberName, {
                cloneType: cloneType,
                cloneDataArr: cloneDataArr
            });
            //if(cloneFunc){
            //    target.__decorator_cloneAttributeMembers.addChild(memberName, {
            //        cloneFunc: cloneFunc
            //    });
            //}
            //else{
            //    target.__decorator_cloneAttributeMembers.addChild(memberName, {});
            //}
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
            var cloneAttributeMembers = (<any>source).__decorator_cloneAttributeMembers,
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

