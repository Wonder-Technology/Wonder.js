let includes = Js.Array.includes;

let remove (item: 'item) (arr: array 'item) => {
  let index = Js.Array.indexOf item arr;
  if (index > -1) {
    Js.Array.removeCountInPlace pos::index count::1 arr
  } else {
    arr
  }
};