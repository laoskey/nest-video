/* eslint-disable @typescript-eslint/no-unsafe-member-access */
class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
// class B {
//   a: any;
//   constructor() {
//     this.a = new A().name;
//   }
// }
class C {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Container<T> {
  private mo: Record<string, T>;
  constructor() {
    this.mo = {};
  }

  provide(key: string, mo: T) {
    this.mo[key] = mo;
  }

  get(key: string): T | undefined {
    return this.mo[key];
  }
}

const mo = new Container<any>();

mo.provide('a', new A('Eric'));
mo.provide('c', new C('Tric'));

class B {
  a: A | undefined;
  c: C | undefined;

  constructor(mo: Container<any>) {
    this.a = mo.get('a') as A;
    this.c = mo.get('c') as C;
  }
}
