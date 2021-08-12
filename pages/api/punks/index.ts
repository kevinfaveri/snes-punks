import generateMetadata from "utils/generate-metadata";
import { db, punksDb } from "utils/pool"
import { greaterThan } from '@databases/pg-typed';

export default async function getPunks(req: any, res: any) {
  const { ids = [], cursor } = req.query

  const punks: any[] = ids.length === 0 ? await punksDb(db)
    .find({
      ...(cursor ? { id: greaterThan(cursor) } : {}),
    })
    .orderByAsc(`id`)
    .limit(500) : await punksDb(db).find({ id: ids }).orderByAsc(`id`).all() as any
  await db.dispose()
  const data: any[] = []
  for (let index = 0; index < punks.length; index++) {
    const dataToAdd = await generateMetadata(punks[index])
    data.push(dataToAdd)
  }
  res.status(200).json({ data, meta: { cursor: data[data.length - 1]?.id } })
}
