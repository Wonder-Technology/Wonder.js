import { ClassUtils } from "../../../utils/ClassUtils";
import { assert, requireCheck } from "./contract";
import { Log } from "../../../utils/Log";
import { registerClass } from "./registerClass";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import { EntityObject } from "../../../core/entityObject/EntityObject";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";

const NOT_CLONE_TAG = "not_clone";

var getCloneAttributeMembers = (obj: any) => {
    return obj[buildMemberContainerAttributeName(obj)];
};

var setCloneAttributeMembers = (obj: any, members: Collection<CloneMemberData>) => {
    obj[buildMemberContainerAttributeName(obj)] = members;
};

var searchCloneAttributeMembers = (obj: any) => {
    const CLONE_MEMBER_PREFIX = "__decorator_clone";
    var result = null;

    for (let memberName in obj) {
        if (obj.hasOwnProperty(memberName)) {
            if (memberName.indexOf(CLONE_MEMBER_PREFIX) > -1) {
                result = obj[memberName];
                break;
            }
        }
    }

    return result;
};

var getAllCloneAttributeMembers = (obj: any) => {
    const IS_GATHERED_ATTRIBUTE_NAME = `__decorator_clone_isGathered_${ClassUtils.getClassNameByInstance(obj)}_cloneAttributeMembers`;
    var result = Collection.create<CloneMemberData>();
    var gather = (obj: any) => {
        if (!obj) {
            return;
        }

        if (obj[IS_GATHERED_ATTRIBUTE_NAME]) {
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
        if (members) {
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

var initCloneAttributeMembers = (obj: any) => {
    setCloneAttributeMembers(obj, Collection.create<CloneMemberData>());
};

var buildMemberContainerAttributeName = (obj: any) => {
    return `__decorator_clone_${ClassUtils.getClassNameByInstance(obj)}_cloneAttributeMembers`;
};

var generateCloneableMember = (cloneType: CloneType, ...cloneDataArr) => {
    return (target: any, memberName: string | symbol) => {
        if (!getCloneAttributeMembers(target)) {
            initCloneAttributeMembers(target);
        }

        if (cloneDataArr.length === 1) {
            getCloneAttributeMembers(target).addChild({
                memberName: memberName,
                cloneType: cloneType,
                configData: cloneDataArr[0]
            });
        }
        else if (cloneDataArr.length === 2) {

            getCloneAttributeMembers(target).addChild({
                memberName: memberName,
                cloneType: cloneType,
                cloneFunc: cloneDataArr[0],
                configData: cloneDataArr[1]
            });
        }
    }
};

export function cloneAttributeAsBasicType(configData?: CloneAttributeAsBasicTypeConfigData) {
    return generateCloneableMember(CloneType.BASIC, ExtendUtils.extend({
        order: 0
    }, configData));
}

export function cloneAttributeAsCloneable(configData?: CloneAttributeAsCloneableConfigData) {
    return generateCloneableMember(CloneType.CLONEABLE, ExtendUtils.extend({
        order: 0
    }, configData));
}

export function cloneAttributeAsCustomType(cloneFunc: (source: any, target: any, memberName: string, cloneData: any) => void, configData?: CloneAttributeAsCustomTypeConfigData) {
    return generateCloneableMember(CloneType.CUSTOM, cloneFunc, ExtendUtils.extend({
        order: 0
    }, configData));
}

@registerClass("CloneUtils")
export class CloneUtils {
    @requireCheck(function(source: any, cloneData: any = null, createDataArr: Array<any> = null) {
        if (createDataArr) {
            assert(JudgeUtils.isArrayExactly(createDataArr), Log.info.FUNC_MUST_BE("param:createDataArr", "be arr"));
        }
    })
    public static clone<T>(sourceInstance: T, cloneData: any = null, createDataArr: Array<any> = null, target: any = null): T {
        var cloneAttributeMembers: Collection<CloneMemberData> = getAllCloneAttributeMembers(sourceInstance)
            .sort((memberDataA: any, memberDataB: any) => {
                return memberDataA.configData.order - memberDataB.configData.order;
            }),
            className = ClassUtils.getClassNameByInstance(sourceInstance);

        if (target === null) {
            if (createDataArr) {
                let _class = ClassUtils.getClass(className);

                target = _class.create.apply(_class, createDataArr);
            }
            else {
                target = ClassUtils.getClass(className).create();
            }
        }

        if (!cloneAttributeMembers) {
            return target;
        }

        cloneAttributeMembers.forEach((memberData: any) => {
            var cloneType = memberData.cloneType,
                memberName = memberData.memberName;

            switch (cloneType) {
                case CloneType.CLONEABLE:
                    if (sourceInstance[memberName] !== null && sourceInstance[memberName] !== void 0) {
                        if (target[memberName] !== null) {
                            target[memberName] = sourceInstance[memberName].clone(target[memberName]);
                        }
                        else {
                            target[memberName] = sourceInstance[memberName].clone();
                        }
                    }
                    break;
                case CloneType.BASIC:
                    target[memberName] = sourceInstance[memberName];
                    break;
                case CloneType.CUSTOM:
                    let cloneFunc = memberData.cloneFunc;

                    cloneFunc.call(target, sourceInstance, target, memberName, cloneData);
                    break;
            }
        });

        return target;
    }

    public static cloneArray(arr: Array<any> | null, isDeep: boolean = false) {
        if (arr === null) {
            return null;
        }

        if (isDeep) {
            return ExtendUtils.extendDeep(arr);
        }

        return [].concat(arr);
    }

    public static markNotClone(entityObject: EntityObject) {
        if (!entityObject.hasTag(NOT_CLONE_TAG)) {
            entityObject.addTag(NOT_CLONE_TAG);
        }
    }

    public static isNotClone(entityObject: EntityObject) {
        return entityObject.hasTag(NOT_CLONE_TAG);
    }
}

type CloneMemberData = {
    memberName: string,
    cloneType: CloneType,
    cloneDataArr: Array<any>
}

export type CloneAttributeAsBasicTypeConfigData = {
    order?: number;
}

export type CloneAttributeAsCloneableConfigData = {
    order?: number;
}

export type CloneAttributeAsCustomTypeConfigData = {
    order?: number;
}

export enum CloneType {
    CLONEABLE,
    BASIC,
    CUSTOM
}