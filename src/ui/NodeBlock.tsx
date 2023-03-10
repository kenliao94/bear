// filename: NodeBlock.tsx
// The code defines a NodeBlock component in React that is used to display and edit an AST (abstract syntax tree) expression. The NodeBlock component has several props and state, including an expr prop that represents the expression being displayed, and various functions that are used to handle changes to the expression. The component renders differently based on the kind of the expr object, and includes various input elements and child NodeBlock components that are used to edit the expression. The code uses TypeScript to define the types of the props, state, and other objects in the code.
import React, { ChangeEvent } from 'react';
import {BinaryOp, Expr, Literal, Property, UnaryOp} from '../AST';
import { SupportedKind, SupportedOperation, SupportedDevice, SupportedSensor, DEVICE_SENSORS} from '../utils/constants';

type NodeBlockProps = {
    expr: Expr|null,
    onNodeChange: (expr: Expr|null) => void,
}

type NodeBlockState = {
    expr: Expr|null
}

class NodeBlock extends React.Component<NodeBlockProps, NodeBlockState> {
    constructor(props: NodeBlockProps) {
        super(props);
        this.state = {
            expr: props.expr,
        }
        this.handleLiteralValueChange = this.handleLiteralValueChange.bind(this);
        this.handleLhsNodeChange = this.handleLhsNodeChange.bind(this);
        this.handleRhsNodeChange = this.handleRhsNodeChange.bind(this);
        this.handleArgNodeChange = this.handleArgNodeChange.bind(this);
        this.handleOperatorChange = this.handleOperatorChange.bind(this);
        this.handleDeviceChange = this.handleDeviceChange.bind(this);
        this.handleSensorChange = this.handleSensorChange.bind(this);
    }

    componentWillReceiveProps(nextProp: NodeBlockProps) {
        if (this.props.expr !== nextProp.expr) {
            this.setState({
                expr: nextProp.expr,
            });
        }
    }

    render() {
        if (this.state.expr == null) {
            // Return the editor
            return(<div></div>);
        }
        
        if (this.state.expr.kind === SupportedKind.BINARY_OP) {
            return(<div>
                <NodeBlock expr={this.state.expr.lhs} onNodeChange={this.handleLhsNodeChange}/>
                {this.renderOperator(this.state.expr.operator)}
                <NodeBlock expr={this.state.expr.rhs} onNodeChange={this.handleRhsNodeChange}/>
            </div>);

        } else if (this.state.expr.kind === SupportedKind.UNARY_OP) {
            return(<div>
                {this.renderOperator(this.state.expr.operator)}
                <NodeBlock expr={this.state.expr.arg} onNodeChange={this.handleArgNodeChange}/>
            </div>);

        } else if (this.state.expr.kind === SupportedKind.PROPERTY) {
            return(<div>
                <p>{this.renderDevice(this.state.expr.device)}</p>
                <p>{this.renderSensor(this.state.expr.sensor, this.state.expr.device)}</p>
            </div>);

        } else if (this.state.expr.kind === SupportedKind.NUMBER) {
            let value: number = this.state.expr.value as number;
            return(<div>
                <br/>
                <input type="text" defaultValue={value} onChange={this.handleLiteralValueChange}/>
            </div>);

        } else if (this.state.expr.kind === SupportedKind.BOOLEAN) {
            let bool: boolean = this.state.expr.value as boolean;
            return(<div>
                <br/>
                <input type="text" value={String(bool)} onChange={this.handleLiteralValueChange}/>
            </div>);
        } else if (this.state.expr.kind === SupportedKind.STRING) {
            let name: string = this.state.expr.value as string;
            return(<div>
                <br/>
                <input type="text" defaultValue={name} onChange={this.handleLiteralValueChange}/>
            </div>);
        } else {
            return(<div>Not supported node</div>);
        }
    }
    // a function that pass to rhs 
    handleLhsNodeChange(nextExpr: Expr | null) {
        let newExpr = {
            ...this.state.expr,
            lhs: nextExpr,
        } as Expr;
        // propagate change back to parent
        this.props.onNodeChange(newExpr);
        this.setState({
            expr: newExpr,
        });
    }

    // a function that pass to rhs
    handleRhsNodeChange(nextExpr: Expr | null) {
        let newExpr = {
            ...this.state.expr,
            rhs: nextExpr,
        } as Expr;
        // propagate change back to parent
        this.props.onNodeChange(newExpr);
        this.setState({
            expr: newExpr,
        });
    }

    // a function that pass to arg change
    handleArgNodeChange(nextExpr: Expr | null) {
        let newExpr = {
            ...this.state.expr,
            arg: nextExpr,
        } as Expr;
        // propagate change back to parent
        this.props.onNodeChange(newExpr);
        this.setState({
            expr: newExpr,
        });
    }

    handleLiteralValueChange(event: ChangeEvent) {
        const { target } = event
        let expr = this.state.expr as Literal ;
        let newExpr = {
            ...expr,
            value: (target as HTMLInputElement).value,
        }
        // propagate change back to parent
        this.props.onNodeChange(newExpr);
        this.setState({
            expr: newExpr,
        });
    }

    handleOperatorChange(event: ChangeEvent) {
        const { target } = event
        let expr = this.state.expr as UnaryOp|BinaryOp ;
        let newExpr = {
            ...expr,
            operator: (target as HTMLInputElement).value,
        }
        // propagate change back to parent
        this.props.onNodeChange(newExpr);
        this.setState({
            expr: newExpr,
        });
    }

    handleDeviceChange(event: ChangeEvent) {
        const { target } = event
        let expr = this.state.expr as Property;
        let newExpr = {
            ...expr,
            device: (target as HTMLInputElement).value,
        }
        // propagate change back to parent
        this.props.onNodeChange(newExpr);
        this.setState({
            expr: newExpr,
        });
    }

    handleSensorChange(event: ChangeEvent) {
        const { target } = event
        let expr = this.state.expr as Property;
        let newExpr = {
            ...expr,
            sensor: (target as HTMLInputElement).value,
        }
        // propagate change back to parent
        this.props.onNodeChange(newExpr);
        this.setState({
            expr: newExpr,
        });
    }

    renderOperator(operator: string) {
        let options: string[] = Object.values(SupportedOperation);
        return(<select defaultValue={operator} onChange={this.handleOperatorChange}>
            {options.map((option) => {
                return (<option key={option} value={option}>{option}</option>);
            })}
        </select>);
    }

    renderDevice(device: string) {
        let options: string[] = Object.values(SupportedDevice);
        return(<select defaultValue={device} onChange={this.handleDeviceChange}>
            {options.map((option) => {
                return (<option key={option} value={option}>{option}</option>);
            })}
        </select>);
    }

    renderSensor(sensor: string, device: string) {
        let options: SupportedSensor[] =DEVICE_SENSORS[device];
        return(<select defaultValue={sensor} onChange={this.handleSensorChange}>
            {options.map((option) => {
                return (<option key={option} value={option}>{option}</option>);
            })}
        </select>);
    }
}

export default NodeBlock;