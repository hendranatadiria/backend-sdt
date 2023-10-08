# Backend Assessment Task for SDT

This repo contains the assessment task for SDT. The deadline was set at Sunday, 8/10/2023 at 11.00 WIB (Western Indonesian Time)

## How to install?

1. git clone this repo
2. Copy the .env.example file to .env, fill all the variables required to run
3. `yarn install`
4. To run test, call `yarn test`

## How to Execute

### Dev Environment

- To run the main API in dev environment, type `yarn run-dev`
- To run the worker (queue manager for sending emails), in dev environment, type `yarn run-worker`
- To run both, run `yarn dev`

### Prod Environment

- To run in production, run `yarn build` first
- To start the main API, run `yarn start`
- To start the worker, run `yarn start-worker`
- To run both, run `yarn start-all`

## API Endpoints

⚠️ Note: all API requests must be made using `Content-Type: application/json`.

### [POST] `/user`

Body request example:

```json
{
    "emailAddress": "bhen@hendranata.com",
    "firstName": "Bharat Dhaka",
    "lastName": "Natadiria",
    "location": "Asia/Dhaka",
    "birthday": "2000/10/07"
}
```

Note: use date format of YYYY/MM/DD or YYYY-MM-DD. Other format is acceptable, but might yield inacurate date for small date and month (e.g 5/6 or 6/5).

### [PUT] `/user`

Body request example:

```json
{
    "emailAddress": "bhen@hendranata.com",
    "lastName": "Netanyahu",
    "birthday": "2000-10-09"
}
```

### [DELETE] `/user`

Body request example:

```json
{
    "emailAddress": "ben@hendranata.com"
}
```

### Thank you! 🙌🎉
