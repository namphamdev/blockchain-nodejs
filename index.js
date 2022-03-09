const crypto = require("crypto");

function mine(version, prevBlockHash, merkleRoot, timestamp, bits) {
  let blockHash = "";
  let nonce = 0;
  while (blockHash.substring(0, 4) !== "0000") {
    const stringToHash = `${version}${prevBlockHash}${merkleRoot}${timestamp}${bits}${nonce}`;
    blockHash = crypto.createHash("sha256").update(stringToHash).digest("hex");
    nonce += 1;
  }
  console.log(`Mined at ${nonce} with hash ${blockHash}`);
  return {
    version,
    prevBlockHash,
    merkleRoot,
    timestamp,
    bits,
    nonce,
    blockHash,
  };
}

const blocks = [];

function genesisBlock() {
  const BlockHeight = 0;
  const prevBlockHash = "00000000000000000000000000";
  addBlock(BlockHeight, prevBlockHash);
}

function addBlock(BlockHeight, prevBlockHash) {
  const hrTime = process.hrtime();
  const timestamp = hrTime[0] * 1000000 + hrTime[1] / 1000;
  const transaction = `Hello transaction at ${timestamp}`;
  const block = {
    version: 1,
    prevBlockHash,
    merkleRoot: crypto.createHash("sha256").update(transaction).digest("hex"),
    timestamp,
    bits: "ffff001f",
  };
  const header = mine(
    block.version,
    block.prevBlockHash,
    block.merkleRoot,
    block.timestamp,
    block.bits
  );
  blocks.push({
    Height: BlockHeight,
    BlockSize: 1,
    BlockHeader: header,
    TxCount: 1,
    Txs: transaction,
  });
  console.log(blocks);
}

genesisBlock();
addBlock(1, blocks[0].BlockHeader.blockHash);