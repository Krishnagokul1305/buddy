function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="flex-1 container py-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex gap-3  justify-between md:items-center">
            <h1 className="text-3xl font-bold">Shared Notes</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

export default layout;
