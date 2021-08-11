import { getImageUrl } from "./spaces"

export default async function generateMetadata(punk) {
  const data: any = {}
  data.id = punk.id
  data.image = await getImageUrl(punk.id)
  data.external_url = `https://snespunks.com/gallery/${punk.id}`
  data.name = `SNES 16-Bits Punk #${punk.id + 1}`
  data.description = `SNES 16-Bits Punk #${punk.id + 1} is an unique NFT.`
  data.attributes = punk.traits.data
  data.background_color = '648596'

  return data
}