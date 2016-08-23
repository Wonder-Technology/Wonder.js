export = class Vector2 {
    public static create(x, y):Vector2 ;
    public static create():Vector2 ;
    public static create():Vector2 {
        var m = null;

        if (arguments.length === 0) {
            m = new this();
        }
        else {
            m = new this(arguments[0], arguments[1]);
        }

        return m;
    }

    constructor(x, y);
    constructor();
    constructor() {
        this.values = new Float32Array(2);

        if (arguments.length > 0) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
        }
    }

    get x() {
        return this.values[0];
    }

    set x(x:number) {
        this.values[0] = x;
    }

    get y() {
        return this.values[1];
    }

    set y(y:number) {
        this.values[1] = y;
    }

    public values:Float32Array;

    public set(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public clone(){
        return Vector2.create(this.x, this.y);
    }
}
