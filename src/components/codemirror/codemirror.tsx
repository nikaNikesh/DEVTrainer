import React, {ReactElement, useEffect, useRef} from "react";
import {EditorState} from "@codemirror/state";
import {EditorView, basicSetup} from "codemirror";
import {oneDark} from "@codemirror/theme-one-dark";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {python} from "@codemirror/lang-python";
import {cpp} from "@codemirror/lang-cpp";
import type { LanguageSupport } from "@codemirror/language"
import {useAppSelector} from "../../hooks/useAppSelector";

interface PropsType {
    onChange: (id: string, solution: string) => void;
    id: string;
}
type LanguageKey = "javascript" | "python" | "java" | "c++";

const Codemirror: React.FC<PropsType> = ({onChange, id}): ReactElement => {
    const tasksSolutionState = localStorage.getItem(id);
    const initialDoc: string = "";
    const editorRef = useRef<HTMLDivElement>(null);
    const language = useAppSelector((state) => state.codemirror.language) as LanguageKey;

    const languageExtensions: Record<LanguageKey, LanguageSupport> = {
        javascript: javascript(),
        python: python(),
        java: java(),
        'c++': cpp(),
    };

    const selectedLanguage = languageExtensions[language] ?? javascript();
    console.log(selectedLanguage);

    useEffect(() => {
        if (!editorRef.current) return;

        const initialEditorState = EditorState.create({
            doc: (!tasksSolutionState) ? initialDoc : tasksSolutionState,
            extensions: [
                basicSetup,
                oneDark,
                selectedLanguage,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        onChange(id, update.state.doc.toString())
                    }
                }),
                EditorView.lineWrapping,
                EditorView.theme({
                    '&': {
                        backgroundColor: 'var(--color-dark) !important',
                        height: '100%',
                        width: '100%',
                        padding: '5px',
                        borderRadius: '3px',
                    },
                    '.cm-content': {
                        backgroundColor: 'var(--color-dark) !important',
                        caretColor: 'var(--color-main-background) !important',
                        borderRadius: '3px !important',
                    },

                    ".cm-activeLine": {
                        backgroundColor: "var(--color-main-background) !important",
                    },

                    ".cm-gutters": {
                        backgroundColor: "var(--color-dark) !important",
                        color: "var(--color-main-background) !important",
                        border: "none",
                    },

                    ".cm-activeLineGutter": {
                        backgroundColor: "var(--color-main-background) !important",
                        color: 'var(--color-dark) !important'
                    },
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
    }, [selectedLanguage]);
    return (
        <div id="codemirrorEditor" ref={editorRef}></div>
    );
}
export default Codemirror;