import Header from '../header'

export default function Layout({ children }) {
  return (
    <div className="h-full">
      <Header />
      <main className="pt-20 h-full">{children}</main>
    </div>
  )
}