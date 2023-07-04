import { createSubscribable } from "./subscribable-function";

const sub = createSubscribable<string>();

const unsub = sub.subscribe(console.log);
sub.publish("hello");
unsub();
sub.publish("wut");
