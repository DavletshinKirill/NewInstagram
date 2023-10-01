import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class StompService {
  private stompClient: any;

  constructor() { }

  connect(): void {
    const socket = new SockJS('http://localhost:8080/websocket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket server');
    });
  }

  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      console.log('Disconnected from WebSocket server');
    }
  }

  subscribe(destination: string, callback: any): Observable<any> {
    return this.stompClient.subscribe(destination, callback);
  }

  unsubscribe(subscription: any): void {
    subscription.unsubscribe();
  }

  send(destination: string, message: any): void {
    this.stompClient.send(destination, {}, JSON.stringify(message));
  }

  get connected(): boolean {
    return this.stompClient !== null && this.stompClient.connected;
  }

}


