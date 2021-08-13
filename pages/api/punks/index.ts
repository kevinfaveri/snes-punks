import generateMetadata from "utils/generate-metadata";
import { db, punksDb } from "utils/pool"
import { greaterThan, anyOf } from '@databases/pg-typed';

export default async function getPunks(req: any, res: any) {
  let { ids = [], cursor } = req.query
  ids = Array.isArray(ids) ? ids : [ids]
  ids.forEach((_, index) => {
    ids[index] = Number(ids[index])
  });

  const punks: any[] = ids.length === 0 ? await punksDb(db)
    .find({
      ...(cursor ? { id: greaterThan(cursor) } : {}),
    })
    .orderByAsc(`id`)
    .limit(500) : await punksDb(db).find({ id: anyOf(ids) }).orderByAsc(`id`).all() as any
  const data: any[] = []
  for (let index = 0; index < punks.length; index++) {
    const dataToAdd = await generateMetadata(punks[index])
    data.push(dataToAdd)
  }
  res.status(200).json({ data, meta: { cursor: data[data.length - 1]?.id } })
}
