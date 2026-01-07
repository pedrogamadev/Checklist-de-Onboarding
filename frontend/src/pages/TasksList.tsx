import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTask, getTasks, Task, updateTask } from "../services/api";

const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir task.");
    }
  };

  const handleMarkDone = async (id: number) => {
    try {
      const updated = await updateTask(id, { done: true });
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar task.");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Minhas tasks</h2>
          <p className="text-sm text-slate-500">
            Acompanhe o status das tarefas criadas no backend.
          </p>
        </div>
        <Link
          to="/new"
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Nova task
        </Link>
      </div>

      {loading && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          Carregando tasks...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          Nenhuma task cadastrada ainda. Crie a primeira!
        </div>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div className="space-y-4">
          {tasks.map((task) => (
            <article
              key={task.id}
              className={`flex flex-col gap-3 rounded-2xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between ${
                task.done ? "border-emerald-100 bg-emerald-50" : "border-slate-200 bg-white"
              }`}
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
                <span
                  className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                    task.done
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {task.done ? "Concluída" : "Pendente"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleMarkDone(task.id)}
                  disabled={task.done}
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  Marcar como feito
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(task.id)}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TasksList;
