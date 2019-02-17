const OBJECT = Object.prototype.toString()

const isObject = value => Object.prototype.toString.call(value) === OBJECT

const filter = (source, ...targets) =>
  source
    ? targets.reduce((result, target) => {
        if (!isObject(target)) {
          throw new TypeError(
            `Expected mask to be ${ {}.toString() }, got ${ Object.prototype.toString.call(
              target
            ) }`
          )
        }

        return Object.assign(
          result,
          Object.entries(target).reduce((result, [ key, value ]) => {
            if (source.hasOwnProperty(key) && Boolean(value)) {
              return Object.assign(result, {
                [key]:
                  isObject(value) && isObject(source[key])
                    ? filter(source[key], value)
                    : source[key],
              })
            } else {
              return result
            }
          }, {})
        )
      }, {})
    : undefined

export default filter
