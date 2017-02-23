import { Log } from "../../../utils/Log";
import { CompileConfig } from "../../../config/CompileConfig";
import { MainData } from "../../../core/data/MainData";

var _describeContext = null;

export function assert(cond: boolean, message: string = "contract error") {
    Log.error(!cond, message);
}

export function describe(message: string, func: Function, preCondition: Function = () => true, context: any = this) {
    if (preCondition.call(context, null)) {
        _describeContext = context;

        try {
            func.call(context, null);
        }
        catch (e) {
            assert(false, `${message}->${e.message}`);
        }
        finally {
            _describeContext = null;
        }
    }
}

export function it(message: string, func: Function, context?: any) {
    try {
        if (arguments.length === 3) {
            func.call(context, null);
        }
        else {
            if (_describeContext) {
                func.call(_describeContext, null);
            }
            else {
                func();
            }
        }
    }
    catch (e) {
        assert(false, `${message}->${e.message}`);
    }
}

export function require(inFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let value = descriptor.value;

            descriptor.value = function(args) {
                if (MainData.isTest) {
                    inFunc.apply(this, arguments);
                }

                return value.apply(this, arguments);
            };
        }

        return descriptor;
    }
}

export function ensure(outFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let value = descriptor.value;

            descriptor.value = function(args) {
                var result = value.apply(this, arguments);

                if (MainData.isTest) {

                    var params = [result];

                    for (let i = 0, len = arguments.length; i < len; i++) {
                        params[i + 1] = arguments[i];
                    }

                    outFunc.apply(this, params);
                }

                return result;
            }
        }

        return descriptor;
    }
}

export function requireGetterAndSetter(inGetterFunc, inSetterFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function() {
                if (MainData.isTest) {
                    inGetterFunc.call(this);
                }

                return getter.call(this);
            };

            descriptor.set = function(val) {
                if (MainData.isTest) {
                    inSetterFunc.call(this, val);
                }

                setter.call(this, val);
            };
        }

        return descriptor;
    }
}

export function requireGetter(inFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let getter = descriptor.get;

            descriptor.get = function() {
                if (MainData.isTest) {
                    inFunc.call(this);
                }

                return getter.call(this);
            };

        }

        return descriptor;
    }
}

export function requireSetter(inFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let setter = descriptor.set;

            descriptor.set = function(val) {
                if (MainData.isTest) {
                    inFunc.call(this, val);
                }

                setter.call(this, val);
            };
        }

        return descriptor;
    }
}

export function ensureGetterAndSetter(outGetterFunc, outSetterFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function() {
                var result = getter.call(this);

                if (MainData.isTest) {
                    outGetterFunc.call(this, result);
                }

                return result;
            };

            descriptor.set = function(val) {
                var result = setter.call(this, val);

                if (MainData.isTest) {
                    let params = [result, val];
                    outSetterFunc.apply(this, params);
                }
            };
        }

        return descriptor;
    }
}

export function ensureGetter(outFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let getter = descriptor.get;

            descriptor.get = function() {
                var result = getter.call(this);

                if (MainData.isTest) {
                    outFunc.call(this, result);
                }

                return result;
            };
        }

        return descriptor;
    }
}

export function ensureSetter(outFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let setter = descriptor.set;

            descriptor.set = function(val) {
                var result = setter.call(this, val);

                if (MainData.isTest) {
                    let params = [result, val];
                    outFunc.apply(this, params);
                }
            };
        }

        return descriptor;
    }
}

export function invariant(func) {
    return function(target) {
        if (CompileConfig.isCompileTest) {
            if (MainData.isTest) {
                func(target);
            }
        }
    }
}