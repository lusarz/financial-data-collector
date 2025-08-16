import * as cheerio from 'cheerio';
import * as FileUtils from '../utils/file-utils';
import * as FetchUtils from '../utils/fetch-utils';

type QuarterlyFinancialRow = {
  date: string;
  [field: string]: string | number | null;
};

export type BiznesRadarKindOfData = 'rachunek-zyskow-i-strat' | 'bilans';

export async function fetch(ticker: string, kind: BiznesRadarKindOfData) {
  const data = await FetchUtils.get(`https://www.biznesradar.pl/raporty-finansowe-${kind}/${ticker},Q`);

  await FileUtils.saveFile(`./data/raw-data/biznes-radar/${ticker}-${kind}.html`, data);

  const $ = cheerio.load(data);

  const columns = [];
  const rows: QuarterlyFinancialRow[] = [];

  // Extract column headers (dates)
  $('.report-table tr')
    .first()
    .find('th')
    .slice(1)
    .each((_, el) => {
      console.log(el);
      const date = $(el).text().trim().replace(/\s+/g, '').slice(0, 7);
      columns.push(date);
      rows.push({ date }); // Initialize row with date
    });

  // Extract each financial data row
  $('.report-table tr[data-field]')
    .slice(1)
    .each((_, tr) => {
      const $tr = $(tr);
      const field = $tr.attr('data-field')!;
      const tds = $tr.find('td').slice(1); // Skip label cell

      tds.each((i, td) => {
        if (!rows[i]) return; // Skip if index out of bounds
        const text = $(td).text().trim().replace(/\s+/g, '');
        const value = text === '' || text === '-' ? null : parseFloat(text.replace(',', '.'));
        rows[i][field] = value ? value * 1000 : null;
      });
    });

  const result = rows.slice(0, rows.length - 1);
  await FileUtils.saveFile(`./data/transformed-data/biznes-radar/${ticker}-${kind}.json`, result, { json: true });
}
