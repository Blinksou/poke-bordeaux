export type BaseActivity<D> = {
  type: 'trade-ask' | 'trade-info' | 'capture';
  data: D;
};

export type TradeInfoActivityStatus = 'pending' | 'accepted' | 'declined';

export type Asker = {
  askerId: string;
  askerPokemonId: string;
};

export type Target = {
  userId: string;
  userPokemonId: string;
};

export interface TradeAskActivity extends BaseActivity<Asker & Target> {
  type: 'trade-ask';
}

export interface TradeInfoActivity
  extends BaseActivity<Asker & Target & { status: TradeInfoActivityStatus }> {
  type: 'trade-info';
}

export interface CaptureActivity
  extends BaseActivity<{ userId: string; pokemonId: string }> {
  type: 'capture';
}
