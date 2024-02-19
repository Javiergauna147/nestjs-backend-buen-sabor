import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class EventsGateway {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('changeStatusPedido')
    async identity(@MessageBody() data: string, @ConnectedSocket() client: Socket): Promise<string> {
        console.log('changeStatusPedido',data);
        client.emit(""+data+"_changeStatusPedido")
      return data;
    }


    
  }