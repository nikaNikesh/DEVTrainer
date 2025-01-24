import React, {ReactElement, useEffect, useRef} from "react";
import {EditorState} from "@codemirror/state";
import {EditorView, basicSetup} from "codemirror";
import {oneDark} from "@codemirror/theme-one-dark";
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
                java(),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        onChange(id, update.state.doc.toString())
                    }
                }),
                EditorView.lineWrapping,
                EditorView.theme({
                    '&': {
                        backgroundColor: '#383838',
                        height: '400px',
                        width: '100%',
                    },
                    '.cm-content': {
                        backgroundColor: '#383838',
                    }
                }),
            ]
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

//creating an editor via the CodeMirror component from the "@uiw/react-codemirror" library
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
