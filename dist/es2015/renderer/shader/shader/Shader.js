var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { ensureGetter, it, ensure } from "../../../definition/typescript/decorator/contract";
import { Program } from "../../program/Program";
import expect from "wonder-expect.js";
import { cacheGetter } from "../../../definition/typescript/decorator/cache";
import { ProgramTable } from "../../../core/entityObject/scene/cache/ProgramTable";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { ShaderLib } from "../lib/ShaderLib";
import { DeviceManager } from "../../../device/DeviceManager";
import { execOnlyOnce } from "../../../definition/typescript/decorator/control";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import { Log } from "../../../utils/Log";
import { $BREAK } from "wonder-commonlib/dist/es2015/global/Const";
var Shader = (function () {
    function Shader() {
        this._attributes = Hash.create();
        this._uniforms = Hash.create();
        this._vsSource = "";
        this._fsSource = "";
        this.libDirty = false;
        this.definitionDataDirty = false;
        this.libs = Collection.create();
        this.sourceBuilder = this.createShaderSourceBuilder();
        this._programCache = null;
    }
    Object.defineProperty(Shader.prototype, "attributes", {
        get: function () {
            return this._attributes;
        },
        set: function (attributes) {
            if (this._isNotEqual(attributes, this._attributes)) {
                this.definitionDataDirty = true;
            }
            this._attributes = attributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "uniforms", {
        get: function () {
            return this._uniforms;
        },
        set: function (uniforms) {
            if (this._isNotEqual(uniforms, this._uniforms)) {
                this.definitionDataDirty = true;
            }
            this._uniforms = uniforms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "vsSource", {
        get: function () {
            return this._vsSource;
        },
        set: function (vsSource) {
            if (vsSource !== this._vsSource) {
                this.definitionDataDirty = true;
            }
            this._vsSource = vsSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "fsSource", {
        get: function () {
            return this._fsSource;
        },
        set: function (fsSource) {
            if (fsSource !== this._fsSource) {
                this.definitionDataDirty = true;
            }
            this._fsSource = fsSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "dirty", {
        get: function () {
            return this.libDirty || this.definitionDataDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "program", {
        get: function () {
            return ProgramTable.getProgram(this._getProgramTableKey());
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.createVsShader = function () {
        var gl = DeviceManager.getInstance().gl;
        return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
    };
    Shader.prototype.createFsShader = function () {
        var gl = DeviceManager.getInstance().gl;
        return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
    };
    Shader.prototype.init = function (material) {
        this.libs.forEach(function (lib) {
            lib.init();
        });
        this.judgeRefreshShader(null, material);
    };
    Shader.prototype.dispose = function () {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();
        this.libs.forEach(function (lib) {
            lib.dispose();
        });
        this._clearAllCache();
    };
    Shader.prototype.hasLib = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof ShaderLib) {
            var lib = args[0];
            return this.libs.hasChild(lib);
        }
        else {
            var _class_1 = args[0];
            return this.libs.hasChildWithFunc(function (lib) {
                return lib instanceof _class_1;
            });
        }
    };
    Shader.prototype.addLib = function (lib) {
        this.libs.addChild(lib);
        lib.shader = this;
        this.libDirty = true;
    };
    Shader.prototype.addShaderLibToTop = function (lib) {
        this.libs.unShiftChild(lib);
        lib.shader = this;
        this.libDirty = true;
    };
    Shader.prototype.getLib = function (libClass) {
        return this.libs.findOne(function (lib) {
            return lib instanceof libClass;
        });
    };
    Shader.prototype.getLibs = function () {
        return this.libs;
    };
    Shader.prototype.removeLib = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.libDirty = true;
        return this.libs.removeChild(args[0]);
    };
    Shader.prototype.removeAllLibs = function () {
        this.libDirty = true;
        this.libs.removeAllChildren();
    };
    Shader.prototype.sortLib = function (func) {
        this.libDirty = true;
        this.libs.sort(func, true);
    };
    Shader.prototype.judgeRefreshShader = function (cmd, material) {
        if (this.libDirty) {
            this.buildDefinitionData(cmd, material);
        }
        if (this.definitionDataDirty) {
            this._programCache = null;
            this._registerAndUpdateProgram();
            this._programCache = null;
        }
        this.libDirty = false;
        this.definitionDataDirty = false;
    };
    Shader.prototype._registerAndUpdateProgram = function () {
        var key = this._getProgramTableKey();
        if (ProgramTable.hasProgram(key)) {
            return;
        }
        ProgramTable.addProgram(key, Program.create());
        this._updateProgram();
    };
    Shader.prototype._updateProgram = function () {
        this.program.initWithShader(this);
    };
    Shader.prototype._getProgramTableKey = function () {
        return this.vsSource + "\n" + this.fsSource;
    };
    Shader.prototype._initShader = function (shader, source) {
        var gl = DeviceManager.getInstance().gl;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else {
            Log.log(gl.getShaderInfoLog(shader));
            Log.log("attributes:\n", this.attributes);
            Log.log("uniforms:\n", this.uniforms);
            Log.log("source:\n", source);
        }
    };
    Shader.prototype._isNotEqual = function (list1, list2) {
        var result = false;
        list1.forEach(function (data, key) {
            var list2Data = list2.getChild(key);
            if (!list2Data || data.type !== list2Data.type || data.value !== list2Data.value) {
                result = true;
                return $BREAK;
            }
        });
        return result;
    };
    Shader.prototype._clearAllCache = function () {
        this._programCache = null;
    };
    return Shader;
}());
export { Shader };
__decorate([
    ensureGetter(function (program) {
        it("program should exist(its table key is " + this._getProgramTableKey(), function () {
            expect(program).exist;
        }, this);
    }),
    cacheGetter(function () {
        return this._programCache !== null;
    }, function () {
        return this._programCache;
    }, function (program) {
        this._programCache = program;
    })
], Shader.prototype, "program", null);
__decorate([
    execOnlyOnce("_isInit")
], Shader.prototype, "init", null);
__decorate([
    ensure(function () {
        var _this = this;
        it("should set ShaderLib.shader to be this", function () {
            _this.libs.forEach(function (lib) {
                expect(lib.shader === _this).true;
            });
        }, this);
        it("libDirty should be true", function () {
            expect(_this.libDirty).true;
        }, this);
    })
], Shader.prototype, "addLib", null);
__decorate([
    ensure(function (val, lib) {
        var _this = this;
        it("should add shader lib to the top", function () {
            expect(JudgeUtils.isEqual(lib, _this.libs.getChild(0))).true;
        }, this);
        it("should set ShaderLib.shader to be this", function () {
            _this.libs.forEach(function (lib) {
                expect(lib.shader === _this).true;
            });
        }, this);
        it("libDirty should be true", function () {
            expect(_this.libDirty).true;
        }, this);
    })
], Shader.prototype, "addShaderLibToTop", null);
//# sourceMappingURL=Shader.js.map