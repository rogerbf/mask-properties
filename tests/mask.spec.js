const { mask } = require(process.env.NODE_ENV === `development`
  ? `../source/main`
  : `../`)

describe(`mask`, () => {
  test(`typeof`, () => {
    expect(typeof mask).toEqual(`function`)
  })

  test(`()`, () => {
    expect(mask()).toEqual(undefined)
  })

  test(`({ a: { b: { c: 'c' } } }, { a: true })`, () => {
    expect(mask({ a: { b: { c: `c` } } }, { a: true })).toEqual({
      a: { b: { c: `c` } },
    })
  })

  test(`({ a: { b: { c: 'c' } } }, { a: { b: true } })`, () => {
    expect(mask({ a: { b: { c: `c` } } }, { a: { b: true } })).toEqual({
      a: { b: { c: `c` } },
    })
  })

  test(`({ a: 'a', b: { c: 'c' } }, { b: true })`, () => {
    expect(mask({ a: `a`, b: { c: `c` } }, { b: true })).toEqual({
      b: { c: `c` },
    })
  })

  test(`({ a: 'a', b: { c: 'c' } }, { a: false, b: true })`, () => {
    expect(mask({ a: `a`, b: { c: `c` } }, { a: false, b: true })).toEqual({
      b: { c: `c` },
    })
  })

  test(`({ a: 'a', b: { c: 'c', d: [] } }, { b: { d: { c: true } } })`, () => {
    expect(
      mask({ a: `a`, b: { c: `c`, d: [] } }, { b: { d: { e: true } } })
    ).toEqual({
      b: { d: [] },
    })
  })

  test(`({ a: 'a', b: { c: 'c', d: 0 } }, { b: { d: { c: true } } })`, () => {
    expect(
      mask({ a: `a`, b: { c: `c`, d: 0 } }, { b: { d: { e: true } } })
    ).toEqual({
      b: { d: 0 },
    })
  })
})
