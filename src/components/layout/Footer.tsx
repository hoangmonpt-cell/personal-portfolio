import React from 'react';
import { useI18n } from '../../i18n';
import { Terminal, Shield } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
      <footer className="border-t border-slate-900 bg-[#07090d] py-10 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left: Engine Info */}
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#00f0ff]" />
            <span>{t.footer.builtWith}</span>
          </div>

          {/* Center: Deployment Status */}
          <div className="flex items-center space-x-1.5 text-[#00ff88]">
            <Shield className="w-3.5 h-3.5" />
            <span>{t.footer.deployReady}</span>
          </div>

          {/* Right: Copyright */}
            <div className="text-slate-400">
              © {CURRENT_YEAR} {t.footer.rights}
            </div>

          </div>
      </footer>
      );
};
