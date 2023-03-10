// filename: WhenBox.tsx
// This is a React component called WhenBox that takes two props: expr and onExprChanged. It also has a state called expr. The component displays an expression parser output and an ExpressionEditor component. When the ExpressionEditor component is used to update the expression, it calls the handleExpressionChange function which updates both the expr state and calls the onExprChanged callback prop.
import React from 'react';
import {Expr} from '../AST';
import {ExpressionParser} from '../utils/parser';
import ExpressionEditor from './ExpressionEditor';

type WhenBoxProps = {
    expr: Expr|null
    onExprChanged: (expr: Expr|null) => void
}

type WhenBoxState = {
    expr: Expr|null
}

class WhenBox extends React.Component<WhenBoxProps, WhenBoxState> {
    constructor(props: WhenBoxProps) {
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
                When: {parser.parseExpressionToString()}
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

export default WhenBox;