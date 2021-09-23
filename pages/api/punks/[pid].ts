import generateMetadata from "utils/generate-metadata"
import { readCSV } from "utils/read-dataset"

export default async function getSpecificPunk(req: any, res: any) {
  const { pid } = req.query
  const dataset: any = await readCSV()
  const punk: any = dataset.find((({id}) => Number(id) === Number(pid))) || {}
  const data = await generateMetadata(punk)

  res.status(200).json(data)
}
