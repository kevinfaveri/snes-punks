import tables from "@databases/pg-typed";
import DatabaseSchema, { serializeValue } from "__generated__";

const createConnectionPool = require('@databases/pg');
export const db = createConnectionPool(
  process.env.DATABASE_CONNECTION_STRING,
);

const { snes_punks } = tables<DatabaseSchema>({
  serializeValue,
});

export const punksDb = snes_punks;