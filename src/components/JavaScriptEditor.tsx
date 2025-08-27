import React from 'react'
import Editor from '@monaco-editor/react'
import clsx from 'clsx'
import styles from '../styles/JavaScriptEditor.module.css'

interface JavaScriptEditorProps {
  code: string
  onChange: (code: string) => void
  className?: string
  readOnly?: boolean
}

export const JavaScriptEditor = React.memo<JavaScriptEditorProps>(({
  code,
  onChange,
  className,
  readOnly = false
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '')
  }

  return (
    <div className={clsx(styles.editor, className)} role="region" aria-label="JavaScript code editor">
      <label htmlFor="monaco-editor" className={styles.editorLabel}>
        JavaScript Code Editor
      </label>
      <div className={styles.editorContainer}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            accessibilitySupport: 'on',
            ariaLabel: 'JavaScript code editor'
          }}
          loading={
            <div className={styles.loading} role="status" aria-label="Loading editor">
              Loading editor...
            </div>
          }
          onMount={(editor, monaco) => {
            // Set up keyboard shortcuts
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
              // Ctrl/Cmd + Enter to execute - this will be handled by parent
              const executeEvent = new CustomEvent('editor-execute')
              window.dispatchEvent(executeEvent)
            })
          }}
        />
      </div>
    </div>
  )
})
