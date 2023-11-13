import * as vscode from 'vscode';
import TodoListViewProvider from './view-providers/TodoListViewProvider';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('todoListView', new TodoListViewProvider(context))
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
