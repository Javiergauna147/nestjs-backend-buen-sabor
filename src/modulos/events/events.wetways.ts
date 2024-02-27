import { Logger, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import e from 'express';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

export interface Entidad {
  socketId: string
  user: string,
  rol: string
}

export interface DataEvent<T> {
  type: string,
  data: T
}
export interface ServerToClientEvents {
  evento: (e: DataEvent<any>) => void
}

export interface ClientToServerEvents {
  evento: (e: DataEvent<any>) => void
  join_room: (e: { user: string; roomName: string }) => void
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  private entidades: Entidad[] = []
  @WebSocketServer()
  server: Server = new Server();

  private logger = new Logger('EventGateway');
  
  @SubscribeMessage('pedido') // admin envia actualizacion del pedido
  async pedido(
    @MessageBody() d: string,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    let data: DataEvent<{user_cliente:string, pedido:string, nuevoEstado:string}>;
    if(typeof d === 'string'){
      data = JSON.parse(d)
    }else{
      data = d
    }
    this.logger.log(`data: ${data}`)
    const entidad = this.entidades.find(e => e.socketId === socket.id);
    if(entidad.rol === '')
      return;
    if( data.type === 'pedido_update'){
      const entidadCliente = this.entidades.find(e => e.user === data.data.user_cliente);
      if(entidad.rol == 'back' && entidadCliente){
        const sockets = await this.server.fetchSockets()
        for (const socketi of sockets) {
          if(socketi.id === entidadCliente.socketId){
            socketi.emit('pedido_update', data);
            return;
          }
        }
      }
      else if(entidad.rol === 'cliente'){
        const entidadesAdmin = this.entidades.filter(e => e.rol === 'back');

        const sockets = await this.server.fetchSockets()
        for (const socketi of sockets) {
          let sock = entidadesAdmin.find((e) => e.socketId === socketi.id);
          if(sock){
            socketi.emit('pedido_update', data);
          }
        }
      }
    }
  }

  

  @SubscribeMessage('join') // admin envia actualizacion del pedido
  async identity(
    @MessageBody() d:any ,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    //detect is string or object objec d
    let data: DataEvent<{user:string}>;
    if(typeof d === 'string'){
      data = JSON.parse(d)
    }else{
      data = d
    }
    this.logger.log(`data: ${data}`)
    this.logger.log(`data: ${data.type}`)
    if(data.type === 'join_cliente'){
      //update entidades
      const entidad = this.entidades.find(e => e.socketId === socket.id)
      entidad.user = data.data.user
      entidad.rol = 'cliente'
      this.logger.log(`all entidades: ${JSON.stringify(this.entidades)}`)
      return;
    }else if(data.type === 'join_back'){
      //update entidades
      const entidad = this.entidades.find(e => e.socketId === socket.id)
      entidad.user = data.data.user
      entidad.rol = 'back'
      this.logger.log(`all entidades: ${JSON.stringify(this.entidades)}`)
      return;
    }
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.entidades.push({socketId: socket.id, user: '', rol: ''})
    this.logger.log(`Socket connected: ${socket.id}`)
    this.logger.log(`all entidades: ${JSON.stringify(this.entidades)}`)

  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this.entidades = this.entidades.filter(e => e.socketId !== socket.id)
    this.logger.log(`Socket disconnected: ${socket.id}`)
    this.logger.log(`all entidades: ${JSON.stringify(this.entidades)}`)
  }

}
