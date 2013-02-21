/*global describe:true, it:true, before:true, after:true, beforeEach:true, afterEach:true */
var mi = require('../')
  , expect = require('chai').expect

//
// ## "Class" Fixtures
//
function Left() {
  this.isLeft = true
}
Left.extend = mi.extend

Left.prototype.left = function left() {
}

Left.prototype.test = function test() {
  return 'left'
}

function Right() {
  this.isRight = true
}
Right.extend = mi.extend

Right.prototype.right = function right() {
}

Right.prototype.test = function test() {
  return 'right'
}

function Both() {
  this.isBoth = true
}
Left.extend(Both)
Right.extend(Both)

Both.prototype.both = function both() {
}

Both.prototype.test = function test() {
  return Left.prototype.test.call(this) + Right.prototype.test.call(this)
}

function Parent() {
  this.isParent = true
}
Parent.inherit = mi.inherit

Parent.prototype.parent = function parent() {
}

Parent.prototype.test = function test() {
  return 'parent'
}

function Child() {
  this.isChild = true
}
Parent.inherit(Child)

Child.prototype.child = function child() {
}

Child.prototype.test = function test() {
  return 'child'
}

//
// ## Instance Fixtures
//

describe('mi', function () {
  describe('inherit', function () {
    beforeEach(function () {
      this.parent = new Parent()
      this.child = new Child()
    })

    it('should pass instanceof', function () {
      expect(this.parent instanceof Parent).to.be.true
      expect(this.child instanceof Parent).to.be.true
      expect(this.child instanceof Child).to.be.true
    })

    it('should permit access to the inherited prototype', function () {
      expect(this.parent.parent).to.exist.and.be.a('function')
      expect(this.child.parent).to.exist.and.be.a('function')
      expect(this.child.parent).to.equal(this.parent.parent)
    })

    it('should permit access to the original prototype', function () {
      expect(this.child.child).to.exist.and.be.a('function')
    })

    it('should permit overriding', function () {
      expect(this.parent.test()).to.equal('parent')
      expect(this.child.test()).to.equal('child')
    })

    it('should not automatically call superconstructor', function () {
      expect(this.parent.isParent).to.be.true
      expect(this.child.isChild).to.be.true

      expect(this.child.isParent).to.not.be.true
    })

    it('should allow superconstructor to be called manually', function () {
      // This should live in the constructor, just like you'd expect with prototypes!
      Parent.call(this.child)
      expect(this.child.isParent).to.be.true
    })
  })

  describe('extend', function () {
    beforeEach(function () {
      this.left = new Left()
      this.right = new Right()
      this.both = new Both()
    })

    it('should fail instanceof', function () {
      expect(this.left instanceof Left).to.be.true
      expect(this.right instanceof Right).to.be.true
      expect(this.both instanceof Both).to.be.true

      expect(this.both instanceof Left).to.be.false
      expect(this.both instanceof Right).to.be.false
    })

    it('should permit access to all inherited prototypes', function () {
      expect(this.left.left).to.exist.and.be.a('function')
      expect(this.right.right).to.exist.and.be.a('function')

      expect(this.both.left).to.exist.and.be.a('function')
      expect(this.both.right).to.exist.and.be.a('function')

      expect(this.both.left).to.equal(this.left.left)
      expect(this.both.right).to.equal(this.right.right)
    })

    it('should permit access to the original prototype', function () {
      expect(this.both.both).to.exist.and.be.a('function')
    })

    it('should permit overriding', function () {
      expect(this.left.test()).to.equal('left')
      expect(this.right.test()).to.equal('right')
      expect(this.both.test()).to.equal('leftright')
    })

    it('should not automatically call superconstructor', function () {
      expect(this.left.isLeft).to.be.true
      expect(this.right.isRight).to.be.true
      expect(this.both.isBoth).to.be.true

      expect(this.both.isLeft).to.not.be.true
      expect(this.both.isRight).to.not.be.true
    })

    it('should allow superconstructor to be called manually', function () {
      // This should live in the constructor, just like you'd expect with prototypes!
      Left.call(this.both)
      Right.call(this.both)

      expect(this.both.isLeft).to.be.true
      expect(this.both.isRight).to.be.true
    })
  })
})
