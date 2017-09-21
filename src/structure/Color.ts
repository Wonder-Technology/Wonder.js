import { registerClass } from "../definition/typescript/decorator/registerClass";
import { ensureGetter, requireCheck, it } from "../definition/typescript/decorator/contract";
import { Log } from "../utils/Log";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { cache } from "../definition/typescript/decorator/cache";
import { expect } from "wonder-expect.js";

declare var Math: any;

const REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i,
    REGEX_RGBA_2 = /^rgba\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+),\s*([^\)]+)\)$/i,
    REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i,
    REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i,
    REGEX_NUM = /^\#([0-9a-f]{6})$/i;

@registerClass("Color")
export class Color {
    public static create(colorVal?: string) {
        var obj = new this();

        obj.initWhenCreate(colorVal);

        return obj;
    }

    set dirty(dirty: boolean) {
        if (dirty) {
            this._clearCache();
        }
    }

    private _r: number = null;
    @ensureGetter(function(r: number) {
        it("r should >= 0", () => {
            expect(r).gte(0);
        });
    })
    get r() {
        return this._r;
    }
    set r(r: number) {
        if (this._r !== r) {
            this.dirty = true;

            this._r = r;
        }
    }

    private _g: number = null;
    @ensureGetter(function(g: number) {
        it("g should >= 0", () => {
            expect(g).gte(0);
        });
    })
    get g() {
        return this._g;
    }
    set g(g: number) {
        if (this._g !== g) {
            this.dirty = true;

            this._g = g;
        }
    }

    private _b: number = null;
    @ensureGetter(function(b: number) {
        it("b should >= 0", () => {
            expect(b).gte(0);
        });
    })
    get b() {
        return this._b;
    }
    set b(b: number) {
        if (this._b !== b) {
            this.dirty = true;

            this._b = b;
        }
    }

    private _a: number = null;
    @ensureGetter(function(a: number) {
        it("a should >= 0", () => {
            expect(a).gte(0);
        });
    })
    get a() {
        return this._a;
    }
    set a(a: number) {
        if (this._a !== a) {
            this.dirty = true;

            this._a = a;
        }
    }

    private _colorString: string = null;
    private _colorVec3Cache: Vector3 = null;
    private _colorVec4Cache: Vector4 = null;
    private _colorArr3Cache: Array<number> = null;
    private _colorArr4Cache: Array<number> = null;

    public initWhenCreate(colorVal?: string) {
        if (!colorVal) {
            return;
        }

        this._colorString = colorVal;
        this._setColor(colorVal);
    }

    @cache(function() {
        return this._colorVec3Cache !== null;
    }, function() {
        return this._colorVec3Cache;
    }, function(result) {
        this._colorVec3Cache = result;
    })
    public toVector3() {
        return Vector3.create(this.r, this.g, this.b);
    }

    @cache(function() {
        return this._colorVec4Cache !== null;
    }, function() {
        return this._colorVec4Cache;
    }, function(result) {
        this._colorVec4Cache = result;
    })
    public toVector4() {
        return Vector4.create(this.r, this.g, this.b, this.a);
    }

    @cache(function() {
        return this._colorArr3Cache !== null;
    }, function() {
        return this._colorArr3Cache;
    }, function(result) {
        this._colorArr3Cache = result;
    })
    public toArray3() {
        return [this.r, this.g, this.b];
    }


    @cache(function() {
        return this._colorArr4Cache !== null;
    }, function() {
        return this._colorArr4Cache;
    }, function(result) {
        this._colorArr4Cache = result;
    })
    public toArray4() {
        return [this.r, this.g, this.b, this.a];
    }

    public toString() {
        if (this._colorString !== null) {
            return this._colorString;
        }

        return `#${(`000000${this._getHex().toString(16)}`).slice(-6)}`;
    }

    private _getHex () {
        return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;
    }

    public clone() {
        return Color.create(this._colorString);
    }

    public isEqual(color: Color) {
        return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a;
    }

    @requireCheck((colorVal: string) => {
        it("color should be #xxxxxx", () => {
            expect(REGEX_NUM.test(colorVal)).true;
        })
    })
    public setColorByNum(colorVal: string) {
        var color = null;

        this._colorString = colorVal;

        color = REGEX_NUM.exec(colorVal);

        this._setHex(parseInt(color[1], 16));

        return this;
    }

    private _setColor(colorVal: string) {
        var color = null;

        // rgba(255,0,0,0)

        if (REGEX_RGBA.test(colorVal)) {
            color = REGEX_RGBA.exec(colorVal);

            this.r = this._getColorValue(color, 1);
            this.g = this._getColorValue(color, 2);
            this.b = this._getColorValue(color, 3);
            this.a = Number(color[4]);

            return this;

        }

        // rgba(0.1,0.0,0.3,0.2)

        if (REGEX_RGBA_2.test(colorVal)) {
            color = REGEX_RGBA_2.exec(colorVal);

            this.r = parseFloat(color[1]);
            this.g = parseFloat(color[2]);
            this.b = parseFloat(color[3]);
            this.a = Number(color[4]);

            return this;

        }

        // rgb(255,0,0)

        if (REGEX_RGB.test(colorVal)) {
            color = REGEX_RGB.exec(colorVal);

            this.r = this._getColorValue(color, 1);
            this.g = this._getColorValue(color, 2);
            this.b = this._getColorValue(color, 3);
            this.a = 1;

            return this;

        }

        /*!
         it will cause ambiguity: rgb(x,x,x)
         so the format should be:
         rgb(x.x,x.x,x.x)
         */
        if (REGEX_RGB_2.test(colorVal)) {
            color = REGEX_RGB_2.exec(colorVal);

            this.r = parseFloat(color[1]);
            this.g = parseFloat(color[2]);
            this.b = parseFloat(color[3]);
            this.a = 1;

            return this;

        }

        // #ffffff

        if (REGEX_NUM.test(colorVal)) {
            return this.setColorByNum(colorVal);
        }
    }

    private _getColorValue(color, index, num = 255) {
        return Math.min(num, parseInt(color[index], 10)) / num;
    }

    private _setHex(hex) {
        hex = Math.floor(hex);

        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;
        this.a = 1;

        return this;
    }

    private _clearCache() {
        this._colorVec3Cache = null;
        this._colorVec4Cache = null;
        this._colorArr3Cache = null;
        this._colorArr4Cache = null;
    }
}