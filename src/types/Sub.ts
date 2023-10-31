import { SubTopic } from "./Topic";

export class Sub<K extends keyof SubTopic> {
  readonly callback = (buffer: Buffer) => {
    const payload: SubTopic[K] = JSON.parse(buffer.toString());
    this.process(payload);
  };

  private process: (payload: SubTopic[K]) => void;

  constructor(topic: K, callback: (p: SubTopic[K]) => void) {
    this.process = callback;
  }
}
