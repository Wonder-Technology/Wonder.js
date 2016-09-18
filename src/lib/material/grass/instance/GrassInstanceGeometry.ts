module wd{
    const BLADE_SEGS = 4,
        BLADE_VERTS = (BLADE_SEGS + 1) * 2,
        BLADE_WIDTH = 0.15,
        BLADE_HEIGHT_MIN = 2.0,
        BLADE_HEIGHT_MAX = 4.0;

    export class GrassInstanceGeometry extends InstanceGeometry{
        public static create(){
            var geom = new this();

            return geom;
        }

        //todo test clone
        @cloneAttributeAsBasicType()
        public bladeCount:number = 10;
        @cloneAttributeAsBasicType()
        public radius:number = 3;

        public vertexIndexBuffer:ArrayBuffer = null;

        // @cloneAttributeAsBasicType()
        // public width:number = null;
        // @cloneAttributeAsBasicType()
        // public height:number = null;

        public computeData(){
            for (let i = 0; i < this.bladeCount; i++) {
                this.addInstanceAttributes([
                    {attributeName: "a_shape", data: this._generateShapes(), size: 4, meshPerAttribute: 1},
                    {attributeName: "a_offset", data: this._generateOffsets(), size: 4, meshPerAttribute: 1}
                ]);
            }

            this.vertexIndexBuffer = BufferUtils.convertArrayToArrayBuffer(EVariableType.FLOAT_1, this._generateVertices())

            this.indices = this._generateIndices();

            return super.computeData();
        }

        private _generateVertices(){
            var vertices:Array<number> = [],
                vIndexLength = BLADE_VERTS * 2 * 1;

            for(let i = 0; i < vIndexLength; i++){
                vertices[i] = i;
            }

            return vertices;
        }

        private _generateShapes(){
            var shape:Array<number> = [],
                width = BLADE_WIDTH + Math.random() * BLADE_WIDTH * 0.5,
                height = BLADE_HEIGHT_MIN + Math.pow(Math.random(), 4.0) * (BLADE_HEIGHT_MAX - BLADE_HEIGHT_MIN),
                lean = 0.0 + Math.random() * 0.7,
                curve = 0.2 + Math.random() * 0.8;

            shape[0] = width;
            shape[1] = height;
            shape[2] = lean;
            shape[3] = curve;

            return shape;
        }

        private _generateOffsets(){
            var offset:Array<number> = [],
                radius = this.radius,
                x = MathUtils.generateMinToMax(-1, 1) * radius,
                y = MathUtils.generateMinToMax(-1, 1) * radius,
                z = 0.0,
                rot = Math.PI * 2.0 * Math.random();

            offset[0] = x;
            offset[1] = y;
            offset[2] = z;
            offset[3] = rot;

            return offset;
        }

        private _generateIndices(){
            var seg:number = null,
                i:number = 0,
                vc1 = 0,
                vc2 = BLADE_VERTS,
                indices:Array<number> = [];

            // blade front side
            for (seg = 0; seg < BLADE_SEGS; seg++) {
                // tri 1
                indices[i++] = vc1 + 0
                indices[i++] = vc1 + 1
                indices[i++] = vc1 + 2
                // tri 2
                indices[i++] = vc1 + 2
                indices[i++] = vc1 + 1
                indices[i++] = vc1 + 3

                vc1 += 2
            }

            // blade back side
            for (seg = 0; seg < BLADE_SEGS; seg++) {
                // tri 1
                indices[i++] = vc2 + 2
                indices[i++] = vc2 + 1
                indices[i++] = vc2 + 0
                // tri 2
                indices[i++] = vc2 + 3
                indices[i++] = vc2 + 1
                indices[i++] = vc2 + 2

                vc2 += 2
            }

            return indices;
        }
    }
}
