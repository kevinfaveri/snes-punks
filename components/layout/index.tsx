import Header from '../header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="h-full pt-20">{children}</main>
    </>
  )
}