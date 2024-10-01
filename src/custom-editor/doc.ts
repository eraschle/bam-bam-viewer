import * as vscode from "vscode";

export default class Doc implements vscode.CustomDocument {
  constructor(public uri: vscode.Uri, public buffer: Uint8Array) {}
  dispose() {}
}
