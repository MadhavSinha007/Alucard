import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-red-400 bg-black">
          Something went wrong. Please refresh.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;