module wd {
    export class DashLineGeometry extends LineGeometry {
        public static create() {
            var geo = new this();

            geo.initWhenCreate();

            return geo;
        }

        @cloneAttributeAsBasicType()
        public dashSize:number = 3;
        @cloneAttributeAsBasicType()
        public gapSize:number = 1;
        @cloneAttributeAsBasicType()
        public dashCount:number = 200;

        public initWhenCreate() {
            this.drawMode = wd.EDrawMode.LINES;
        }

        protected computeVertices() {
            var dashSize = this.dashSize,
                gapSize = this.gapSize,
                dashCount = this.dashCount,
                points = this.vertices.slice(0),
                curvect = Vector3.create(),
                lg = 0,
                count = 0,
                shft = 0,
                dashshft = 0,
                curshft = 0,
                vertices = [];

            for (let i = 0, len = points.length - 3; i < len; i += 3) {
                curvect.x = points[i + 3] - points[i];
                curvect.y = points[i + 4] - points[i + 1];
                curvect.z = points[i + 5] - points[i + 2];

                lg += curvect.length();
            }

            shft = lg / dashCount;
            dashshft = dashSize * shft / (dashSize + gapSize);

            for (let i = 0, len = points.length - 3; i < len; i += 3) {
                curvect.x = points[i + 3] - points[i];
                curvect.y = points[i + 4] - points[i + 1];
                curvect.z = points[i + 5] - points[i + 2];

                count = Math.floor(curvect.length() / shft);
                curvect.normalize();

                for (let j = 0; j < count; j++) {
                    curshft = shft * j;
                    vertices.push(points[i] + curshft * curvect.x, points[i + 1] + curshft * curvect.y, points[i + 2] + curshft * curvect.z);
                    vertices.push(points[i] + (curshft + dashshft) * curvect.x, points[i + 1] + (curshft + dashshft) * curvect.y, points[i + 2] + (curshft + dashshft) * curvect.z);
                }
            }

            return vertices;
        }
    }
}

