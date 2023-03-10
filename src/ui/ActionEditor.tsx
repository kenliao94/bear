// filename : ActionEditor.tsx
// This is a TypeScript React component that defines an editor for an Action object. The Action object represents an action that can be performed on a device and a knob. The ActionEditor component receives an action object and an onActionChanged callback function as props. The component renders a device and knob selector based on the action type, and updates the Action object accordingly when the user makes a selection. The ActionEditor component exports as the default export of this module.
import React, { ChangeEvent } from 'react';
import {Action} from '../AST'
import { SupportedAction, SupportedDevice, SupportedKnob, DEVICE_KNOBS } from '../utils/constants';

type EditorProps = {
    action: Action,
    onActionChanged: (action: Action) => void,
}

type EditorState = {
    action: Action
}

class ActionEditor extends React.Component<EditorProps, EditorState> {
    constructor(props:EditorProps){
        super(props);
        this.state = {
            action: props.action,
        }

        this.handleDeviceChanged = this.handleDeviceChanged.bind(this);
        this.handleKnobChanged = this.handleKnobChanged.bind(this);
    }

    render() {
        if (this.state.action.kind == SupportedAction.ACTUATE) {
            return(<div>
                {this.renderDevice(this.state.action.device)}
                {this.renderKnob(this.state.action.device, this.state.action.knob)}
            </div>);
        }
    }

    renderDevice(device: string) {
        let options: string[] = Object.values(SupportedDevice);
        return(<select defaultValue={device} onChange={this.handleDeviceChanged}>
            {options.map((option) => {
                return (<option key={option} value={option}>{option}</option>);
            })}
        </select>);
    }

    renderKnob(device: string, knob: string) {
        let options: SupportedKnob[] =DEVICE_KNOBS[device];
        if (options.length == 0) {
            return(<div></div>);
        }
        return(<select defaultValue={knob} onChange={this.handleKnobChanged}>
            {options.map((option) => {
                return (<option key={option} value={option}>{option}</option>);
            })}
        </select>);
    }

    handleDeviceChanged(event: ChangeEvent) {
        const { target } = event
        let newAction = {
            ...this.state.action,
            device: (target as HTMLInputElement).value,
        } as Action;
        this.props.onActionChanged(newAction);
        this.setState({
            action: newAction,
        });
    }

    handleKnobChanged(event: ChangeEvent) {
        const { target } = event
        let newAction = {
            ...this.state.action,
            knob: (target as HTMLInputElement).value,
        } as Action;
        this.props.onActionChanged(newAction);
        this.setState({
            action: newAction,
        });
    }
}

export default ActionEditor;