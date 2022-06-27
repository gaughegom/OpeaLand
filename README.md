# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test --network hardhat
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Test localhost

Run localhost chain

```
npx hardhat node
```

Run deploy task

```
npx hardhat deploy-local --network localhost
```

After deploy contracts at localhost successfully, copy and paste addresses on console to /src/config/contractAddresses.ts

# Server backend

Repo: https://github.com/hungw7/openland-server

- Config `AWS_S3` for Amazon S3 to storage image (please use your config if we delete our config in .env)
- Config `DATABASE_LOCAL` variable in .env to connect mongodb

# Report

- Link báo cáo: https://uithcm-my.sharepoint.com/:b:/g/personal/19521574_ms_uit_edu_vn/EcDqxRjhMftEtg-4N91GOY0BskAE6-LXNCJXBtfb763SqA?e=nIfjlX

- Thành viên:
  - Nguyễn Thanh Hưng (19521574)
  - Phạm Nguyễn Minh Thắng (19522216)
