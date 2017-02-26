var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ClassUtils } from "../../../utils/ClassUtils";
import { assert, requireCheck } from "./contract";
import { Log } from "../../../utils/Log";
import { registerClass } from "./registerClass";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
var NOT_CLONE_TAG = "not_clone";
var getCloneAttributeMembers = function (obj) {
    return obj[buildMemberContainerAttributeName(obj)];
};
var setCloneAttributeMembers = function (obj, members) {
    obj[buildMemberContainerAttributeName(obj)] = members;
};
var searchCloneAttributeMembers = function (obj) {
    var CLONE_MEMBER_PREFIX = "__decorator_clone";
    var result = null;
    for (var memberName in obj) {
        if (obj.hasOwnProperty(memberName)) {
            if (memberName.indexOf(CLONE_MEMBER_PREFIX) > -1) {
                result = obj[memberName];
                break;
            }
        }
    }
    return result;
};
var getAllCloneAttributeMembers = function (obj) {
    var IS_GATHERED_ATTRIBUTE_NAME = "__decorator_clone_isGathered_" + ClassUtils.getClassNameByInstance(obj) + "_cloneAttributeMembers";
    var result = Collection.create();
    var gather = function (obj) {
        if (!obj) {
            return;
        }
        if (obj[IS_GATHERED_ATTRIBUTE_NAME]) {
            var members_1 = getCloneAttributeMembers(obj);
            assert(members_1, Log.info.FUNC_NOT_EXIST("" + buildMemberContainerAttributeName(obj)));
            result.addChildren(members_1);
            return;
        }
        gather(obj.__proto__);
        var members = searchCloneAttributeMembers(obj);
        if (members) {
            result.addChildren(members);
        }
    }, setGatheredResult = function () {
        setCloneAttributeMembers(obj.__proto__, result);
        obj.__proto__[IS_GATHERED_ATTRIBUTE_NAME] = true;
    };
    gather(obj.__proto__);
    setGatheredResult();
    return getCloneAttributeMembers(obj);
};
var initCloneAttributeMembers = function (obj) {
    setCloneAttributeMembers(obj, Collection.create());
};
var buildMemberContainerAttributeName = function (obj) {
    return "__decorator_clone_" + ClassUtils.getClassNameByInstance(obj) + "_cloneAttributeMembers";
};
var generateCloneableMember = function (cloneType) {
    var cloneDataArr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        cloneDataArr[_i - 1] = arguments[_i];
    }
    return function (target, memberName) {
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
    };
};
export function cloneAttributeAsBasicType(configData) {
    return generateCloneableMember(CloneType.BASIC, ExtendUtils.extend({
        order: 0
    }, configData));
}
export function cloneAttributeAsCloneable(configData) {
    return generateCloneableMember(CloneType.CLONEABLE, ExtendUtils.extend({
        order: 0
    }, configData));
}
export function cloneAttributeAsCustomType(cloneFunc, configData) {
    return generateCloneableMember(CloneType.CUSTOM, cloneFunc, ExtendUtils.extend({
        order: 0
    }, configData));
}
var CloneUtils = (function () {
    function CloneUtils() {
    }
    CloneUtils.clone = function (sourceInstance, cloneData, createDataArr, target) {
        if (cloneData === void 0) { cloneData = null; }
        if (createDataArr === void 0) { createDataArr = null; }
        if (target === void 0) { target = null; }
        var cloneAttributeMembers = getAllCloneAttributeMembers(sourceInstance)
            .sort(function (memberDataA, memberDataB) {
            return memberDataA.configData.order - memberDataB.configData.order;
        }), className = ClassUtils.getClassNameByInstance(sourceInstance);
        if (target === null) {
            if (createDataArr) {
                var _class = ClassUtils.getClass(className);
                target = _class.create.apply(_class, createDataArr);
            }
            else {
                target = ClassUtils.getClass(className).create();
            }
        }
        if (!cloneAttributeMembers) {
            return target;
        }
        cloneAttributeMembers.forEach(function (memberData) {
            var cloneType = memberData.cloneType, memberName = memberData.memberName;
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
                    var cloneFunc = memberData.cloneFunc;
                    cloneFunc.call(target, sourceInstance, target, memberName, cloneData);
                    break;
            }
        });
        return target;
    };
    CloneUtils.cloneArray = function (arr, isDeep) {
        if (isDeep === void 0) { isDeep = false; }
        if (arr === null) {
            return null;
        }
        if (isDeep) {
            return ExtendUtils.extendDeep(arr);
        }
        return [].concat(arr);
    };
    CloneUtils.markNotClone = function (entityObject) {
        if (!entityObject.hasTag(NOT_CLONE_TAG)) {
            entityObject.addTag(NOT_CLONE_TAG);
        }
    };
    CloneUtils.isNotClone = function (entityObject) {
        return entityObject.hasTag(NOT_CLONE_TAG);
    };
    return CloneUtils;
}());
__decorate([
    requireCheck(function (source, cloneData, createDataArr) {
        if (cloneData === void 0) { cloneData = null; }
        if (createDataArr === void 0) { createDataArr = null; }
        if (createDataArr) {
            assert(JudgeUtils.isArrayExactly(createDataArr), Log.info.FUNC_MUST_BE("param:createDataArr", "be arr"));
        }
    })
], CloneUtils, "clone", null);
CloneUtils = __decorate([
    registerClass("CloneUtils")
], CloneUtils);
export { CloneUtils };
export var CloneType;
(function (CloneType) {
    CloneType[CloneType["CLONEABLE"] = 0] = "CLONEABLE";
    CloneType[CloneType["BASIC"] = 1] = "BASIC";
    CloneType[CloneType["CUSTOM"] = 2] = "CUSTOM";
})(CloneType || (CloneType = {}));
//# sourceMappingURL=clone.js.map