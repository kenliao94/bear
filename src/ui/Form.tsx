// filename : Form.tsx
// The code defines a React component called Form that takes in a task object and renders three child components to edit its properties. When the child components change, the Form component updates its state with the new task object and calls functions to handle changes in each property. When the save button is clicked, the current task object is logged to the console. The component is exported as a default export.
import React from 'react';
import WhenBox from './WhenBox';
import IfBox from './IfBox';
import ActionBox from './ActionBox';
import {Task, Expr, Action} from '../AST';

type FormProps = {
    task: Task,
}

type FormState = {
    task: Task,
}

class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            task: props.task,
        }

        this.handleWhenExpressionChanged = this.handleWhenExpressionChanged.bind(this);
        this.handleIfExpressionChanged = this.handleIfExpressionChanged.bind(this);
        this.handleActionChanged = this.handleActionChanged.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    render(){
        return(<div>
            <WhenBox expr={this.props.task.when} onExprChanged={this.handleWhenExpressionChanged}/>
            <br/>
            <IfBox expr={this.props.task.if} onExprChanged={this.handleIfExpressionChanged} />
            <br/>
            <ActionBox action={this.props.task.action} onActionChanged={this.handleActionChanged} />
            <br/>
            <button onClick={this.handleOnClick}> Save </button>
        </div>);
    }

    handleWhenExpressionChanged(expr: Expr|null) {
        let newTask = {
            ...this.state.task,
            when: expr,
        } as Task;
        this.setState({
            ...this.state,
            task: newTask,
        });
    }

    handleIfExpressionChanged(expr: Expr|null) {
        let newTask = {
            ...this.state.task,
            if: expr,
        } as Task;
        this.setState({
            ...this.state,
            task: newTask,
        });
    }

    handleActionChanged(action: Action) {
        let newTask = {
            ...this.state.task,
            action: action,
        } as Task;
        this.setState({
            ...this.state,
            task: newTask,
        });
    }

    handleOnClick() {
        console.log(this.state.task);
    }
}

export default Form;