import * as BiznesRadarFetcher from './data-fetchers/fetch-biznes-radar';

(async () => {
  await BiznesRadarFetcher.fetch('KGHM', 'bilans');
  await BiznesRadarFetcher.fetch('KGHM', 'rachunek-zyskow-i-strat');
})();
