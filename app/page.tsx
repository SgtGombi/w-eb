export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative">
        <div
          className="h-72 sm:h-96 w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative max-w-6xl mx-auto px-6 py-24 text-white">
            <h1 className="text-4xl font-bold">Mentett állatok várnak rád</h1>
            <p className="mt-2 text-lg">Ismerd meg a kutyákat, cicákat és menhelyeket.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <article className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=60"
              alt="Kutya"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 text-xl font-semibold">Kutyák</h3>
            <p className="mt-2 text-zinc-600 text-center">Találd meg a következő hűséges társad.</p>
          </article>

          <article className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=60"
              alt="Cica"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 text-xl font-semibold">Cicák</h3>
            <p className="mt-2 text-zinc-600 text-center">Olyan doromboló szívek, amik otthonra várnak.</p>
          </article>

          <article className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=60"
              alt="Menhely"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 text-xl font-semibold">Menhelyek</h3>
            <p className="mt-2 text-zinc-600 text-center">Támogasd a helyi menhelyeket vagy lépj kapcsolatba velük.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
