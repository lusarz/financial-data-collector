import Papa from 'papaparse';

type Schema<T> = {
  safeParse: (data: unknown) =>
    | { success: true; data: T }
    | {
        success: false;
        error: unknown;
      };
};

export function parseCSV<T>(data: string, schema: Schema<T>, fallbackValue: T) {
  const parsed = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });

  const zodParseResult = schema.safeParse(parsed.data);
  if (zodParseResult.success) {
    return zodParseResult.data;
  } else {
    console.error(zodParseResult.error);
    return fallbackValue;
  }
}
