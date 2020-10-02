import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // 将错误日志上报给服务器
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div>
          <p>Something was wrong</p>
          <div>
            <button
              onClick={() => {
                this.setState({ hasError: false });
              }}>
              重新加载
            </button>
          </div>
        </div>
      );
    }
    return <React.Fragment key={hasError}>{this.props.children}</React.Fragment>;
  }
}

export default ErrorBoundary;
