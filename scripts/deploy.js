// scripts/deploy.js
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Workaround for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load contract artifact
const artifactPath = path.join(__dirname, "../artifacts/contracts/MyToken.sol/MyToken.json");
const contractJson = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  const accounts = await provider.listAccounts();
  const signer = await provider.getSigner(accounts[0].address || accounts[0]);
  console.log("Deploying with:", await signer.getAddress());

  const factory = new ethers.ContractFactory(
    contractJson.abi,
    contractJson.bytecode,
    signer
  );

  const token = await factory.deploy("DidLabToken", "DLAB", ethers.parseUnits("1000000", 18));
  await token.waitForDeployment();

  console.log("Token deployed to:", token.target);

  const out = { address: token.target, name: "DidLabToken", symbol: "DLAB", decimals: 18 };
  fs.writeFileSync("frontend/token-config.json", JSON.stringify(out, null, 2));
  console.log("Wrote frontend/token-config.json");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

