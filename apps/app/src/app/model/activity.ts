import { Timestamp } from '@angular/fire/firestore';

export interface BaseActivity<D> {
  id?: string;
  type: ActivityType;
  data: D;
  createdAt: Timestamp;
}

export type ActivityType = 'trade-info' | 'trade-ask' | 'capture';

export interface AskerPayload {
  askerId: string;
  askerPokemonId: string;
}

export interface TargetPayload {
  userId: string;
  userPokemonId: number;
}

export interface TradeInfoActivityPayload extends AskerPayload, TargetPayload {}

export interface TradeAskActivityPayload extends AskerPayload, TargetPayload {
  status: 'pending' | 'accepted' | 'declined';
}

export type CaptureActivityPayload = TargetPayload;
