import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTask } from "../services/api";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (title.trim().length === 0) {
      setError("O título da task é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      await createTask(title.trim());
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Nova task</h2>
          <p className="text-sm text-slate-500">
            Preencha o título e salve para aparecer na listagem.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Voltar
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="title">
            Título
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Ex: Configurar e-mail corporativo"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Salvando..." : "Salvar task"}
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Voltar
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewTask;
