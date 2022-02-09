let getExn = val => val->Js.Nullable.toOption->OptionSt.getExn

let map = (val: Js.Nullable.t<'a>, func) => {
  val->Js.Nullable.bind((. v) => func(v))
}
