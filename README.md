# Front-End Project

https://github.com/Matheusfbio/frontend-play-session

### Objective

This project consists of creating a React application using Vite, with the aim of developing an interface that allows the creation and visualization of game sessions. The application interacts with a backend to persist and retrieve session data.

### Features

- **Form to create new game session**:
- The form collects the following game session details: `hostname`, `players`, `map` and `mode`.
- Upon submission, data is sent to the backend API via a POST request to create a new game session.

- **List view of game sessions**:
- The application fetches and displays a list of game sessions from the backend API.
- Details displayed include: `hostname`, `players`, `map` and `mode`.

### Requirements and Implementation

1. **Form**:

- [x] Collection of game session details: `hostname`, `players`, `map` and `mode`.
- [x] Sending POST request to backend API to create a game session.

2. **List View**:

- [x] Search and display the list of game sessions from the backend API.
- [x] Details display: `hostname`, `players`, `map` and `mode`.

3. **User Experience (UX/UI)**:

- [x] Implementation of a responsive and easy-to-use design.
- [x] Use of a CSS structure, in this case, Tailwind CSS.

4. **Code Quality**:

- [x] Guarantee of high readability and ease of code maintenance.
- [x] Use of modern React development practices, such as hooks and functional components.

### Technologies Used

- **React** with **Vite** for UI development.
- **Tailwind CSS** for styling and responsive design.
- **Axios** for communication with the backend.

### How to Execute

1. Clone this repository:

```
git clone https://github.com/Matheusfbio/full-stack-web-challenge.git
```

2. Navigate to the project folder

```
cd full-stack-web-challenge
```

3. Install dependencies

```
npm i
```

4. define the .env to integrate with the backend locally for testing purposes

```
VITE_API_ENDPOINT="http://localhost:3000/sessions"
```

5. execute the project

```
npm run dev
```

# Back-End Project

https://github.com/Matheusfbio/backend-play-session

### Objective

Develop an AWS Serverless application using AWS SAM to provide a RESTful API that manages gaming sessions. This project includes configuring the necessary services and implementing endpoints to create, retrieve, update, and delete game sessions.

### Requirements

**RESTful API**

- [x] Implement endpoints for creating and retrieving game sessions.
- [x] Use AWS API Gateway, AWS Lambda and DynamoDB.

**Game Session Persistence**

- [x] Store game session data in a table `sessionId` (UUID), `hostname`, `players`, `map` and `mode`.

**Adherence to REST Principles**

- [x] Design the API endpoints to follow REST conventions:
- [x] GET (list all sessions)
- [x] GET by id (retrieve a specific session)
- [x] POST (create a new session)
- [x] PATCH by id (update an existing session)
- [x] DELETE by id (delete a session)

**Infrastructure as Code (IaC)**

- [ ] Use SAM to define and deploy AWS resources.
- [ ] Make sure the SAM model is well structured and follows best practices.

**Unit Tests**

- [x] Write unit tests for Lambda functions using a framework like Jest or Mocha.

### Technologies Used

- **AWS SAM** for defining and implementing serverless infrastructure.
- **AWS API Gateway** for API management.
- **AWS Lambda** for application logic.
- **DynamoDB** for data persistence.
- **Jest** or **Mocha** for unit testing.

### How to Execute

- Clone this repository:

```
   git clone https://github.com/Matheusfbio/backend-play-session.git
```

- define the .env to integrate with the backend locally for testing purposes

```
DYNAMODB_ENDPOINT="http://127.0.0.1:8000"
AWS_REGION="us-west-1"
TABLE_NAME="GameSessions"
```

### Important codes in the project

Existing commands in the projects:

- creates a table in the DynamoDB database called "GameSessions"

```
npm run create-table
```

- to run the project using nodemon

```
npm run start
```

- shows the unit tests performed on each file ./src/handlers/all_files

```
npm run test:
```

- show test coverage for each file

```
npm run test:cov
```

### DynamoDB Local

If you are using DynamoDB Local, you can use the AWS CLI pointing to the local endpoint:

```
aws dynamodb scan --table-name GameSessions --endpoint-url http://localhost:8000
```

### Create a DynamoDB container locally

To use dynamoDB locally with docker, perform the following steps:

Create a docker-compose.yml, with the following instructions

```
`version: "3.8"`
`services:`
  `dynamodb-local:`
    `command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"`
    `image: "amazon/dynamodb-local:latest"`
    `container_name: dynamodb-local`
    `ports:`
      `- "8000:8000"`
    `volumes:`
      `- "./docker/dynamodb:/home/dynamodblocal/data"`
    working_dir: /home/dynamodblocal
```

Open the terminal where your docker-compose.yml is from the backend project and run the command

```
docker-compose up -d
```

This will create the DynamoDB container locally.

### Executando o aws sam localmente

Build your application by using the `sam build` command.

```shell
my-application$ sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```shell
your-application$ sam local invoke getByIdSessionFunction --event events/event-create-session.json.json
```

```
your-application$ sam local invoke getByIdSessionFunction --event events/event-get-all-  session.json.json
```

The AWS SAM CLI can also emulate your application's API. Use the `sam local start-api` command to run the API locally on port 3000.

```shell
your-application$ sam local start-api
```

```
your-application$ curl http://localhost:3000/
```

## Test locally with dynamodb:

Start DynamoDB Local in a Docker container (this example works on codespace)

```
docker run --rm -p 8000:8000 -v /tmp:/data amazon/dynamodb-local
```

Create the DynamoDB table (sample command below):

```
aws dynamodb create-table \
    --table-name GameSessions \
    --attribute-definitions AttributeName=SessionId,AttributeType=S \
    --key-schema AttributeName=SessionId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://127.0.0.1:8000

```

Update env.json with the IP of your docker container for the endpoint override - see here for example:

```
{
    "getByIdFunction": {
        "ENDPOINT_OVERRIDE": "http://172.17.0.2:8000",
        "SAMPLE_TABLE": "SampleTable"
    },
    "putItemFunction": {
        "ENDPOINT_OVERRIDE": "http://172.17.0.2:8000",
        "SAMPLE_TABLE": "SampleTable"
    }
}
```

run the following commands to start the sam local api:

```
sam local start-api --env-vars env.json --host 0.0.0.0 --debug
```

For testing - you can put an item into dynamodb local

```
aws dynamodb put-item \
    --table-name GameSessions \
    --item '{
        "Hostname": {"S": "MacKenzie Lang"},
        "SessionId": {"S": "0b26f2b6-298e-4856-873d-d0355575f7fa"},
        "Map": {"S": "Voluptatem autem eve"},
        "Players": {"N": "451"},
        "Mode": {"S": "Est asperiores labor"},
        "CreatedAt": {"S": "2024-08-20T00:24:43.848Z"}
    }' \
    --endpoint-url http://127.0.0.1:8000
```

How to scan your table for items

```
aws dynamodb scan --table-name SampleTable --endpoint-url http://127.0.0.1:8000
```

Make backend API endpoint accessible as an environment variable. For local, create a `.env` file, Here is an example:

```
VITE_API_ENDPOINT="http://127.0.0.1:3000"
```
