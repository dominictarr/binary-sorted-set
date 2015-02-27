
var typewiselite = require('typewiselite')
var search = require('binary-search')
var ltgt = require('ltgt')

module.exports = function (compare) {

  var set = []

  compare = compare || typewiselite

  function index (item) {
    if(set.length === 0) return -1
    return search(set, item, compare, 0, set.length - 1)
  }

  return {
    add: function (item) {
      var i = index(item)
      //insert a if not already in the array.
      if(i < 0) i = ~i, set.splice(i, 0, item)
      return i
    },

    rm: function (item) {
      var i = index(item)
      //insert a if not already in the array.
      if(i >= 0) set.splice(i, 1)
      return i
    },

    has: function (item) {
      return index(item) >= 0
    },

    range: function (opts) {
      if(!opts) return set.slice()

      var lb = ltgt.lowerBound(opts) || null
      var lx = ltgt.lowerBoundExclusive(opts)
      var ub = ltgt.upperBound(opts) || undefined
      var ux = ltgt.upperBoundExclusive(opts)

      var i = index(lb)
      i = i < 0 ? ~i : i
      var j = index(ub)
      j = j < 0 ? ~j : j

      if(lx && compare(set[i], lb) === 0)
        i++
      if(!ux && compare(set[j], ub) === 0)
        j++

      var _set = set.slice(i, j)

      if(opts.reverse) _set.reverse()

      if(opts.limit) _set = _set.slice(0, opts.limit)

      return _set
    },

    array: set
  }

}
