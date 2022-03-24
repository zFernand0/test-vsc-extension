/**
 * Copyright (c) 2022 Fernando Rijo Cedeno. All rights reserved.
 *
 * This work is licensed under the terms of the MIT license.
 * For a copy, see <https://opensource.org/licenses/MIT>.
**/

import * as path from "path";
import * as vscode from "vscode";

import { getZoweDir } from "@zowe/core-for-zowe-sdk";
import { IProfAttrs, ProfileInfo } from "@zowe/imperative";

export async function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vsce" is now active!');
	command();
	context.subscriptions.push(vscode.commands.registerCommand("zFernand0.testCommand", async () => await command()));
}

export async function command() {
	console.log("Test command executed");

	const profInfo = new ProfileInfo("zowe");
	// determine profile location
	// The default zowe home folder or a project level workspace
	let rootPath: string;
	if (vscode.workspace.workspaceFolders) {
		rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
		await profInfo.readProfilesFromDisk({ projectDir: path.normalize(rootPath) });  // homeDir is used even if not present
	} else {
		await profInfo.readProfilesFromDisk({ homeDir: getZoweDir() });   // looks like homeDir can be excluded as it is used by default
	}
	if (!profInfo.usingTeamConfig) {
		vscode.window.showErrorMessage(`No zowe V2 Teams profile found. Please ensure that a V2 profile exists`);
	}
	const typeProfiles: IProfAttrs[] = profInfo.getAllProfiles("zosmf");
	const baseProfiles: IProfAttrs[] = profInfo.getAllProfiles("base");

	console.log("--- typeProfiles", typeProfiles);
	console.log("--- baseProfiles", baseProfiles);
}