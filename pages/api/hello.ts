export default function helloAPI(req: any, res: any) {
  res.status(200).json({ name: 'John Doe' })
}
