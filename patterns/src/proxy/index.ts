// pub sub
function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe(subscriber: (msg: MessageType) => void): () => void {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },

    publish(msg: MessageType) {
      subscribers.forEach((subscriber) => subscriber(msg));
    },
  };
}

type ObservableMessage<T> = {
  target: T;
  prop: string;
};

type Observable<T> = T & {
  subscribe: (callback: (data: ObservableMessage<T>) => void) => () => void;
};

function createObservable<DataType>(data: DataType): Observable<DataType> {
  const subscribers = createSubscribable<ObservableMessage<DataType>>();

  return new Proxy(
    {
      ...data,
      subscribe: subscribers.subscribe,
    },
    {
      set: function (target: object, prop: string, value: any) {
        Reflect.set(target, prop, value);
        subscribers.publish({
          target,
          prop,
        } as unknown as ObservableMessage<DataType>);
        return true;
      },
    }
  ) as Observable<DataType>;
}

interface Message {
  message1: string;
  message2: string;
}

const target: Message = {
  message1: "hello",
  message2: "world",
};

const proxy = createObservable<Message>(target);
proxy.subscribe(console.log);
proxy.message1 = "goodbye";
