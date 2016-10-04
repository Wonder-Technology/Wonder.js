module wd{
    export class GrassCommonInstanceShaderLib extends EngineShaderLib{
        public static create() {
        	var obj = new this();

        	return obj;
        }


        public type:string = "grass_common_instance";

        @require(function(program: Program, cmd:InstanceCommand, material:GrassMapMaterial){
            it("geometry should be GrassInstanceGeometry", () => {
                expect(material.geometry).instanceOf(GrassInstanceGeometry);
            });
            //todo should exist terrainGeometry
        })
        public sendShaderVariables(program: Program, cmd: InstanceCommand, material: GrassInstanceMaterial) {
            this.sendAttributeBuffer(program, "a_vertexIndex", material.geometry.vertexIndexBuffer);

            this.sendUniformData(program, "u_mvpMatrix", cmd.mvpMatrix);
            this.sendUniformData(program, "u_size", material.size);
            this.sendUniformData(program, "u_time", material.time);


            let terrainGeo:TerrainGeometry = material.terrainGeometry;
            //
            // this.terrainRangeWidth = terrainGeo.rangeWidth;
            // this.terrainRangeHeight = terrainGeo.rangeHeight;
            // this.heightMapImageDataWidth = terrainGeo.heightMapImageDataWidth;
            // this.heightMapImageDataHeight = terrainGeo.heightMapImageDataHeight;
            // this.minTerrainHeight = terrainGeo.minHeight;
            // this.maxTerrainHeight = terrainGeo.maxHeight;
            //
            // this.heightMap = terrainGeo.heightMapAsset.toTexture();

            //todo test
            // this.sendUniformData(program, "u_terrainRangeWidth", material.terrainRangeWidth);
            // this.sendUniformData(program, "u_terrainRangeHeight", material.terrainRangeHeight);
            // this.sendUniformData(program, "u_heightMapImageDataWidth", material.heightMapImageDataWidth);
            // this.sendUniformData(program, "u_heightMapImageDataHeight", material.heightMapImageDataHeight);
            // this.sendUniformData(program, "u_minTerrainHeight", material.minTerrainHeight);
            // this.sendUniformData(program, "u_maxTerrainHeight", material.maxTerrainHeight);
            this.sendUniformData(program, "u_terrainRangeWidth", terrainGeo.rangeWidth);
            this.sendUniformData(program, "u_terrainRangeHeight", terrainGeo.rangeHeight);
            this.sendUniformData(program, "u_heightMapImageDataWidth", terrainGeo.heightMapImageDataWidth);
            this.sendUniformData(program, "u_heightMapImageDataHeight", terrainGeo.heightMapImageDataHeight);
            this.sendUniformData(program, "u_terrainMinHeight", terrainGeo.minHeight);
            this.sendUniformData(program, "u_terrainMaxHeight", terrainGeo.maxHeight);
        }

        public setShaderDefinition(cmd:InstanceCommand, material:GrassMapMaterial){
            const BLADE_SEGS = 4.0,
                BLADE_DIVS = BLADE_SEGS + 1.0,
                BLADE_VERTS = BLADE_DIVS * 2.0;

            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_vertexIndex"]);
            this.addUniformVariable([
                "u_grassMapSampler",
                "u_mvpMatrix",
                "u_size",
                "u_time",
                "u_terrainRangeWidth",
                "u_terrainRangeHeight",
                "u_heightMapImageDataWidth",
                "u_heightMapImageDataHeight",
                "u_terrainMinHeight",
                "u_terrainMaxHeight",
                "u_heightMapSampler"
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
                }
            ]);
        }
    }
}

