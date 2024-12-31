import bcrypt from 'bcrypt';

async function main() {
  const password = process.argv[2] as string;
  const hash = bcrypt.hashSync(password, 10);
  console.log(hash);
}

main();
