open TransformType;

external transformToJsUndefine : transform => Js.undefined(transform) = "%identity";

external tupleToJsArray : _ => Js.Array.t(float) = "%identity";
