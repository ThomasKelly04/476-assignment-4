import dotenv from "dotenv";
dotenv.config();
console.log(">>> DIDLAB_RPC =", process.env.DIDLAB_RPC);

const DIDLAB_RPC = process.env.DIDLAB_RPC ?? "";
const DIDLAB_CHAINID = process.env.DIDLAB_CHAINID ? Number(process.env.DIDLAB_CHAINID) : undefined;
const DEPLOYER_PK = process.env.DEPLOYER_PRIVATE_KEY;

export default {
  solidity: "0.8.24",
  networks: {
    // In-process simulated network (what v2 called "hardhat")
    hardhat: {
      type: "edr-simulated",
      chainType: "l1",          // optional; can be "l1" | "op" | "generic"
      chainId: 31337            // optional but nice for consistency
    },

    // External JSON-RPC (your professor's DIDLab endpoint)
    didlab: {
      type: "http",
      chainType: "l1",          // optional
      url: DIDLAB_RPC,
      chainId: DIDLAB_CHAINID,
      // Use the key from your .env, or fall back to node's remote accounts
      accounts: DEPLOYER_PK ? [DEPLOYER_PK] : "remote"
    }
  }
};


