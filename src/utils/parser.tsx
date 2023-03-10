// filename: parser.tsx
// This code exports two classes, ExpressionParser and ActionParser, which can parse expressions and actions respectively. ExpressionParser takes an expression object and recursively parses it to a string, while ActionParser takes an action object and returns a string representation of it. The code uses constants from another file and handles unsupported expressions and actions with an error.

import { Expr, Action } from '../AST';
import { SupportedKind, SupportedAction } from './constants';

class ExpressionParser {
  private expr: Expr | null;

  constructor(expr: Expr | null) {
    this.expr = expr;
  }

  /**
   * Parses an expression to a string
   */
  public parseExpressionToString(): string {
    return this.parseExpressionRecursive(this.expr, '');
  }

  /**
   * Recursively parses an expression and returns a string representation
   * @param expr - the expression to parse
   * @param s - the current string representation of the expression
   */
  private parseExpressionRecursive(expr: Expr | null, s: string): string {
    if (!expr) return '';
    switch (expr.kind) {
      case SupportedKind.UNARY_OP:
        return `${s} ${this.handleOperator(expr.operator)} ${this.parseExpressionRecursive(expr.arg, s)}`;
      case SupportedKind.BINARY_OP:
        return `${s} ${this.parseExpressionRecursive(expr.lhs, '')} ${this.handleOperator(expr.operator)} ${this.parseExpressionRecursive(expr.rhs, '')}`;
      case SupportedKind.PROPERTY:
        return `${s} ${expr.device} ${expr.sensor}`;
      case SupportedKind.BOOLEAN:
        return `${s} ${String(expr.value)}`;
      case SupportedKind.NUMBER:
        return `${s} ${String(expr.value)}`;
      case SupportedKind.STRING:
        return `${s} ${expr.value}`;
      default:
        throw new Error(`unsupported expression: ${expr.kind}`);
    }
  }

  /**
   * Handles a given operator
   * @param operator - the operator to handle
   */
  private handleOperator(operator: string): string {
    return operator;
  }
}

class ActionParser {
  private action: Action;

  constructor(action: Action) {
    this.action = action;
  }

  /**
   * Parses an action to a string
   */
  public parseActionToString(): string {
    switch (this.action.kind) {
      case SupportedAction.ACTUATE:
        return `${this.action.device} ${this.action.knob}`;
      case SupportedAction.NOTIFY:
        return `${this.action.channel} notify ${this.action.message}`;
      default:
        throw new Error('unsupported action');
    }
  }
}

export { ExpressionParser, ActionParser };