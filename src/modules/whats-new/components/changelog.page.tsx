import { CHANGELOG } from "@/lib/changelog";

export function ChangelogPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-10">Changelog</h1>

      <div className="space-y-10">
        {CHANGELOG.map((entry) => (
          <section key={entry.version} className="border rounded-xl p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">v{entry.version}</h2>

              <p className="text-sm text-muted-foreground">{entry.date}</p>
            </div>

            <p className="font-medium mb-4">{entry.title}</p>

            <ul className="list-disc pl-5 space-y-2">
              {entry.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
