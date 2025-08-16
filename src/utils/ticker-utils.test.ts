import * as TickerUtils from './ticker-utils';

describe('TickerUtils.toSmallTicker', () => {
  it('return 3 letters ticker from original', () => {
    expect(TickerUtils.toSmallTicker('KGHM')).toBe('kgh');
  });
});
