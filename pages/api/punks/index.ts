import generateMetadata from "utils/generate-metadata";
import { db, punksDb } from "utils/pool"
import { getSignedUrl } from "utils/spaces";

export default async function getPunks(req: any, res: any) {
  const { ids } = req.query
  const punks: any[] = await punksDb(db).find({ id: ids }) as any
  const data: any[] = []
  for (let index = 0; index < punks.length; index++) {
    const dataToAdd = await generateMetadata(punks[index])
    data.push(dataToAdd)
  }
  res.status(200).json({ data: punks })
}
