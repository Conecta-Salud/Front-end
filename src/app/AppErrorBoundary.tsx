import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
  resetKey: string;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(error, errorInfo);
    }
  }

  componentDidUpdate(previousProps: AppErrorBoundaryProps) {
    if (
      this.state.hasError &&
      previousProps.resetKey !== this.props.resetKey
    ) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9FB] p-6">
        <section className="w-full max-w-md rounded-[10px] border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-[22px] font-semibold text-black">
            No pudimos cargar esta vista
          </h1>
          <p className="mt-2 text-[15px] text-gray-600">
            Actualiza la página. Si el problema continúa, vuelve a iniciar
            sesión.
          </p>
          <button
            type="button"
            className="mt-5 rounded-[8px] bg-[#138C4F] px-4 py-2 text-[15px] font-medium text-white"
            onClick={() => globalThis.location.reload()}
          >
            Actualizar
          </button>
        </section>
      </main>
    );
  }
}

export default AppErrorBoundary;
