"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var Program_1 = require("../../program/Program");
var wonder_expect_js_1 = require("wonder-expect.js");
var cache_1 = require("../../../definition/typescript/decorator/cache");
var ProgramTable_1 = require("../../../core/entityObject/scene/cache/ProgramTable");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var ShaderLib_1 = require("../lib/ShaderLib");
var DeviceManager_1 = require("../../../device/DeviceManager");
var control_1 = require("../../../definition/typescript/decorator/control");
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
var Log_1 = require("../../../utils/Log");
var Const_1 = require("wonder-commonlib/dist/commonjs/global/Const");
var Shader = (function () {
    function Shader() {
        this._attributes = Hash_1.Hash.create();
        this._uniforms = Hash_1.Hash.create();
        this._vsSource = "";
        this._fsSource = "";
        this.libDirty = false;
        this.definitionDataDirty = false;
        this.libs = Collection_1.Collection.create();
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
            return ProgramTable_1.ProgramTable.getProgram(this._getProgramTableKey());
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.createVsShader = function () {
        var gl = DeviceManager_1.DeviceManager.getInstance().gl;
        return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
    };
    Shader.prototype.createFsShader = function () {
        var gl = DeviceManager_1.DeviceManager.getInstance().gl;
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
        if (args[0] instanceof ShaderLib_1.ShaderLib) {
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
        if (ProgramTable_1.ProgramTable.hasProgram(key)) {
            return;
        }
        ProgramTable_1.ProgramTable.addProgram(key, Program_1.Program.create());
        this._updateProgram();
    };
    Shader.prototype._updateProgram = function () {
        this.program.initWithShader(this);
    };
    Shader.prototype._getProgramTableKey = function () {
        return this.vsSource + "\n" + this.fsSource;
    };
    Shader.prototype._initShader = function (shader, source) {
        var gl = DeviceManager_1.DeviceManager.getInstance().gl;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else {
            Log_1.Log.log(gl.getShaderInfoLog(shader));
            Log_1.Log.log("attributes:\n", this.attributes);
            Log_1.Log.log("uniforms:\n", this.uniforms);
            Log_1.Log.log("source:\n", source);
        }
    };
    Shader.prototype._isNotEqual = function (list1, list2) {
        var result = false;
        list1.forEach(function (data, key) {
            var list2Data = list2.getChild(key);
            if (!list2Data || data.type !== list2Data.type || data.value !== list2Data.value) {
                result = true;
                return Const_1.$BREAK;
            }
        });
        return result;
    };
    Shader.prototype._clearAllCache = function () {
        this._programCache = null;
    };
    return Shader;
}());
__decorate([
    contract_1.ensureGetter(function (program) {
        contract_1.it("program should exist(its table key is " + this._getProgramTableKey(), function () {
            wonder_expect_js_1.default(program).exist;
        }, this);
    }),
    cache_1.cacheGetter(function () {
        return this._programCache !== null;
    }, function () {
        return this._programCache;
    }, function (program) {
        this._programCache = program;
    })
], Shader.prototype, "program", null);
__decorate([
    control_1.execOnlyOnce("_isInit")
], Shader.prototype, "init", null);
__decorate([
    contract_1.ensure(function () {
        var _this = this;
        contract_1.it("should set ShaderLib.shader to be this", function () {
            _this.libs.forEach(function (lib) {
                wonder_expect_js_1.default(lib.shader === _this).true;
            });
        }, this);
        contract_1.it("libDirty should be true", function () {
            wonder_expect_js_1.default(_this.libDirty).true;
        }, this);
    })
], Shader.prototype, "addLib", null);
__decorate([
    contract_1.ensure(function (val, lib) {
        var _this = this;
        contract_1.it("should add shader lib to the top", function () {
            wonder_expect_js_1.default(JudgeUtils_1.JudgeUtils.isEqual(lib, _this.libs.getChild(0))).true;
        }, this);
        contract_1.it("should set ShaderLib.shader to be this", function () {
            _this.libs.forEach(function (lib) {
                wonder_expect_js_1.default(lib.shader === _this).true;
            });
        }, this);
        contract_1.it("libDirty should be true", function () {
            wonder_expect_js_1.default(_this.libDirty).true;
        }, this);
    })
], Shader.prototype, "addShaderLibToTop", null);
exports.Shader = Shader;
//# sourceMappingURL=Shader.js.map