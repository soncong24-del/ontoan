"use client";

import { Component, type ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

interface State {
  error: boolean;
}

export class QuestionBoundary extends Component<Props, State> {
  state: State = { error: false };

  static getDerivedStateFromError(): State {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return (
        <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-950">
          Không hiển thị được {this.props.label}. Các câu khác vẫn làm và nộp được.
        </p>
      );
    }
    return this.props.children;
  }
}
