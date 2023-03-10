// filename : ExpressionEditor.tsx
// The code defines a React component called ExpressionEditor that takes in an expression and a function to handle expression changes as props. It renders a NodeBlock component with the expression prop and a function prop to handle changes. When the expression changes, the component updates its state and calls the function prop to notify of the change. The component is exported as a default export.
import React from 'react';
import {Expr} from '../AST'
import NodeBlock from './NodeBlock';

type EditorProps = {
    expr: Expr|null
    onExprChange:  (expr: Expr|null) => void,
}

type EditorState = {
    expr: Expr|null
}

class ExpressionEditor extends React.Component<EditorProps, EditorState> {
    constructor(props: EditorProps) {
        super(props);
        this.state = {
            expr: props.expr,
        }

        this.handleExpressionChange = this.handleExpressionChange.bind(this);
    }

    componentWillReceiveProps(nextProp: EditorProps) {
        if (this.props.expr != nextProp.expr) {
            this.setState({
                expr: nextProp.expr
            });
        }
    }

    render() {
        return(<div>
            <NodeBlock expr={this.props.expr} onNodeChange={this.handleExpressionChange} />
        </div>);
    }

    handleExpressionChange(expr: Expr|null) {
        this.props.onExprChange(expr);
        this.setState({
            expr: expr
        });
    }
}

export default ExpressionEditor;