
## Setup
### Prerequisites
- DATABASE URL

### Installation
#### Back End: Note.js, Redis, MySQL, 

1. Install the dependencies:
```sh
npm install
```

2. Create a .env in the root folder and add your in the following format:
```sh
DATABASE_URL='mysql://root:<YOUR_DATABASE_PASSWORD>@127.0.0.1:3306/WDM'
```

3. Push prisma into DB:
```sh
npx prisma db push
```
4. Copy and run the below mysql code in workbench
```
https://github.com/Kuroidaka/WDM_BE/blob/main/init_sql.sql
```

5. Run the project:
```sh
npm run build
```

6. your BASEURL:  http://localhost:8080




