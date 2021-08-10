import { getSignedUrl } from "./spaces"

export default async function generateMetadata(punk) {
  const data: any = {}
  data.image = await getSignedUrl(punk.id)
  data.external_url = `https://snespunks.com/details/${punk.id}`
  data.name = `SNES 16-Bits Punk #${punk.id + 1}`
  data.description = `SNES 16-Bits Punk #${punk.id + 1} is a exclusive NFT.`
  data.attributes = punk.traits.data
  data.background_color = '648596'

  return data
}