# Mi

Mi is the simplest and most obvious way to use multiple inheritance in Javascript that [I](http://schoonology.com) can
think of. Constructor functions are created the same way, prototype properties and methods are still created the same
way, and instances are created the same way.

## API

Both of these functions can be called as-is like so:

```
function Constructor() {}
function SubClass() {}

mi.inherit(SubClass, Constructor)
```

or assigned to the super-most class, and called thusly:

```
function Constructor() {}
function SubClass() {}

Constructor.inherit = mi.inherit

Constructor.inherit(SubClass)
```

 * `mi.inherit` grants prototypical inheritance just like `util.inherits`. In fact, _it calls util.inherits_, so the
behaviour should be near-identical. The only difference is "static" methods; those defined as `Constructor.doIt`. Those
aren't inherited as `SubClass.doIt` with `util`, but they are with `mi`.

 * `mi.extend` grants "parasitical" or "mixin" inheritance much like [dotmixin](https://npmjs.org/package/dotmixin),
 [nmix](https://npmjs.org/package/nmix), and others. Unlike `mi.inherit`, `util.inherits` is not used, and typical,
 prototypical inheritance _will not occur_. Instead, the prototype of the "subclass" will have all prototype methods of
 the "superclass" _injected_ into itself.

## Other Considerations

 * You still have to call `Constructor.call(this)` in the "subclass" contructor, just as you would normally.
 * You still have to call `Constructor.prototype.doIt.call(this, ...)` in the "subclass"'s `doIt` method, just as you
 would normally.
 * Notice a pattern?
 * The order of `mi.extend` matters. Prototypes that are mixed in later (perhaps obviously) take precedence (read:
 overwrite) those mixed in earlier.

## License

Copyright (C) 2013 Michael Schoonmaker (michael.r.schoonmaker@gmail.com)

This project is free software released under the MIT/X11 license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
