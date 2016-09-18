module wd{
    export abstract class InstanceGeometry extends Geometry{
        private _customGeometry:CustomGeometry = CustomGeometry.create();

        @cloneAttributeAsCustomType(function(source:InstanceGeometry, target:InstanceGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get vertices(){
            return this._customGeometry.vertices;
        }
        set vertices(vertices:Array<number>){
            this._customGeometry.vertices = vertices;
        }

        @cloneAttributeAsCustomType(function(source:InstanceGeometry, target:InstanceGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get texCoords(){
            return this._customGeometry.texCoords;
        }
        set texCoords(texCoords:Array<number>){
            this._customGeometry.texCoords = texCoords;
        }

        @cloneAttributeAsCustomType(function(source:InstanceGeometry, target:InstanceGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get colors(){
            return this._customGeometry.colors;
        }
        set colors(colors:Array<number>){
            this._customGeometry.colors = colors;
        }

        @cloneAttributeAsCustomType(function(source:InstanceGeometry, target:InstanceGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get indices(){
            return this._customGeometry.indices;
        }
        set indices(indices:Array<number>){
            this._customGeometry.indices = indices;
        }

        @cloneAttributeAsCustomType(function(source:InstanceGeometry, target:InstanceGeometry, memberName:string){
            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        get normals(){
            return this._customGeometry.normals;
        }
        set normals(normals:Array<number>){
            this._customGeometry.normals = normals;
        }

        @requireGetter(function(){
            it("attributeData.length should > 0", () => {
                expect(this.attributeData.getCount()).greaterThan(0);
            }, this);
        })
        @ensureGetter(function(instanceAttributeData){
            it("each data of all instance datas should be the same except the data", () => {
                this.attributeData.forEach((dataList:wdCb.Collection<InstanceAttributeData>) => {
                    dataList.forEach((data:InstanceAttributeData, index:number) => {
                        expect(data.attributeName).equals(instanceAttributeData.getChild(index).attributeName);
                        expect(data.size).equals(instanceAttributeData.getChild(index).size);
                        expect(data.meshPerAttribute).equals(instanceAttributeData.getChild(index).meshPerAttribute);
                    });
                });
            }, this);
        })
        get instanceAttributeData(){
            return this.attributeData.getChild((0));
        }

        get instanceCount(){
            return this.attributeData.getCount();
        }

        private _attributeData:wdCb.Collection<wdCb.Collection<InstanceAttributeData>> = wdCb.Collection.create<wdCb.Collection<InstanceAttributeData>>();
        @cloneAttributeAsCustomType(function(source:InstanceGeometry, target:InstanceGeometry, memberName:string){
            var sourceData:wdCb.Collection<wdCb.Collection<InstanceAttributeData>> = source[memberName],
                targetData:wdCb.Collection<wdCb.Collection<InstanceAttributeData>> = target[memberName];

            sourceData.forEach((dataList:wdCb.Collection<InstanceAttributeData>) => {
                targetData.addChild(dataList.clone(true));
            });
        })
        get attributeData(){
            return this._attributeData;
        }

        public dirty:boolean = false;

        @require(function(attributes:Array<InstanceAttributeData>){
            it("attributeName shouldn't equal vertices|normals|indices|texCoords|colors", () => {
                for(let data of attributes){
                    let name = data.attributeName;

                    expect(name).not.equals("vertices");
                    expect(name).not.equals("normals");
                    expect(name).not.equals("indices");
                    expect(name).not.equals("texCoords");
                    expect(name).not.equals("colors");
                }
            });
            it("data should be Array<number> or Float32Array", () => {
                for(let data of attributes){
                    let d = data.data;

                    expect(JudgeUtils.isArrayExactly(d) || Object.prototype.toString.call(d) === "[object Float32Array]").true;
                }
            });
        })
        public addInstanceAttributes(attributes:Array<InstanceAttributeData>
){
            var attributeListWithDefaultValue = wdCb.Collection.create<InstanceAttributeData>();

            this.dirty = true;

            for(let attributeData of attributes){
                attributeListWithDefaultValue.addChild(wdCb.ExtendUtils.extend({
                    meshPerAttribute:1
                }, attributeData));
            }


            this._attributeData.addChild(attributeListWithDefaultValue);
        }

        public clearInstanceAttributeData(){
            this.dirty = true;

            this._attributeData.removeAllChildren();
        }

        public computeData(){
            return {
                vertices: this.vertices,
                faces: GeometryUtils.convertToFaces(this.indices, this.normals),
                texCoords: this.texCoords,
                colors: this.colors
            };
        }
    }

    export type InstanceAttributeData = {
        attributeName:string;
        data:Array<number>|Float32Array;
        size:number;
        meshPerAttribute:number;
    }
}
