import { CredentialManagerFactory, Logger, ProfileInfo } from '@zowe/imperative';
import { KeytarApi, KeytarCredentialManager } from "@zowe/zowe-explorer-api";

export async function activate() {
	console.log('Congratulations, your extension "vsce" is now active!');
	const log = Logger.getAppLogger();

	const keytarApi = new KeytarApi(log);
	console.log("keytarApi", keytarApi);
	await keytarApi.activateKeytar(CredentialManagerFactory.initialized,false);
	console.log("keytar", KeytarCredentialManager.keytar);
	try {
		const test = new ProfileInfo("zowe");
		console.log(test)
	} catch (e) {
		console.log(e);
	}
}