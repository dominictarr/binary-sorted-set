

var tape = require('tape')

var BSS = require('../')


tape('add, has, rm, has', function (t) {

  var bss = BSS()

  bss.add('foo')
  t.ok(bss.has('foo'))
  bss.rm('foo')
  t.notOk(bss.has('foo'))

  t.end()

})

tape('add, add, has, has', function (t) {

  var bss = BSS()

  bss.add('foo')
  bss.add('bar')
  t.ok(bss.has('foo'))
  t.ok(bss.has('bar'))
  bss.rm('foo')
  t.notOk(bss.has('foo'))
  t.ok(bss.has('bar'))
  bss.add('baz')

  t.deepEqual(bss.range(), ['bar', 'baz'])

  t.end()

})


tape('ranges', function (t) {

  var bss = BSS()

  bss.add(['apple', 1])
  bss.add(['banana', 2])
  bss.add(['cherry', 3])
  bss.add(['durian', 4])
  bss.add(['elderberry', 5])

  t.deepEqual(
    bss.range({gt: ['banana'], lte: ['durian', 5]}),
    [
      ['banana', 2],
      ['cherry', 3],
      ['durian', 4]
    ]
  )

  t.deepEqual(
    bss.range({gte: ['banana', 2], lte: ['durian', 4]}),
    [
      ['banana', 2],
      ['cherry', 3],
      ['durian', 4]
    ]
  )

  t.deepEqual(
    bss.range({gte: ['banana', 2], limit: 2}),
    [
      ['banana', 2],
      ['cherry', 3]
    ]
  )

  t.deepEqual(
    bss.range({lte: ['durian', 4], limit: 2, reverse: true}),
    [
      ['cherry', 3],
      ['durian', 4]
    ].reverse()
  )


  t.end()

})
