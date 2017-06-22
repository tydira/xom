# xom
[![Dependencies](https://img.shields.io/david/kroogs/es2015-starter.svg)]()
[![Dev Dependencies](https://img.shields.io/david/dev/kroogs/es2015-starter.svg)]()
[![MIT license](https://img.shields.io/npm/l/es2015-starter.svg)](https://spdx.org/licenses/MIT)

> Abuse Proxy to build DOM elements.

## Features

  - Dynamic wrapper for document.createElement and document.createElementNS.
  - Use HTML or JavaScript attribute names.
  - Automatically wrap other arguments in document.createTextNode.

## Install

  ```
  npm install --save xom
  ```

## Example

  ```javascript
  import { div, span, b, i } from 'xom'

  document.appendChild(
    div({className: 'banana'},
      span('ba', b('na'), i('na'))
    )
  )
  ```
