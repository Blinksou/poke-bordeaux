import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { BaseActivity, TradeAskActivityPayload } from '../model/activity';

const COLLECTION_NAME = 'activities';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  userId!: string;

  constructor(
    private readonly firestore: Firestore,
    private readonly authService: AuthService
  ) {
    this.authService.$user.subscribe((user) => (this.userId = user?.uid ?? ''));
  }

  async createTradeAsk(
    askerPokemonId: string,
    targetId: string,
    targetPokemonId: string
  ) {
    const trade: BaseActivity<TradeAskActivityPayload> = {
      type: 'trade-ask',
      data: {
        status: 'pending',
        askerId: this.userId,
        askerPokemonId: askerPokemonId,
        userId: targetId,
        userPokemonId: targetPokemonId,
      },
    };

    return await setDoc(doc(this.firestore, COLLECTION_NAME), trade);
  }

  async declineTradeAsk(tradeId: string) {
    const trade = await this.getTradeAsk(tradeId);

    // Update the trade status to declined
    return await setDoc(doc(this.firestore, COLLECTION_NAME, tradeId), {
      ...trade,
      data: {
        ...trade.data,
        status: 'declined',
      },
    });
  }

  async acceptTradeAsk(tradeId: string) {
    const trade = await this.getTradeAsk(tradeId);

    // Update the trade status to accepted
    return await setDoc(doc(this.firestore, COLLECTION_NAME, tradeId), {
      ...trade,
      data: {
        ...trade.data,
        status: 'accepted',
      },
    });
  }

  private async getTradeAsk(tradeId: string) {
    return getDoc(doc(this.firestore, COLLECTION_NAME, tradeId));
  }
}
