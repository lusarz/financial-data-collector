import * as StooqFetcher from './data-fetchers/fetch-stooq';

(async () => {
  await StooqFetcher.fetchStooqData('kgh');
})();
