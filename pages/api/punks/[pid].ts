import generateMetadata from "utils/generate-metadata"
import { db, punksDb } from "utils/pool"

export default async function getSpecificPunk(req: any, res: any) {
  const { pid } = req.params
  const punk: any = await punksDb(db).findOne({ id: pid }) || {}
  const data = await generateMetadata(punk)

  res.status(200).json({ data })
}
