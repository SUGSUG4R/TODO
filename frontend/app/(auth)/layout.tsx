import Header from '@/components/Header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="auth" />
      <div className="pt-14">{children}</div>
    </>
  )
}
