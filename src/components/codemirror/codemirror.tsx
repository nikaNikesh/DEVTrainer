import React, {ReactElement, useEffect, useRef} from "react";
import {EditorState, ViewUpdate} from "@uiw/react-codemirror";
import {basicSetup} from "codemirror";
import {EditorView} from "@codemirror/view";
import {oneDark} from "@codemirror/theme-one-dark";
import {autocompletion} from "@codemirror/autocomplete";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {useAppSelector} from "../../hooks/useAppSelector";

interface PropsType {
    onChange: (id: number, solution: string) => void;
    id: number;
}

const Codemirror: React.FC<PropsType> = ({onChange, id}): ReactElement => {
    const tasksSolutionState = useAppSelector(state => state.tasksSolution[id]);
    const initialDoc: string = "Here will be the task condition with the server";
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const initialEditorState = EditorState.create({
            doc: (!tasksSolutionState) ? initialDoc : tasksSolutionState,
            extensions: [
                basicSetup,
                oneDark,
                javascript(),
                // autocompletion({
                //     activateOnTyping: true
                // }),
                // java(),
                EditorView.updateListener.of((update: ViewUpdate) => {
                    if (update.docChanged) {
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


/*import React, {ReactElement} from 'react';
import CodeMirror, {oneDark, ViewUpdate} from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {basicSetup, EditorView} from "codemirror";
import {autocompletion} from "@codemirror/autocomplete";
import {useAppSelector} from "../../hooks/useAppSelector";

interface PropsType {
    myOnChange: (id: number, solution: string) => void;
    id: number;
}

const MyCodemirror: React.FC<PropsType> = ({myOnChange, id}): ReactElement => {
    const tasksSolutionState = useAppSelector(state => state.tasksSolution[id]);
    const initialDoc: string = "Here will be the task condition with the server";
    const defaultValue = (!tasksSolutionState) ? initialDoc : tasksSolutionState;

    const [{value}, setValue] = React.useState({value: defaultValue});

    return <CodeMirror value={defaultValue} height={"100px"}
                       theme="dark"
                       extensions={[
                           basicSetup,
                           oneDark,
                           javascript(),
                           autocompletion({
                               activateOnTyping: true
                           }),
                           EditorView.updateListener.of((update: ViewUpdate) => {
                               if (update.docChanged) {
                                   myOnChange(id, update.state.doc.toString())
                               }
                           })
                       ]}
                        />;
}
export default MyCodemirror;*/
