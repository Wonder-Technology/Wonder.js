open ImageRepoDpCPType;

open Sinon;

let build =
    (~sandbox, ~getData=createEmptyStub(refJsObjToSandbox(sandbox^)), ())
    : imageRepo => {
  getData: getData,
};

let set = dp => {
  ImageRepoDpCPAPI.set(dp);
};
