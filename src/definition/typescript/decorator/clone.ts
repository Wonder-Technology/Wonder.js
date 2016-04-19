module wd {
    var getCloneAttributeMembers = (obj:any) => {
        return obj[buildMemberContainerAttributeName(obj)];
    };

    var setCloneAttributeMembers = (obj:any, members:wdCb.Collection<CloneMemberData>) => {
        obj[buildMemberContainerAttributeName(obj)] = members;
    };

    var searchCloneAttributeMembers = (obj:any) => {
        const CLONE_MEMBER_PREFIX = "__decorator_clone";
        var result = null;

        for(let memberName in obj){
            if(obj.hasOwnProperty(memberName)){
                if(memberName.indexOf(CLONE_MEMBER_PREFIX) > -1){
                    result = obj[memberName];
                    break;
                }
            }
        }

        return result;
    };

    var getAllCloneAttributeMembers = (obj:any) => {
        const IS_GATHERED_ATTRIBUTE_NAME = `__decorator_clone_isGathered_${obj.constructor.name}_cloneAttributeMembers`;
        //var result = wdCb.Hash.create<any>();
        var result = wdCb.Collection.create<CloneMemberData>();
        var gather = (obj:any) => {
                if(!obj){
                    return;
                }

                if(obj[IS_GATHERED_ATTRIBUTE_NAME]){
                    let members = getCloneAttributeMembers(obj);

                    assert(members, Log.info.FUNC_NOT_EXIST(`${buildMemberContainerAttributeName(obj)}`));

                    result.addChildren(members);
                    return;
                }

                gather(obj.__proto__);

                /*! it should ensure the order is: parent members->child members
                so here go to the top parent, then add the members to result down side
                  */

                let members = searchCloneAttributeMembers(obj);
                if(members){
                    result.addChildren(members);
                }
            },
            setGatheredResult = () => {
                setCloneAttributeMembers(obj.__proto__, result);
                obj.__proto__[IS_GATHERED_ATTRIBUTE_NAME] = true;
            };

        gather(obj.__proto__);
        setGatheredResult();

        return getCloneAttributeMembers(obj);
    };

    var initCloneAttributeMembers = (obj:any) => {
        setCloneAttributeMembers(obj, wdCb.Collection.create<CloneMemberData>());
    };

    var buildMemberContainerAttributeName = (obj:any) => {
        return `__decorator_clone_${obj.constructor.name}_cloneAttributeMembers`;
    };

    var generateCloneableMember = (cloneType:CloneType, ...cloneDataArr) => {
        return (target:any, memberName:string | symbol) => {
            if (!getCloneAttributeMembers(target)) {
                initCloneAttributeMembers(target);
            }

            getCloneAttributeMembers(target).addChild( {
                memberName:memberName,
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
            var cloneAttributeMembers:wdCb.Collection<CloneMemberData> = getAllCloneAttributeMembers(source),
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

            cloneAttributeMembers.forEach(({memberName, cloneType, cloneDataArr}) => {
                switch (cloneType){
                    case CloneType.CLONEABLE:
                        if(source[memberName] !== null && source[memberName] !== void 0){
                            target[memberName] = source[memberName].clone();
                        }
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

    type CloneMemberData = {
        memberName:string,
        cloneType: CloneType,
        cloneDataArr: Array<any>
    }

    export enum CloneType{
        CLONEABLE,
        BASIC,
        CUSTOM
    }
}

