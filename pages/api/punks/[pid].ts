import { db, punksDb } from "utils/pool"
import { getSignedUrl } from "utils/spaces"

export default async function getSpecificPunk(req: any, res: any) {
  const { pid } = req.params
  const punk: any = await punksDb(db).findOne({ id: pid }) || {}
  punk.image = await getSignedUrl(punk.id)
  punk.external_url = `https://snespunks.com/details/${punk.id}`
  punk.name = `SNES 16-Bits Punk #${punk.id + 1}`
  punk.description = `SNES Punk #${punk.id + 1}`

  res.status(200).json({ data: punk })
}
