import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTaskById, Task } from "../services/api";

const TaskDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTask = async () => {
            if (!id || Number.isNaN(Number(id))) {
                setError("ID inválido.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await getTaskById(Number(id));
                setTask(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro ao carregar task.");
            } finally {
                setLoading(false);
            }
        };

        loadTask();
    }, [id]);

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                >
                    &larr; Voltar
                </Link>
                <h2 className="text-xl font-semibold text-slate-900">Detalhes da Task</h2>
            </div>

            {loading && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
                    Carregando task...
                </div>
            )}

            {!loading && error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
                    {error}
                </div>
            )}

            {!loading && !error && task && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{task.title}</h3>

                    <div className="flex gap-2">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${task.done
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                        >
                            {task.done ? "Concluída" : "Pendente"}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                            ID: {task.id}
                        </span>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TaskDetails;
