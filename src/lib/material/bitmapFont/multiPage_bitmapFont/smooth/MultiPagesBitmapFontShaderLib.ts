module wd{
    export class MultiPagesBitmapFontShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "multiPages_bitmapFont";

        @require(function(program:Program, cmd:QuadCommand, material:BitmapFontMaterial){
            it("should exist page buffer", function () {
                expect(cmd.buffers.getChild(EBufferDataType.CUSTOM, "pages")).exist;
            });
        })
        public sendShaderVariables(program:Program, cmd:QuadCommand, material:BitmapFontMaterial){
            var pageBuffer = <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.CUSTOM, "pages");

            if(!pageBuffer){
                return;
            }

            this.sendAttributeBuffer(program, "a_page", pageBuffer);
        }

        public setShaderDefinition(cmd:QuadCommand, material:BitmapFontMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_page"]);
            this.addUniformVariable(["u_pageSampler2Ds"]);

            this.fsSourceBody += material.pageMapData.map((map:ImageTexture, index:number) => {
                    var cond = index === 0 ? 'if' : 'else if';

                    return `${cond}(v_page == ${index}.0) {
                    totalColor *= texture2D(u_pageSampler2Ds[${index}], v_bitmapCoord);
                    }`;
                }).join('\n')
                + "\n";

            this.fsSourceDefineList.addChildren([{
                name: "PAGE_COUNT",
                value: material.pageMapData.length
            }]);
        }
    }
}
