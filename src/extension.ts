// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { CustomEditor } from "./custom-editor";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const customEditor = new CustomEditor(context);
  const customEditorDisposable = vscode.window.registerCustomEditorProvider(
    "bam-bam-viewer.viewer",
    customEditor,
    {
      webviewOptions: {
        retainContextWhenHidden: true,
      },
    }
  );
  context.subscriptions.push(customEditorDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
