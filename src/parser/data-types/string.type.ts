import { DataType } from '../interfaces/data-type.interface';
import { DELIMITER, DELIMITER_OFFSET } from '../constants';

export class StringType implements DataType<string> {
  parse(buffer: Buffer, offset: number, instance: unknown): string {
    return buffer.slice(offset, buffer.indexOf(DELIMITER, offset)).toString();
  }

  write(buffer: Buffer, value: string, offset: number): number {
    return buffer.write(value, offset) + DELIMITER_OFFSET;
  }

  size(value: string): number {
    return value.length + DELIMITER_OFFSET;
  }
}

export const STRING = new StringType();
