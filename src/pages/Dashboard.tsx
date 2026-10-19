import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClass } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { formatDate } from "@/lib/utils";
import { sortByUrgency, urgencyOf } from "@/lib/urgency";

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, loading, error, completeTask } = useTasks();

  const done = tasks.filter((t) => t.status === "Selesai").length;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const score = tasks.reduce((sum, t) => sum + (t.score || 0), 0);
  const late = sortByUrgency([...tasks]).filter(
    (t) => urgencyOf(t.due_date).tone === "late",
  ).length;
  const recommended = sortByUrgency([...tasks]).slice(0, 5);

  const stats = [
    { label: "Tugas selesai", value: `${done} / ${tasks.length}` },
    { label: "Total poin", value: String(score) },
    { label: "Terlambat", value: String(late) },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <p className="mt-1 text-muted">Halo, {user?.email}</p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md bg-danger-soft px-4 py-3 text-sm text-danger"
        >
          {error}
        </p>
      )}

      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="font-bold">Progres belajar</h2>
            <span className="text-2xl font-extrabold text-brand">
              {progress}%
            </span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-surface"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <dl className="grid gap-4 pt-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="text-xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Kerjakan berikutnya</CardTitle>
          <Link
            to="/tugas"
            className={buttonClass({ variant: "outline", size: "sm" })}
          >
            Atur semua tugas
          </Link>
        </CardHeader>
        {loading ? (
          <p className="p-8 text-center text-muted">Memuat…</p>
        ) : recommended.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted">
              Tidak ada tugas aktif. Tambahkan tugas atau mulai dari sebuah
              modul.
            </p>
            <Link to="/modul" className={buttonClass({}, "mt-4")}>
              Lihat modul
            </Link>{" "}
          </div>
        ) : (
          <ul>
            {recommended.map((t) => {
              const u = urgencyOf(t.due_date);
              return (
                <li
                  key={t.id}
                  className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 last:border-0"
                >
                  <div>
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-sm text-muted">
                      {formatDate(t.due_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={u.tone}>{u.label}</Badge>
                    <Button size="sm" onClick={() => completeTask(t)}>
                      <Check className="h-4 w-4" aria-hidden /> Selesai
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
