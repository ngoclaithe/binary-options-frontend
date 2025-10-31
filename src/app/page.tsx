export default function Home() {
  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome</h1>
        <p className="opacity-80 mb-6">Binary Options trading UI starter. Use the links above to Login, view Wallet, or start Trading.</p>
        <div className="flex gap-3 flex-wrap">
          <a className="rounded-full h-10 px-5 bg-foreground text-background inline-flex items-center font-medium" href="/login">Get started</a>
          <a className="rounded-full h-10 px-5 border border-black/10 dark:border-white/10 inline-flex items-center" href="/trading">Live Trading</a>
        </div>
      </div>
    </div>
  );
}
