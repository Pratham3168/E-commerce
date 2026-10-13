import { Component } from 'react'

export default class RouteErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) return <div className="page-shell"><h1>Unable to load this page</h1><p role="alert">{this.state.error.message}</p></div>
    return this.props.children
  }
}
