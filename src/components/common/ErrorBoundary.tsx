import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught GameDev Portfolio Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('portfolio_view_mode');
      localStorage.removeItem('portfolio_theme_mode');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070a0f] text-slate-100 flex items-center justify-center p-6 font-mono selection:bg-[#ff0055]/30">
          <div className="max-w-lg w-full bg-[#0a0d14] border border-[#ff0055]/50 p-6 sm:p-8 rounded shadow-[0_0_30px_rgba(255,0,85,0.2)]">
            <div className="flex items-center space-x-3 text-[#ff0055] mb-4">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
              <div>
                <h1 className="text-sm uppercase tracking-widest font-bold">SYSTEM RUNTIME RECOVERY</h1>
                <p className="text-[11px] text-slate-400">GameDev Portfolio Exception Handled</p>
              </div>
            </div>

            <div className="bg-[#05070a] border border-slate-800 p-4 rounded text-xs text-slate-300 mb-6 overflow-x-auto">
              <p className="text-[#ff0055] font-semibold mb-1">
                {this.state.error?.name || 'RuntimeError'}: {this.state.error?.message || 'Unknown error occurred'}
              </p>
              <p className="text-[10px] text-slate-500 mt-2">
                Click below to reset state cache and reboot developer room.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>[ REBOOT SYSTEM // KHỞI ĐỘNG LẠI ]</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
