module wd {
    var generateCloneableMember = (cloneType:CloneType, ...dataArr) => {
        return (target:any, memberName:string | symbol) => {
            if (!target.__decorator_cloneAttributeMembers) {
                target.__decorator_cloneAttributeMembers = wdCb.Hash.create<any>();
            }

            target.__decorator_cloneAttributeMembers.addChild(memberName, {
                cloneType: cloneType,
                dataArr: dataArr
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

    export function cloneAttributeAsCustomType(cloneFunc:(source:any, target:any, memberName:string, data:any) => void) {
        return generateCloneableMember(CloneType.CUSTOM, cloneFunc);
    }

    export class CloneHelper{
        public static clone<T>(source:T, target:T, data:any = null):T{
            var cloneAttributeMembers = (<any>source).__decorator_cloneAttributeMembers;

            if(!cloneAttributeMembers){
                return target;
            }

            cloneAttributeMembers.forEach(({cloneType, dataArr}, memberName:string) => {
                switch (cloneType){
                    case CloneType.CLONEABLE:
                        target[memberName] = source[memberName].clone();
                        break;
                    case CloneType.BASIC:
                        target[memberName] = source[memberName];
                        break;
                    case CloneType.CUSTOM:
                        let cloneFunc = dataArr[0];

                        cloneFunc(source, target, memberName, data);
                        break;
                }
            });

            return target;
        }
    }

    export enum CloneType{
        CLONEABLE,
        BASIC,
        CUSTOM
    }
}

