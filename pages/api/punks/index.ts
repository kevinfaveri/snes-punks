import generateMetadata from "utils/generate-metadata";
import { paginator, readCSV } from "utils/read-dataset"

const paginateDataset = async (cursor, limit) =>  {
  const dataset: any = await readCSV()
  const foundPunks = paginator(dataset, cursor, limit)
  return foundPunks
}

const findById = async (ids) =>  {
  const dataset: any = await readCSV()
  return dataset.filter(({id}) => ids.includes(Number(id)))
}

export default async function getPunks(req: any, res: any) {
  let { ids = [], cursor } = req.query
  ids = Array.isArray(ids) ? ids : [ids]
  ids.forEach((_, index) => {
    ids[index] = Number(ids[index])
  });

  const punks: any[] = ids.length === 0 ? await paginateDataset(cursor, 500) : await findById(ids)
  const data: any[] = []
  for (let index = 0; index < punks.length; index++) {
    const dataToAdd = await generateMetadata(punks[index])
    data.push(dataToAdd)
  }
  res.status(200).json({ data, meta: { cursor: data[data.length - 1]?.id } })
}
