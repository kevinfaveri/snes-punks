export default function getPunks(req: any, res: any) {
  const { ids } = req.query
  res.status(200).json({ data: 'ALL_TOKENS' })
}
