export default new Proxy(
  {},
  {
    get: function(_, name) {
      return function(...args) {
        let element

        if (name.indexOf(':') !== -1) {
          element = document.createElementNS(...name.split(':'))
        } else {
          element = document.createElement(name)
        }

        args.forEach((arg, i) => {
          if (arg instanceof HTMLElement) {
            element.appendChild(arg)
          } else if (
            i === 0 &&
            typeof arg === 'object' &&
            !(arg instanceof Array)
          ) {
            Object.keys(arg).forEach(key => {
              if (key in element) {
                element[key] = arg[key]
              } else {
                element.setAttribute(key, arg[key])
              }
            })
          } else {
            element.appendChild(document.createTextNode(arg))
          }
        })

        return element
      }
    },
  },
)
