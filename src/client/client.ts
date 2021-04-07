import EventEmitter from 'events';
import { SocketConnectOpts } from 'net';
import { race, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Connection } from './connection';
import { Transport } from './transport';
import { HEADER_SIZE } from '../parser/constants';
import { StructType } from '../parser/enums/struct-type.enum';
import { EchoStruct } from './structs/echo.struct';
import { parsers } from './struct-parsers';
import { StructBus } from './struct-bus';
import { EchoMessage } from './schemas/interfaces/echo-message.interface';
import { AuthStruct } from './structs/auth.struct';
import { AuthorizeStatus } from '../parser/enums/authorize-status.enum';
import { AuthorizeResponse } from './schemas/interfaces/authorize-response.interface';
import { AuthorizeRequest } from './schemas/interfaces/authorize-request.interface';
import { HistoryRequestStruct } from './structs/history-request.struct';
import { GetHistoryArgs } from './interfaces/get-history-args.interface';

export class Client extends EventEmitter {
  private readonly transport: Transport;
  private readonly connection: Connection;
  private readonly structBus = new StructBus();

  private requestId = 1;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor(tcpOptions: SocketConnectOpts) {
    super();

    this.transport = new Transport(tcpOptions);
    this.connection = new Connection(this.transport);

    this.transport.on('connect', () => this.handleTransportConnect());
    this.transport.on('close', () => this.handleTransportClose());
    this.transport.on('error', (error) => this.handleTransportError(error));

    this.connection.structs.subscribe(this.handleRawStruct.bind(this));
  }

  private handleRawStruct({
    structType,
    buffer,
  }: {
    structType: StructType;
    buffer: Buffer;
  }) {
    const struct = buffer.slice(HEADER_SIZE);
    const parser = parsers[structType];
    const message = parser(struct);
    this.structBus.push(structType, message);
  }

  private handleTransportConnect() {
    this.emit('connect');
  }

  private handleTransportClose() {
    this.emit('close');
  }

  private handleTransportError(error: Error) {
    this.emit('error', error);
  }

  private getNewRequestId() {
    return this.requestId++;
  }

  async connect() {
    await this.transport.connect();
  }

  async close() {
    await this.transport.close();
  }

  async echo(): Promise<EchoMessage> {
    await this.connection.send(new EchoStruct({ time: 0 }));
    return this.structBus.echoMessages.pipe(first()).toPromise();
  }

  async auth(credentials: AuthorizeRequest): Promise<AuthorizeResponse> {
    await this.connection.send(new AuthStruct(credentials));
    const response = await this.structBus.authorizeResponses
      .pipe(first())
      .toPromise();
    if (response.status === AuthorizeStatus.REJECT) {
      throw new Error('Invalid credentials');
    } else {
      return response;
    }
  }

  fetchResponse<T extends { id: number }>(
    requestId: number,
    subject: Subject<T>
  ) {
    return race(
      subject.pipe(first((response) => response.id === requestId)),
      this.structBus.requestErrors.pipe(
        first((response) => response.requestId === requestId)
      )
    ).toPromise();
  }

  async getHistory(args: GetHistoryArgs) {
    const requestId = this.getNewRequestId();
    await this.connection.send(
      new HistoryRequestStruct({ ...args, id: requestId })
    );
    return this.fetchResponse(requestId, this.structBus.historyResponses);
  }

  startHeartbeat(msecs: number) {
    this.on('connect', () => {
      this.heartbeatInterval = setInterval(() => this.echo(), msecs);
    });
    this.on('close', () => this.stopHeartbeat());
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.heartbeatInterval = null;
  }
}
