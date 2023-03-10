// filename : IfBox.tsx
// This code defines a React component called IfBox that displays an expression and allows the user to edit it using an ExpressionEditor component. The IfBox component takes two props: expr, which is the initial expression to display, and onExprChanged, which is a callback function that is called when the expression is edited. The handleExpressionChange method updates the state of the IfBox component with the new expression and also calls the onExprChanged callback with the new expression. The render method of the component displays the current expression and the ExpressionEditor component.
import React from 'react';
import {Expr} from '../AST';
import {ExpressionParser} from '../utils/parser';
import ExpressionEditor from './ExpressionEditor';

type IfBoxProps = {
    expr: Expr|null
    onExprChanged: (expr: Expr|null) => void
}

type IfBoxState = {
    expr: Expr|null
}

class IfBox extends React.Component<IfBoxProps, IfBoxState> {
    constructor(props: IfBoxProps) {
        super(props);
        this.state = {
            expr: props.expr,
        }

        this.handleExpressionChange = this.handleExpressionChange.bind(this);
    }

    render() {
        let parser: ExpressionParser = new ExpressionParser(this.state.expr);
        return(<div>
            <div>
                If: {parser.parseExpressionToString()}
            </div>
            <ExpressionEditor
                expr={this.state.expr}
                onExprChange={this.handleExpressionChange}/>
        </div>);
    }

    handleExpressionChange(newExpr: Expr|null) {
        this.props.onExprChanged(newExpr);
        this.setState({
            expr: newExpr
        });
    }
}

export default IfBox;