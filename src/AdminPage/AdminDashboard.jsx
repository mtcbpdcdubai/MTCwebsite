import { useState } from "react";
import { LogOut } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import BlurText from "../components/ui/BlurText.jsx";
import Balatro from "../components/ui/Balatro.jsx";
import CsvImportPanel from "./CsvImport/CsvImportPanel.jsx";
import MemberSearch from "./MemberSearch.jsx";
import FullLeaderboardPanel from "./FullLeaderboardPanel.jsx";
import MembershipsPanel from "./MembershipsPanel.jsx";
import ReferralsPanel from "./ReferralsPanel.jsx";
import ImportHistoryPanel from "./ImportHistoryPanel.jsx";
import AccountSettings from "./AccountSettings.jsx";
import EmailQuotaBadge from "./EmailQuotaBadge.jsx";
import { ConfirmProvider } from "./ConfirmDialog.jsx";

const TABS = [
  { key: "csv", label: "CSV Import", component: CsvImportPanel },
  { key: "members", label: "Member Search", component: MemberSearch },
  { key: "leaderboard", label: "Full Rankings", component: FullLeaderboardPanel },
  { key: "memberships", label: "Memberships", component: MembershipsPanel },
  { key: "referrals", label: "Referrals", component: ReferralsPanel },
  { key: "history", label: "Import History", component: ImportHistoryPanel },
  { key: "account", label: "Account", component: AccountSettings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("csv");
  const ActiveComponent = TABS.find((t) => t.key === activeTab)?.component ?? CsvImportPanel;

  return (
    <ConfirmProvider>
      <div className="bg-transparent text-white min-h-screen py-12 px-4 relative">
        <div className="fixed inset-0 -z-10">
          <Balatro
            isRotate={false}
            mouseInteraction={true}
            pixelFilter={700}
            color1="#000000"
            color2="#0a0a0a"
            color3="#111111"
          />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <BlurText text="MTC Admin" className="text-3xl md:text-4xl font-semibold" delay={50} />
            <div className="flex items-center gap-4">
              <EmailQuotaBadge />
              <button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-white text-black"
                    : "bg-black border border-gray-700 text-white hover:border-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ActiveComponent />
        </div>
      </div>
    </ConfirmProvider>
  );
}
