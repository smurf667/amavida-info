import React, { ErrorInfo } from 'react';
import { Typography } from '@material-ui/core';
import { Translation } from 'react-i18next';

interface ErrorState {
    hasError: boolean,
}

class ErrorBoundary extends React.Component<any, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Typography variant="h3" component="div" style={{ display: 'flex' }}>
          <Translation>{ (t) => t('error')}</Translation>
        </Typography>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
