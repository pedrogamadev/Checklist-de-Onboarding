import { Route, Routes } from "react-router-dom";
import TasksList from "./pages/TasksList";
import NewTask from "./pages/NewTask";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Checklist</p>
            <h1 className="text-xl font-semibold">Onboarding Tasks</h1>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            Atividade 2
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/new" element={<NewTask />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
