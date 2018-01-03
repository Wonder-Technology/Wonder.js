[@bs.val] external __dirname : string = "";

[@bs.val] [@bs.module "fs"] external mkdirSync : string => unit = "";

open Node;

let mkAlldirsSync = (targetDir: string) => {
  let sep = Path.sep;
  targetDir
  |> Js.String.split(sep)
  |> Js.Array.reduce(
       (parentDir, childDir) => {
         let curDir = Path.resolve(parentDir, childDir);
         Fs.existsSync(curDir) ?
           curDir :
           {
             mkdirSync(curDir);
             curDir
           }
       },
       Path.isAbsolute(targetDir) ? sep : ""
     )
};

let rmdirFilesSync = [%bs.raw
  {|
function(dir)    {
var fs = require('fs');

    function iterator(url,dirs){
        var stat = fs.statSync(url);
        if(stat.isDirectory()){
            dirs.unshift(url);
            inner(url,dirs);
        }else if(stat.isFile()){
            fs.unlinkSync(url);
        }
    }
    function inner(path,dirs){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){
            iterator(path+"/"+el,dirs);
        }
    }
        var dirs = [];


        try{
            iterator(dir,dirs);

            /* for(var i = 0, el ; el = dirs[i++];){
                fs.rmdirSync(el);
            } */
        }catch(e){
            throw e;
        }
}

    |}
];