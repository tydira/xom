export class Xom {
  constructor(options = {}) {
    this.options = options
  }

  handleElement(arg) {
    if (arg instanceof HTMLElement) {
      this.el.appendChild(arg)
      return true
    }
  }

  handleArray(arg) {
    if (arg instanceof Array) {
      arg.forEach(this.handle.bind(this))
      return true
    }
  }

  handleObject(arg) {
    if (typeof arg === 'object') {
      Object.keys(arg).forEach(key => {
        if (key in this.el) {
          this.el[key] = arg[key]
        } else {
          this.el.setAttribute(key, arg[key])
        }
      })

      return true
    }
  }

  handleGeneric(arg) {
    this.el.appendChild(document.createTextNode(arg))
    return true
  }

  handle(arg, i) {
    if (this.handleElement(arg)) return
    if (this.handleArray(arg)) return
    if (i === 0 && this.handleObject(arg)) return
    this.handleGeneric(arg)
  }

  intercept(_, name) {
    return (...args) => {
      if (this.options.namespace) {
        this.el = document.createElementNS(this.options.namespace, name)
      } else {
        this.el = document.createElement(name)
      }

      args.forEach((arg, i) => this.handle(arg, i))

      return this.el
    }
  }

  buildProxy() {
    return new Proxy({}, { get: this.intercept.bind(this) })
  }
}

export default new Xom().buildProxy()
