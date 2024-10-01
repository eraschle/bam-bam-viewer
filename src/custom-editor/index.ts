import Doc from "./doc";

import * as vscode from "vscode";

export class CustomEditor implements vscode.CustomReadonlyEditorProvider<Doc> {
  constructor(private readonly _context: vscode.ExtensionContext) { }

  async openCustomDocument(uri: vscode.Uri) {
    const file = await vscode.workspace.fs.readFile(uri);
    const buffer = new Uint8Array(file);
    return new Doc(uri, buffer);
  }

  async resolveCustomEditor(document: Doc, webviewPanel: vscode.WebviewPanel) {
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._context.extensionUri, "viewer/dist"),
      ],
    };

    webviewPanel.webview.html = await this.getHtmlForWebview(
      webviewPanel.webview
    );

    webviewPanel.webview.onDidReceiveMessage((eventData) => {
      if (eventData.command === "ready") {
        const fileExtension = document.uri.fsPath
          .toLowerCase()
          .split(".")
          .at(-1);
        webviewPanel.webview.postMessage({
          fileExtension,
          buffer: document.buffer,
        });
      }
    });
  }

  async getHtmlForWebview(webview: vscode.Webview) {
    const stylesUriIfcViewer = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._context.extensionUri,
        "viewer",
        "dist",
        "assets",
        "index.css"
      )
    );

    const scriptsUriIfcViewer = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._context.extensionUri,
        "viewer",
        "dist",
        "assets",
        "index.js"
      )
    );

    const htmlUriIfcViewer = vscode.Uri.joinPath(
      this._context.extensionUri,
      "viewer",
      "dist",
      "index.html"
    );

    const file = await vscode.workspace.fs.readFile(htmlUriIfcViewer);

    const fileContent = Buffer.from(file).toString("utf8");

    return fileContent
      .replace("./assets/index.css", stylesUriIfcViewer.toString())
      .replace("./assets/index.js", scriptsUriIfcViewer.toString());
  }
}
