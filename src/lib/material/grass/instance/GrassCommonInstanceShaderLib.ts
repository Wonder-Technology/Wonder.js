module wd{
    export class GrassCommonInstanceShaderLib extends EngineShaderLib{
        public static create() {
        	var obj = new this();

        	return obj;
        }


        public type:string = "grass_common_instance";

        @require(function(program: Program, cmd:InstanceCommand, material:GrassMaterial){
            it("geometry should be GrassInstanceGeometry", () => {
                expect(material.geometry).instanceOf(GrassInstanceGeometry);
            });
        })
        public sendShaderVariables(program: Program, cmd: InstanceCommand, material: GrassInstanceMaterial) {
            this.sendAttributeBuffer(program, "a_vertexIndex", material.geometry.vertexIndexBuffer);

            this.sendUniformData(program, "u_mvpMatrix", cmd.mvpMatrix);
            this.sendUniformData(program, "u_size", material.size);
            this.sendUniformData(program, "u_drawPos", material.drawPos);
            this.sendUniformData(program, "u_time", material.time);
        }

        public setShaderDefinition(cmd:InstanceCommand, material:GrassMaterial){
            const BLADE_SEGS = 4.0,
                BLADE_DIVS = BLADE_SEGS + 1.0,
                BLADE_VERTS = BLADE_DIVS * 2.0;

            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_vertexIndex"]);
            this.addUniformVariable([
                "u_grassMapSampler",
                "u_mvpMatrix",
                "u_size",
                "u_drawPos",
                "u_time"
            ]);

            this.vsSourceDefineList.addChildren([
                {
                    name: "BLADE_SEGS",
                    value:`${BLADE_SEGS}.0`
                },
                {
                    name: "BLADE_DIVS",
                    value:`${BLADE_DIVS}.0`
                },
                {
                    name: "BLADE_VERTS",
                    value:`${BLADE_VERTS}.0`
                },
            ]);
        }
    }
}

