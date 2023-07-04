import { Subscribable } from "./subscribable-class";

const sub = new Subscribable();

const unsub = sub.subscribe(console.log);
sub.publish("hello");
unsub();
sub.publish("wut");

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }

  setValue(value: number) {
    this.value = value;
    this.publish(value);
  }
}

const dc = new DataClass(0);
const dcUnsub = dc.subscribe((v: number) => console.log(`dc: ${v}`));

dc.setValue(42);
dcUnsub();
