import { Xom, dom } from 'xom'
const { br, a, div, span, ul, li } = dom

describe('Xom', function() {
  describe('#intercept', function() {
    it('should return arbitrary HTMLElement instances', () => {
      expect(br()).toBeInstanceOf(HTMLBRElement)
      expect(a()).toBeInstanceOf(HTMLAnchorElement)
      expect(div()).toBeInstanceOf(HTMLDivElement)
    })

    it('should support namespaces', () => {
      const xom = new Xom({ namespace: 'honk' }).proxy()
      expect(xom.a().namespaceURI).toBe('honk')
    })
  })

  describe('#handleElement', function() {
    it('should create child HTMLElement instances', () => {
      const html = div(span(a()), div(ul(li(), li())))

      expect(html.childNodes.length).toBe(2)
      expect(html.childNodes[0]).toBeInstanceOf(HTMLSpanElement)
      expect(html.childNodes[0].childNodes[0]).toBeInstanceOf(HTMLAnchorElement)
      expect(html.childNodes[1]).toBeInstanceOf(HTMLDivElement)
      expect(html.childNodes[1].childNodes[0]).toBeInstanceOf(HTMLUListElement)
      expect(html.childNodes[1].childNodes[0].childNodes.length).toBe(2)
    })
  })

  describe('#handleArray', function() {
    it('should loop arrays and run #handle on each item', () => {
      const html = div([a(), br(), 'honk'])

      expect(html.childNodes.length).toBe(3)
      expect(html.childNodes[0]).toBeInstanceOf(HTMLAnchorElement)
      expect(html.childNodes[1]).toBeInstanceOf(HTMLBRElement)
      expect(html.childNodes[2]).toBeInstanceOf(Text)
      expect(html.childNodes[2].wholeText).toBe('honk')
    })
  })

  describe('#handleObject', function() {
    it('should loop object keys and setAttribute on the HTMLElement', () => {
      const html = div({ class: 'honk' })

      expect(html.getAttribute('class')).toBe('honk')
    })

    it('should set existing JS properties on an element', () => {
      const html = div({ className: 'honk' })

      expect(html.className).toBe('honk')
    })
  })

  describe('#handleGeneric', function() {
    it('should append a Text node', () => {
      const html = div('honk', 'womp', 'one', 'two')

      expect(html.childNodes.length).toBe(4)
      expect(html.childNodes[0]).toBeInstanceOf(Text)
      expect(html.childNodes[1]).toBeInstanceOf(Text)
      expect(html.childNodes[2]).toBeInstanceOf(Text)
      expect(html.childNodes[3]).toBeInstanceOf(Text)
      // Text nodes are weird as hell and auto-concat.
      expect(html.childNodes[0].wholeText).toBe('honkwomponetwo')
    })
  })
})
