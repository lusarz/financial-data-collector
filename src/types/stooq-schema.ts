import z from 'zod';

export const StooqItemsSchema = z.array(
  z.object({
    Data: z.string(),
    Otwarcie: z.coerce.number(),
    Najwyzszy: z.coerce.number(),
    Najnizszy: z.coerce.number(),
    Zamkniecie: z.coerce.number(),
    Wolumen: z.coerce.number(),
  }),
);
