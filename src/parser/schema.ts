import { SchemaDefinition } from './interfaces/schema-definition.interface';

export class Schema<T> {
  constructor(private definition: SchemaDefinition<T>) {}

  write(buffer: Buffer, instance: T, offset: number = 0) {
    let totalBytesWritten = 0;

    for (const key in this.definition) {
      if (!this.definition.hasOwnProperty(key)) {
        continue;
      }
      const definition = this.definition[key];
      const value = instance[key];
      definition.write(buffer, value, offset);
      const bytesWritten = definition.size(value);
      offset += bytesWritten;
      totalBytesWritten += bytesWritten;
    }

    return totalBytesWritten;
  }

  parse(buffer: Buffer, offset: number = 0): T {
    const instance: T = Object.create(null);

    for (const key in this.definition) {
      if (!this.definition.hasOwnProperty(key)) {
        continue;
      }
      const definition = this.definition[key];
      const value = definition.parse(buffer, offset, instance);
      offset += definition.size(value);
      Object.defineProperty(instance, key, {
        value,
        enumerable: true,
      });
    }

    return instance;
  }

  size(instance: T): number {
    let size = 0;

    for (const key in instance) {
      const definition = this.definition[key];
      const value = instance[key];
      size += definition.size(value);
    }

    return size;
  }

  create(instance: T): Buffer {
    const size = this.size(instance);
    const buffer = Buffer.alloc(size);
    this.write(buffer, instance);
    return buffer;
  }
}
