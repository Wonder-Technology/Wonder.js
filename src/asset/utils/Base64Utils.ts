module wd{
    declare var Image:any;

    export class Base64Utils{
        @require(function(base64:string){
            it("base64 should define 'data:image' field", () => {
                expect(base64.indexOf("data:image")).gt(-1);
            });
        })
        public static createImageFromBase64(base64:string, filePath:string){
            var image = new Image();

            image.src = base64;

            return image;
        }
    }
}
