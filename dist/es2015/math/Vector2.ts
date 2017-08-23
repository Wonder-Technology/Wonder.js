import { registerClass } from "../definition/typescript/decorator/registerClass";
@registerClass("Vector2")
export class Vector2 {
    public static create(x, y): Vector2;
    public static create(): Vector2;

    public static create(...args): Vector2 {
        var m = null;

        if (args.length === 0) {
            m = new this();
        }
        else {
            m = new this(args[0], args[1]);
        }

        return m;
    }

    constructor(x, y);
    constructor();
    constructor(...args) {
        this.values = new Float32Array(2);

        if (args.length > 0) {
            this.values[0] = args[0];
            this.values[1] = args[1];
        }
    }

    get x() {
        return this.values[0];
    }
    set x(x: number) {
        this.values[0] = x;
    }

    get y() {
        return this.values[1];
    }
    set y(y: number) {
        this.values[1] = y;
    }

    public values: Float32Array;

    public set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(v: Vector2) {
        this.values[0] = this.values[0] + v.values[0];
        this.values[1] = this.values[1] + v.values[1];

        return this;
    }

    public addScalar(s: number) {
        this.values[0] += s;
        this.values[1] += s;

        return this;
    }

    public multiplyScalar(s: number) {
        this.values[0] *= s;
        this.values[1] *= s;

        return this;
    }

    public mul(v: Vector2) {
        this.values[0] = this.values[0] * v.values[0];
        this.values[1] = this.values[1] * v.values[1];

        return this;
    }

    public isEqual(v: Vector2) {
        return this.x === v.x && this.y === v.y;
    }

    public clone() {
        return Vector2.create(this.x, this.y);
    }
}