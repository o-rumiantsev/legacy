import { DataType } from '../interfaces/data-type.interface';

export class BinaryType implements DataType<Buffer> {
  constructor(
    private extractLength: (instance: Record<string, unknown>) => number
  ) {}

  parse(
    buffer: Buffer,
    offset: number,
    instance: Record<string, unknown>
  ): Buffer {
    return buffer.slice(offset, offset + this.extractLength(instance));
  }

  write(buffer: Buffer, value: Buffer, offset: number): number {
    return value.copy(buffer, offset);
  }

  size(buffer: Buffer): number {
    return buffer.length;
  }
}
