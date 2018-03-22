let hexFloat_of_string: string => float = [%bs.raw
  {|
function(str) {
    return parseInt(str, 16);
}
|}
];

let leastFloat = (min, num) => num < 0. ? 0. : num;