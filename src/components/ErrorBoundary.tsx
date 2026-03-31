import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-black text-white p-6 font-sans">
          <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="inline-block p-4 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
              <span className="text-4xl text-red-500">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white/90">Oops! Something went wrong.</h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We encountered an unexpected error while rendering the 3D configurator. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] uppercase tracking-wider text-xs"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.children || null;
  }

  private get children() {
    return this.props.children;
  }
}

export default ErrorBoundary;
