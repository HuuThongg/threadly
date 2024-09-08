export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between">
      <div className="min-h-screen w-full max-w-[640px]">{children}</div>
    </div>
  )
}
