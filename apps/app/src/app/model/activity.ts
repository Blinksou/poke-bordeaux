export type BaseActivity<D> = {
  type: 'trade-ask' | 'trade-info' | 'capture';
  data: D;
};

export type Asker = {
  askerId: string;
  askerPokemonId: string;
};

export type Target = {
  targetId: string;
  targetPokemonId: string;
};

export interface TradeAskActivity extends BaseActivity<Asker & Target> {
  type: 'trade-ask';
}

export interface TradeInfoActivity
  extends BaseActivity<
    Asker & Target & { status: 'pending' | 'accepted' | 'rejected' }
  > {
  type: 'trade-info';
}

export interface CaptureActivity
  extends BaseActivity<{ userId: string; pokemonId: string }> {
  type: 'capture';
}
