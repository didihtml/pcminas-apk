import React from "react";
import { Construction } from "lucide-react";

interface AuthenticatedPlaceholderPageProps {
  title: string;
}

const AuthenticatedPlaceholderPage: React.FC<
  AuthenticatedPlaceholderPageProps
> = ({ title }) => (
  <div className="flex min-h-[100dvh] flex-col bg-white pb-28">
    <header
      className="flex h-28 items-end px-5 pb-5 text-white"
      style={{ background: "#185CB7" }}
    >
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <Construction size={48} className="text-[#1B5DB5]" />
      <p className="text-sm text-slate-500">Esta área está em desenvolvimento.</p>
    </main>
  </div>
);

export default AuthenticatedPlaceholderPage;
