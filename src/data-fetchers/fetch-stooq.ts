import * as FetchUtils from '../utils/fetch-utils';
import * as CSVUtils from '../utils/csv-utils';
import * as FileUtils from '../utils/file-utils';
import { StooqItemsSchema } from '../types/stooq-schema';

export async function fetchStooqData(ticker: string) {
  const data = await FetchUtils.get('https://stooq.pl/q/d/l/', { s: ticker, i: 'd' });
  await FileUtils.saveFile(`./data/raw-data/stooq/${ticker}.csv`, data);

  const items = CSVUtils.parseCSV(data, StooqItemsSchema, []);

  const result = items.map((item) => ({
    date: item.Data,
    open: item.Otwarcie,
    highest: item.Najwyzszy,
    lowest: item.Najnizszy,
    close: item.Zamkniecie,
    volume: item.Wolumen,
  }));

  await FileUtils.saveFile(`./data/transformed-data/stooq/${ticker}.json`, result, { json: true });
}
