module wd{
    export class Billboard extends Component{
        public static create() {
            var obj = new this();

            return obj;
        }

        public entityObject:GameObject;

        @cloneAttributeAsBasicType()
        public mode:EBillboardMode = EBillboardMode.ALL;

        public addToComponentContainer(){
            var container:BillboardComponentContainer = BillboardComponentContainer.getInstance();

            if(!container.hasChild(this)){
                container.addChild(this);
            }
        }

        public removeFromComponentContainer(){
            BillboardComponentContainer.getInstance().removeChild(this);
        }

        //todo optimize
        public update(elapsed:number) {
            var camera = Director.getInstance().scene.currentCamera;

            if (this.mode !== EBillboardMode.NONE && camera) {
                let objToCamProj = Vector3.create(),
                    //todo optimize:use global Temp class to reduce memory
                    objTransform = this.entityObject.transform,
                    objPos = objTransform.position,
                    cameraPos = camera.transform.position,
                    isRotateAroundYAxis:boolean = null;

                isRotateAroundYAxis = this._rotateByYAxis(camera, objToCamProj, cameraPos, objPos, objTransform);

                if (this.mode === EBillboardMode.ALL && isRotateAroundYAxis) {
                    this._rotateLocalByXAxis(camera, objToCamProj, cameraPos, objPos, objTransform);
                }
            }
        }

        private _rotateByYAxis(camera:GameObject, objToCamProj:Vector3, cameraPos:Vector3, objPos:Vector3, objTransform:ThreeDTransform){
            var lookAt = Vector3.create(),
                //todo optimize:use global Temp class to reduce memory
                upAux = Vector3.create(),
                angleCosine = null,
                isRotateAroundYAxis = false;

            // objToCamProj is the vector in world coordinates from the
// local origin to the camera projected in the XZ plane
            objToCamProj.x = cameraPos.x - objPos.x ;
            objToCamProj.y = 0;
            objToCamProj.z = cameraPos.z - objPos.z ;

// This is the original lookAt vector for the object
// in world coordinates
            lookAt.x = 0;
            lookAt.y = 0;
            lookAt.z = 1;

// normalize both vectors to get the cosine directly afterwards
            objToCamProj.normalize();

// easy fix to determine wether the angle is negative or positive
// for positive angles upAux will be a vector pointing in the
// positive y direction, otherwise upAux will point downwards
// effectively reversing the rotation.

            upAux.cross(lookAt, objToCamProj);

// compute the angle
            //because lookAt,objToCamProj is unit vector, no need to divide |lookAt| * |objToCamProj|
//            angleCosine = lookAt.calAngleCos(objToCamProj);
            angleCosine = lookAt.dot(objToCamProj);

// perform the rotation. The if statement is used for stability reasons
// if the lookAt and objToCamProj vectors are too close together then
// |angleCosine| could be bigger than 1 due to lack of precision
            if ((angleCosine < 0.9999) && (angleCosine > -0.9999)){
                isRotateAroundYAxis = true;

                //todo optimize:use global Temp class to reduce memory
                objTransform.rotation = Quaternion.create().setFromAxisAngle(Math.acos(angleCosine) * 180 / Math.PI, upAux);
            }

            return isRotateAroundYAxis;
        }

        private _rotateLocalByXAxis(camera:GameObject, objToCamProj:Vector3, cameraPos:Vector3, objPos:Vector3, objTransform:ThreeDTransform){
            var objToCam = Vector3.create(),
                angleCosine:number = null;
            // so far it is just like the cylindrical billboard. The code for the
// second rotation comes now
// The second part tilts the object so that it faces the camera

// objToCam is the vector in world coordinates from
// the local origin to the camera
            objToCam.x = cameraPos.x - objPos.x ;
            objToCam.y = cameraPos.y - objPos.y ;
            objToCam.z = cameraPos.z - objPos.z ;

// Normalize to get the cosine afterwards
            objToCam.normalize();

// Compute the angle between objToCamProj and objToCam,
//i.e. compute the required angle for the lookup vector

            //because objToCam,objToCamProj is unit vector, no need to divide |objToCam| * |objToCamProj|
            angleCosine = objToCamProj.dot(objToCam);

// Tilt the object. The test is done to prevent instability
// when objToCam and objToCamProj have a very small
// angle between them

            //todo optimize:use global Temp class to reduce memory
            if ((angleCosine < 0.9999) && (angleCosine > -0.9999))
                if (objToCam.y < 0){
                    objTransform.rotateLocal(Math.acos(angleCosine) * 180 / Math.PI, 0, 0);
                }
                else{
                    objTransform.rotateLocal(-Math.acos(angleCosine) * 180 / Math.PI, 0, 0);
                }
        }
    }
}
