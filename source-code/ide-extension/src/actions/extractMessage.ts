import * as vscode from "vscode"
import { extractMessageCommand } from "../commands/extractMessage.js"
import { telemetry } from "../services/telemetry/index.js"

/**
 * Show light bulb quick fixes when text is selected, offering message extraction.
 */
export class ExtractMessage implements vscode.CodeActionProvider {
	public static readonly providedCodeActionKinds = [vscode.CodeActionKind.QuickFix]

	public async provideCodeActions(
		_document: vscode.TextDocument,
		range: vscode.Range,
	): Promise<vscode.CodeAction[] | undefined> {
		// return if no text is selected
		if (range.isEmpty) {
			return
		}
		const extractMessageAction = new vscode.CodeAction(`Inlang: Extract Message`)
		extractMessageAction.command = {
			title: extractMessageCommand.title,
			command: extractMessageCommand.id,
		}
		telemetry.capture({
			event: "IDE-EXTENSION code action provided",
			properties: { name: "extract message" },
		})
		return [extractMessageAction]
	}

	public resolveCodeAction(): vscode.ProviderResult<vscode.CodeAction> {
		console.log("code action resolved")
		telemetry.capture({
			event: "IDE-EXTENSION code action resolved",
			properties: { name: "extract message" },
		})
		return
	}
}
