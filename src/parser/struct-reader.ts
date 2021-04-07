import { HEADER_SIZE } from './constants';

export class StructReader {
  private readonly buffer: Buffer;
  private offset = 0;
  private ended = false;

  constructor(private size: number, private onEnd: (buffer: Buffer) => void) {
    this.buffer = Buffer.alloc(size);
  }

  take(data: Buffer): number {
    if (this.ended) {
      return 0;
    }

    const bytesRead = data.copy(this.buffer, this.offset, 0, this.size);
    this.offset += bytesRead;

    if (this.ready) {
      this.end();
    }

    return bytesRead;
  }

  get ready(): boolean {
    return this.offset === this.size;
  }

  get isEnded(): boolean {
    return this.ended;
  }

  end(): void {
    this.ended = true;
    this.onEnd(this.buffer);
  }
}

export class HeaderReader extends StructReader {
  constructor(onEnd: (buffer: Buffer) => void) {
    super(HEADER_SIZE, onEnd);
  }
}
