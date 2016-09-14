module wd{
    export class InstanceGeometry extends Geometry{
        public static create() {
        	var obj = new this();

        	return obj;
        }


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

        //todo assert attributeData.length > 0 && different instance's attribute data only data different!
        get instanceAttributeData(){
            return this.attributeData.getChild((0));
        }

        get instanceCount(){
            return this.attributeData.getCount();
        }

        // public instanceCount:number = 1;

        //todo test clone
        @cloneAttributeAsCustomType(function(source:InstanceGeometry, target:InstanceGeometry, memberName:string){
            target[memberName] = source[memberName].clone(true);
        })
        public attributeData:wdCb.Collection<wdCb.Collection<InstanceAttributeData>> = wdCb.Collection.create<wdCb.Collection<InstanceAttributeData>>();

        //todo it:data.length === size * instanceCount
        //todo it:attributeName !== vertices,normals,...
        //todo it:check data type
        public addInstanceAttributes(attributes:Array<InstanceAttributeData>
            // attributeName:string, data:Array<number>|Float32Array, size:number, instanceIndex:number,  meshPerAttribute:number = 1
        // }>
){
            var attributeListWithDefaultValue = wdCb.Collection.create<InstanceAttributeData>();

            for(let attributeData of attributes){
                attributeListWithDefaultValue.addChild(wdCb.ExtendUtils.extend({
                    meshPerAttribute:1
                }, attributeData));
            }


            this.attributeData.addChild(attributeListWithDefaultValue);

            // this.attributeData.addChild({
            //     attributeName:attributeName,
            //     data:data,
            //     size:size,
            //     meshPerAttribute:meshPerAttribute
            // });
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
