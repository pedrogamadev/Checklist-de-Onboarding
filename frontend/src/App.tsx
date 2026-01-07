import { Route, Routes } from "react-router-dom";
import TasksList from "./pages/TasksList";
import NewTask from "./pages/NewTask";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Checklist
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">Onboarding Tasks</h1>
            <p className="text-sm text-slate-500">
              Organize as tarefas essenciais do time com clareza.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            Atividade 2
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-10">
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/new" element={<NewTask />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
