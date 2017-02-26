var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
import { Log } from "../utils/Log";
import { ViewWebGL } from "../structure/View";
import { MainData } from "../core/data/MainData";
import { RectRegion } from "../structure/RectRegion";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { root } from "../definition/Variable";
import { requireCheck, it, ensure } from "../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import { EScreenSize } from "./EScreenSize";
var DeviceManager = (function () {
    function DeviceManager() {
        this._scissorTest = false;
        this._depthTest = null;
        this._depthFunc = null;
        this._side = null;
        this.polygonOffset = null;
        this._polygonOffsetMode = null;
        this._depthWrite = null;
        this._blend = null;
        this._alphaToCoverage = null;
        this.view = null;
        this.gl = null;
        this.contextConfig = null;
        this._writeRed = null;
        this._writeGreen = null;
        this._writeBlue = null;
        this._writeAlpha = null;
        this._blendSrc = null;
        this._blendDst = null;
        this._blendEquation = null;
        this._blendFuncSeparate = null;
        this._blendEquationSeparate = null;
        this._scissorRegion = RectRegion.create();
        this._viewport = RectRegion.create();
        this._clearColor = null;
        this._pixelRatio = null;
    }
    DeviceManager.getInstance = function () { };
    Object.defineProperty(DeviceManager.prototype, "scissorTest", {
        get: function () {
            return this._scissorTest;
        },
        set: function (scissorTest) {
            var gl = this.gl;
            if (this._scissorTest === scissorTest) {
                return;
            }
            if (scissorTest) {
                gl.enable(gl.SCISSOR_TEST);
            }
            else {
                gl.disable(gl.SCISSOR_TEST);
            }
            this._scissorTest = scissorTest;
        },
        enumerable: true,
        configurable: true
    });
    DeviceManager.prototype.setScissor = function (x, y, width, height) {
        if (this._scissorRegion.y === y && this._scissorRegion.width === width && this._scissorRegion.height === height) {
            return;
        }
        this.gl.scissor(x, y, width, height);
        this._scissorRegion.set(x, y, width, height);
        this.scissorTest = true;
    };
    DeviceManager.prototype.setViewport = function (x, y, width, height) {
        if (this._viewport.x === x && this._viewport.y === y && this._viewport.width === width && this._viewport.height === height) {
            return;
        }
        this._viewport.set(x, y, width, height);
        this.gl.viewport(x, y, width, height);
    };
    DeviceManager.prototype.getViewport = function () {
        return this._viewport;
    };
    Object.defineProperty(DeviceManager.prototype, "depthTest", {
        get: function () {
            return this._depthTest;
        },
        set: function (depthTest) {
            var gl = this.gl;
            if (this._depthTest !== depthTest) {
                if (depthTest) {
                    gl.enable(gl.DEPTH_TEST);
                }
                else {
                    gl.disable(gl.DEPTH_TEST);
                }
                this._depthTest = depthTest;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "depthFunc", {
        get: function () {
            return this._depthFunc;
        },
        set: function (depthFunc) {
            var gl = this.gl;
            if (this._depthFunc !== depthFunc) {
                gl.depthFunc(gl[depthFunc]);
                this._depthFunc = depthFunc;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "side", {
        get: function () {
            return this._side;
        },
        set: function (side) {
            var gl = this.gl;
            if (this._side !== side) {
                switch (side) {
                    case ESide.NONE:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.FRONT_AND_BACK);
                        break;
                    case ESide.BOTH:
                        gl.disable(gl.CULL_FACE);
                        break;
                    case ESide.FRONT:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.BACK);
                        break;
                    case ESide.BACK:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.FRONT);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_UNEXPECT("side", side));
                        break;
                }
                this._side = side;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "polygonOffsetMode", {
        get: function () {
            return this._polygonOffsetMode;
        },
        set: function (polygonOffsetMode) {
            var gl = this.gl;
            if (this._polygonOffsetMode !== polygonOffsetMode) {
                switch (polygonOffsetMode) {
                    case EPolygonOffsetMode.NONE:
                        gl.polygonOffset(0.0, 0.0);
                        gl.disable(gl.POLYGON_OFFSET_FILL);
                        break;
                    case EPolygonOffsetMode.IN:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        gl.polygonOffset(1.0, 1.0);
                        break;
                    case EPolygonOffsetMode.OUT:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        gl.polygonOffset(-1.0, -1.0);
                        break;
                    case EPolygonOffsetMode.CUSTOM:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        Log.error(!this.polygonOffset, Log.info.FUNC_MUST_DEFINE("polygonOffset"));
                        gl.polygonOffset(this.polygonOffset.x, this.polygonOffset.y);
                        break;
                    default:
                        break;
                }
                this._polygonOffsetMode = polygonOffsetMode;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "depthWrite", {
        get: function () {
            return this._depthWrite;
        },
        set: function (depthWrite) {
            if (this._depthWrite !== depthWrite) {
                this.gl.depthMask(depthWrite);
                this._depthWrite = depthWrite;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "blend", {
        get: function () {
            return this._blend;
        },
        set: function (blend) {
            var gl = this.gl;
            if (this._blend !== blend) {
                if (blend) {
                    gl.enable(gl.BLEND);
                }
                else {
                    gl.disable(gl.BLEND);
                }
                this._blend = blend;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "alphaToCoverage", {
        get: function () {
            return this._alphaToCoverage;
        },
        set: function (alphaToCoverage) {
            var gl = this.gl;
            if (this._alphaToCoverage !== alphaToCoverage) {
                if (alphaToCoverage) {
                    gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                }
                else {
                    gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                }
                this._alphaToCoverage = alphaToCoverage;
            }
        },
        enumerable: true,
        configurable: true
    });
    DeviceManager.prototype.setBlendFunc = function (blendSrc, blendDst) {
        if ((this._blendSrc !== blendSrc) || (this._blendDst !== blendDst)) {
            this._blend && this.gl.blendFunc(this.gl[blendSrc], this.gl[blendDst]);
            this._blendSrc = blendSrc;
            this._blendDst = blendDst;
        }
    };
    DeviceManager.prototype.setBlendEquation = function (blendEquation) {
        if (this._blendEquation !== blendEquation) {
            this._blend && this.gl.blendEquation(this.gl[blendEquation]);
            this._blendEquation = blendEquation;
        }
    };
    DeviceManager.prototype.setBlendFuncSeparate = function (blendFuncSeparate) {
        var gl = this.gl;
        if (!this._blendFuncSeparate || this._blendFuncSeparate[0] !== blendFuncSeparate[0] || this._blendFuncSeparate[1] !== blendFuncSeparate[1]) {
            this._blend && gl.blendFuncSeparate(gl[blendFuncSeparate[0]], gl[blendFuncSeparate[1]], gl[blendFuncSeparate[2]], gl[blendFuncSeparate[3]]);
            this._blendFuncSeparate = blendFuncSeparate;
        }
    };
    DeviceManager.prototype.setBlendEquationSeparate = function (blendEquationSeparate) {
        var gl = this.gl;
        if (!this._blendEquationSeparate || this._blendEquationSeparate[0] !== blendEquationSeparate[0] || this._blendEquationSeparate[1] !== blendEquationSeparate[1]) {
            this._blend && gl.blendEquationSeparate(gl[blendEquationSeparate[0]], gl[blendEquationSeparate[1]]);
            this._blendEquationSeparate = blendEquationSeparate;
        }
    };
    DeviceManager.prototype.setColorWrite = function (writeRed, writeGreen, writeBlue, writeAlpha) {
        if (this._writeRed !== writeRed
            || this._writeGreen !== writeGreen
            || this._writeBlue !== writeBlue
            || this._writeAlpha !== writeAlpha) {
            this.gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
            this._writeRed = writeRed;
            this._writeGreen = writeGreen;
            this._writeBlue = writeBlue;
            this._writeAlpha = writeAlpha;
        }
    };
    DeviceManager.prototype.clear = function (options) {
        var gl = this.gl, color = options.color;
        this._setClearColor(color);
        this.setColorWrite(true, true, true, true);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    };
    DeviceManager.prototype.createGL = function (canvasId, contextConfig, useDevicePixelRatio) {
        var canvas = null;
        this.contextConfig = contextConfig;
        if (!!canvasId) {
            canvas = DomQuery.create(this._getCanvasId(canvasId)).get(0);
        }
        else {
            canvas = DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
        }
        this.view = ViewWebGL.create(canvas);
        if (useDevicePixelRatio) {
            this.setPixelRatio(root.devicePixelRatio);
        }
        this.gl = this.view.getContext(contextConfig);
        if (!this.gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
    };
    DeviceManager.prototype.setScreen = function () {
        var screenSize = MainData.screenSize, x = null, y = null, width = null, height = null, styleWidth = null, styleHeight = null;
        if (screenSize === EScreenSize.FULL) {
            x = 0;
            y = 0;
            width = root.innerWidth;
            height = root.innerHeight;
            styleWidth = "100%";
            styleHeight = "100%";
            DomQuery.create("body").css("margin", "0");
        }
        else {
            x = screenSize.x || 0;
            y = screenSize.y || 0;
            width = screenSize.width || root.innerWidth;
            height = screenSize.height || root.innerHeight;
            styleWidth = width + "px";
            styleHeight = height + "px";
        }
        this.view.initCanvas();
        this.view.x = x;
        this.view.y = y;
        this.view.width = width;
        this.view.height = height;
        this.view.styleWidth = styleWidth;
        this.view.styleHeight = styleHeight;
        this.setViewport(0, 0, width, height);
    };
    DeviceManager.prototype.setHardwareScaling = function (level) {
        var width = this.view.width / level, height = this.view.height / level;
        this.view.width = width;
        this.view.height = height;
        this.setViewport(0, 0, width, height);
    };
    DeviceManager.prototype.setPixelRatio = function (pixelRatio) {
        this.view.width = Math.round(this.view.width * pixelRatio);
        this.view.height = Math.round(this.view.height * pixelRatio);
        this._pixelRatio = pixelRatio;
    };
    DeviceManager.prototype.getPixelRatio = function () {
        return this._pixelRatio;
    };
    DeviceManager.prototype._setClearColor = function (color) {
        if (this._clearColor && this._clearColor.isEqual(color)) {
            return;
        }
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this._clearColor = color;
    };
    DeviceManager.prototype._getCanvasId = function (canvasId) {
        if (canvasId.indexOf('#') > -1) {
            return canvasId;
        }
        return "#" + canvasId;
    };
    return DeviceManager;
}());
__decorate([
    requireCheck(function () {
        it("should exist MainData.screenSize", function () {
            expect(MainData.screenSize).exist;
        });
    })
], DeviceManager.prototype, "setScreen", null);
__decorate([
    requireCheck(function (level) {
        it("level should > 0, but actual is " + level, function () {
            expect(level).greaterThan(0);
        });
    })
], DeviceManager.prototype, "setHardwareScaling", null);
__decorate([
    ensure(function (id) {
        it("canvas id should be #xxx", function () {
            expect(/#[^#]+/.test(id)).true;
        });
    })
], DeviceManager.prototype, "_getCanvasId", null);
DeviceManager = __decorate([
    singleton(),
    registerClass("DeviceManager")
], DeviceManager);
export { DeviceManager };
export var EDepthFunction;
(function (EDepthFunction) {
    EDepthFunction[EDepthFunction["NEVER"] = "NEVER"] = "NEVER";
    EDepthFunction[EDepthFunction["ALWAYS"] = "ALWAYS"] = "ALWAYS";
    EDepthFunction[EDepthFunction["LESS"] = "LESS"] = "LESS";
    EDepthFunction[EDepthFunction["LEQUAL"] = "LEQUAL"] = "LEQUAL";
    EDepthFunction[EDepthFunction["EQUAL"] = "EQUAL"] = "EQUAL";
    EDepthFunction[EDepthFunction["GEQUAL"] = "GEQUAL"] = "GEQUAL";
    EDepthFunction[EDepthFunction["GREATER"] = "GREATER"] = "GREATER";
    EDepthFunction[EDepthFunction["NOTEQUAL"] = "NOTEQUAL"] = "NOTEQUAL";
})(EDepthFunction || (EDepthFunction = {}));
export var ESide;
(function (ESide) {
    ESide[ESide["NONE"] = 0] = "NONE";
    ESide[ESide["BOTH"] = 1] = "BOTH";
    ESide[ESide["BACK"] = 2] = "BACK";
    ESide[ESide["FRONT"] = 3] = "FRONT";
})(ESide || (ESide = {}));
export var EPolygonOffsetMode;
(function (EPolygonOffsetMode) {
    EPolygonOffsetMode[EPolygonOffsetMode["NONE"] = 0] = "NONE";
    EPolygonOffsetMode[EPolygonOffsetMode["IN"] = 1] = "IN";
    EPolygonOffsetMode[EPolygonOffsetMode["OUT"] = 2] = "OUT";
    EPolygonOffsetMode[EPolygonOffsetMode["CUSTOM"] = 3] = "CUSTOM";
})(EPolygonOffsetMode || (EPolygonOffsetMode = {}));
export var EBlendFunc;
(function (EBlendFunc) {
    EBlendFunc[EBlendFunc["ZERO"] = "ZEOR"] = "ZERO";
    EBlendFunc[EBlendFunc["ONE"] = "ONE"] = "ONE";
    EBlendFunc[EBlendFunc["SRC_COLOR"] = "SRC_COLOR"] = "SRC_COLOR";
    EBlendFunc[EBlendFunc["ONE_MINUS_SRC_COLOR"] = "ONE_MINUS_SRC_COLOR"] = "ONE_MINUS_SRC_COLOR";
    EBlendFunc[EBlendFunc["DST_COLOR"] = "DST_COLOR"] = "DST_COLOR";
    EBlendFunc[EBlendFunc["ONE_MINUS_DST_COLOR"] = "ONE_MINUS_DST_COLOR"] = "ONE_MINUS_DST_COLOR";
    EBlendFunc[EBlendFunc["SRC_ALPHA"] = "SRC_ALPHA"] = "SRC_ALPHA";
    EBlendFunc[EBlendFunc["SRC_ALPHA_SATURATE"] = "SRC_ALPHA_SATURATE"] = "SRC_ALPHA_SATURATE";
    EBlendFunc[EBlendFunc["ONE_MINUS_SRC_ALPHA"] = "ONE_MINUS_SRC_ALPHA"] = "ONE_MINUS_SRC_ALPHA";
    EBlendFunc[EBlendFunc["DST_ALPHA"] = "DST_ALPHA"] = "DST_ALPHA";
    EBlendFunc[EBlendFunc["ONE_MINUS_DST_ALPH"] = "ONE_MINUS_DST_ALPHA"] = "ONE_MINUS_DST_ALPH";
})(EBlendFunc || (EBlendFunc = {}));
export var EBlendEquation;
(function (EBlendEquation) {
    EBlendEquation[EBlendEquation["ADD"] = "FUNC_ADD"] = "ADD";
    EBlendEquation[EBlendEquation["SUBTRACT"] = "FUNC_SUBTRACT"] = "SUBTRACT";
    EBlendEquation[EBlendEquation["REVERSE_SUBTRAC"] = "FUNC_REVERSE_SUBTRACT"] = "REVERSE_SUBTRAC";
})(EBlendEquation || (EBlendEquation = {}));
export var EBlendType;
(function (EBlendType) {
    EBlendType[EBlendType["NONE"] = 0] = "NONE";
    EBlendType[EBlendType["NORMAL"] = 1] = "NORMAL";
    EBlendType[EBlendType["ADDITIVE"] = 2] = "ADDITIVE";
    EBlendType[EBlendType["ADDITIVEALPHA"] = 3] = "ADDITIVEALPHA";
    EBlendType[EBlendType["MULTIPLICATIVE"] = 4] = "MULTIPLICATIVE";
    EBlendType[EBlendType["PREMULTIPLIED"] = 5] = "PREMULTIPLIED";
})(EBlendType || (EBlendType = {}));
export var ECanvasType;
(function (ECanvasType) {
    ECanvasType[ECanvasType["TwoDUI"] = "TwoDUI"] = "TwoDUI";
})(ECanvasType || (ECanvasType = {}));
//# sourceMappingURL=DeviceManager.js.map