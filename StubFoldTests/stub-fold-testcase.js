class A {
    constructor() {
	this.x = 1;
    }
}

// Build a deep inheritance hierarchy with enough leaf classes to go megamorphic.
class A2 extends A {}
class A3 extends A2 {}
class A4 extends A3 {}
class A5 extends A4 {}
class A6 extends A5 {}
class A7 extends A6 {}

class B1 extends A6 {}
class B2 extends A6 {}
class B3 extends A6 {}
class B4 extends A6 {}
class B5 extends A6 {}
class B6 extends A6 {}
class B7 extends A6 {}
class B8 extends A6 {}

let bs = [new B1(), new B2(), new B3(), new B4(),
	  new B5(), new B6(), new B7(), new B8()];

var sum = 0;
for (var i = 0; i < 500000000; i++) {
    sum += bs[i % 8].x;
}

print(sum);
cacheIRHealthReport();
