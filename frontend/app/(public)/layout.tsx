import Header from '@/components/Header'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="public" />
      <div className="pt-14">{children}</div>
    </>
  )
}
