export default function getSpecificPunk(req: any, res: any) {
  const { pid } = req.params
  res.status(200).json({ data: 'SPECIFIC PUNK' })
}
