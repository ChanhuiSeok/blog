import { hash } from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npx tsx scripts/hash-password.ts <password>");
  process.exit(1);
}

async function main() {
  const hashed = await hash(password, 10);
  const escaped = hashed.replace(/\$/g, "\\$");
  console.log(`\nPassword: ${password}`);
  console.log(`Hash:     ${hashed}`);
  console.log(`\nAdd to .env.local ($ escaped for dotenv-expand):`);
  console.log(`ADMIN_PASSWORD_HASH=${escaped}`);
}

main();
