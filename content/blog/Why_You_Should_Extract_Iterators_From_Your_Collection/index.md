---
title: Why You Should Extract Iterators From Your Collection
date: 2020-03-13T12:47:52.162Z
description: Understanding benefits of using iterators pattern in ECMA 2015
---

![Why You Should Extract Iterators From Your Collection](https://images.unsplash.com/photo-1496989981497-27d69cdad83e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=844&q=80)

Collection are one of the most important data types for general purposes, However each collection persist on it's own underlying implementation; In other word each collection based on different types of dataStructures e.g. lists, hashTables, graphs, trees and etc...

Each Collection provides different ways of accessing it's stored elements or iterate over them.

Traversing elements of a collection may sounds like pretty easy when the collection used to be an object or list; But what if we need to iterate over a more complex dataStructure like a tree or graph and what if we need to traverse our dataStructure in different manner; for example one day we just need breathe-first-traversal and depth-first-traversal in our tree; And maybe next week we need iterate over random elements of our tree; So we have to also implements an completely different method for it.

As we go further we need to add more and more traversal method to dataStructure and eventually we end up with a big object that not looks like a Collection anymore; And that's the moment that we realize this approach deeply flawed; Increasing the number of traversal method blur collection main responsibility, and this pattern is gradually violating **Single responsibly and Open/closed principles**

#### Here's the place that Iterator pattern comes into play!

> Iterator is a behavioral design pattern that let's us to traverse elements of a collection without exposing it's underlying representation.

That essentially means we can separate the concerns by extracting the traversal behavior as a stand-alone object called **iterator**

the iterator object encapsulate different traversal information such as current value, next value, is done and more immortally it contains the logics and algorithms in order to traverse the dataStructure properly.

All iterators implements same interface; This make client code compatible with different type of traversal and collections; eventually whenever you want a new way traverse over the elements you just need to implement a new iterator.

By the way heres the most basic [ iterator ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) you can implement in javascript; Make sure to understand what is going on before going further:

```js
let range = {
  from: 1,
  to: 5,

  // for..of calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object,
    // asking it for next values using next()
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // (2)
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let value of range) {
  alert(value); // 1 then 2, then 3, then 4, then 5
}
```

##### Example NO.1

Imagine you are going to implement some sort of game; Which each player should be able to cary item with it's hands. So we can look at the hands as an inventory; because essentially what's their do is to be responsible to carrying out the items; In other words containing items, However we also need to be able to iterate over hands to figure out what their actually carrying so we can call hands **HandHeldInventory**

As we discuss before; We need an **iterator** to traverse over hands and retrieve it's item, From now on we refer to this iterator as **handHeldInventoryIterator**

Take a look at following UML diagram:
_Hint: Use `Command/Ctrl+mouseWheel` to zoom in/out_

<div style="width: 640px; height: 480px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://www.lucidchart.com/documents/embeddedchart/1aa4fa57-dcf8-451a-b5a1-bc241b78d3a9" id="DAcGWUc7NLlV"></iframe></div>

If you review common iterator pattern examples all over the web; Different examples uses different method name to retrieve iterator from iterable, for instance **getIterator** is one of the most common ones; In our case we simulate same factoryMethod _getIterator_ using `[Symbol.Iterator]`; Because essentially`for ... of` loop use the object the this method return to perform the iteration.

Here's the corresponding implementation:

```ts
class HandleHeldInventory {
  constructor(public left: any = null, public right: any = null) {}

  public [Symbol.iterator](): HandleHeldInventoryIterator {
    return new HandleHeldInventoryIterator(this);
  }
}

enum Hand {
  Left,
  Right,
  None,
}

class HandleHeldInventoryIterator {
  private current = Hand.Left;

  constructor(private handheldInventory: HandleHeldInventory) {}

  public next(): { done: boolean; value?: any } {
    switch (this.current) {
      case Hand.Left:
        this.current = Hand.Right;

        return { done: false, value: this.handheldInventory.left };

      case Hand.Right:
        this.current = Hand.None;

        return { done: false, value: this.handheldInventory.right };

      default:
        return { done: true };
    }
  }
}

const hands = new HandleHeldInventory('foo', 'bar');

for (let item of hands) {
  console.log(item); // foo, bar
}
```

##### Example NO.2

[ Refactoring guru ](https://refactoring.guru/design-patterns/iterator/typescript/example)

Intent: Lets you traverse elements of a collection without exposing its
underlying representation (list, stack, tree, etc.).

```ts
interface Iterator<T> {
  // Return the current element.
  current(): any;

  // Return the current element and move forward to next element.
  next(): T;

  // Return the key of the current element.
  key(): number;

  // Checks if current position is valid.
  valid(): boolean;

  // Rewind the Iterator to the first element.
  rewind(): void;
}

interface Aggregator {
  // Retrieve an external iterator.
  getIterator(): Iterator<string>;
}

/**
 * Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 */

class AlphabeticalOrderIterator implements Iterator<string> {
  private collection: WordsCollection;

  /**
   * Stores the current traversal position. An iterator may have a lot of
   * other fields for storing iteration state, especially when it is supposed
   * to work with a particular kind of collection.
   */
  private position: number = 0;

  /**
   * This variable indicates the traversal direction.
   */
  private reverse: boolean = false;

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public current(): any {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): any {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

/**
 * Concrete Collections provide one or several methods for retrieving fresh
 * iterator instances, compatible with the collection class.
 */
class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this);
  }

  public getReverseIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}

/**
 * The client code may or may not know about the Concrete Iterator or Collection
 * classes, depending on the level of indirection you want to keep in your
 * program.
 */
const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Straight traversal:');
while (iterator.valid()) {
  console.log(iterator.next());
}

console.log('');
console.log('Reverse traversal:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}

/* Output

  Straight traversal:
  First
  Second
  Third

  Reverse traversal:
  Third
  Second
  First
*/
```

### Conclusion

There is a tons of benefits using this kinda approach, Here's a few ones:

- Separation of concern; Extracting traversal underlying implementation into it's own encapsulated object

- Iterable is open to using different kind of traverse strategies without any change on it's actual context _Open/clone principle_

- [ Lazy evaluation ](https://en.wikipedia.org/wiki/Lazy_evaluation)
