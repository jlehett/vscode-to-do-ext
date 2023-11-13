import * as vscode from 'vscode';

export default class TodoListViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly _context: vscode.ExtensionContext) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true
        };

        webviewView.webview.html = this.getWebviewContent(webviewView.webview, this._context.extensionUri);
    }

    private getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
        const scriptPathOnDisk = vscode.Uri.joinPath(extensionUri, 'out', 'bundle.js');
        const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Todo List</title>
            </head>
            <body>
                <div id="root"></div>
                <script src="${scriptUri}"></script>
            </body>
            </html>`;
    }
}