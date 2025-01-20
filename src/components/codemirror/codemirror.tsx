import React, {ReactElement, useEffect, useRef} from "react";
import {EditorState} from "@uiw/react-codemirror";
import {basicSetup} from "codemirror";
import {EditorView} from "@codemirror/view";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {useAppSelector} from "../../hooks/useAppSelector";

interface PropsType {
  onChange: (id: number, solution: string) => void;
  id: number;
}

const Codemirror: React.FC<PropsType> = ({ onChange, id }): ReactElement => {
    const tasksSolutionState = useAppSelector(state => state.tasksSolution[id]);
    const initialDoc: string = "Here will be the task condition with the server";
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const initialEditorState = EditorState.create({
            doc: (!tasksSolutionState) ? initialDoc : tasksSolutionState,
            extensions: [
                basicSetup,
                javascript(),
                java(),
                EditorView.updateListener.of((update) => {
                    if (update.changes) {
                        onChange(id, update.state.doc.toString())
                    }
                })]
        });

        const view = new EditorView({
            state: initialEditorState,
            parent: editorRef.current
        });

        return () => {
            view.destroy();
        };
    }, []);
    return (
        <div id="codemirrorEditor" ref={editorRef}></div>
    );
}
export default Codemirror;


/*
import React, {ReactElement} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const MyCodemirror = (): ReactElement => {
    const [{value, height}, setValue] = React.useState({value: "console.log('hello world!');", height: 100});
    const onChange = React.useCallback((val: any, viewUpdate: any) => {
        console.log('val:', val);
        setValue((prevState) => ({
            value: val,
            height: prevState.height + 10 // Обновление высоты на основе предыдущего значения
        }));
    }, []);
    return <CodeMirror value={value} height={height.toString() + "px"} theme="dark" extensions={[javascript({jsx: true})]} onChange={onChange}/>;
}
export default MyCodemirror;*/
