//todo refactor: not send u_bitmapSampler
module wd{
    export class MultiPagesBitmapFontShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "multiPages_bitmapFont";

        @require(function(program:Program, cmd:QuadCommand, material:MultiPagesBitmapFontMaterial){
            it("should exist page buffer", function () {
                expect(cmd.buffers.getChild(EBufferDataType.CUSTOM, "pages")).exist;
            });
        })
        public sendShaderVariables(program:Program, cmd:QuadCommand, material:MultiPagesBitmapFontMaterial){
            var pageBuffer = <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.CUSTOM, "pages");

            this.sendAttributeBuffer(program, "a_page", pageBuffer);
        }

        public setShaderDefinition(cmd:QuadCommand, material:MultiPagesBitmapFontMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_page"]);
            this.addUniformVariable(["u_pageSampler2Ds"]);

            this.fsSourceBody += material.pageMapList.map((map:ImageTexture, index:number) => {
                    var cond = index === 0 ? 'if' : 'else if';

                    return `${cond}(v_page == ${index}.0) {
                    totalColor *= texture2D(u_pageSampler2Ds[${index}], v_bitmapCoord);
                    }`;
                }).toArray().join('\n')
                + "\n";

            this.fsSourceDefineList.addChildren([{
                name: "PAGE_COUNT",
                value: material.pageMapList.getCount()
            }]);
        }
    }
}

