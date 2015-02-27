# binary-sorted-set

keep a set of objects in order.

## example

``` js
var BinarySortedSet = require('binary-sorted-set')

//pass in a compare function (same as Array#sort)
var set = BinarySortedSet(compare)
set.add(object)
set.rm(object)

//take a range as an array.
console.log(set.range({gt: obj1, lt: obj2}))
```

## api

### BinarySortedSet(compare(a, b) => -1|0|1))

construct a new instance of a BinarySortedSet.
The compare function must take two set items and return
-1 if a < b, 1 if a > b and 0 if they are equal
(i.e. the same as [Array#sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2Fsort))

### bss.add(item)

add an item to the set.

### bss.rm(item)

remove an item from the set.

### bss.has(item)

check if an item is in the set.

### bss.range({gt, gte, lt, lte})

take a range from within the set, using levelup style ranges.

## License

MIT
