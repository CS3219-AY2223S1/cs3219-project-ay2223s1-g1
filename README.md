# CS3219 Team One Project

This application aims to help those preparing for their technical interview by allowing them to practice different questions based on the difficulty that they have chosen. The collaboration service and chat service facilitates this process as they would be able to discuss a particular question therefore improving their technical communication skills.

The table below shows the different services and the respective port numbers they run on

| Service              | Summary                                                           | Port No. |
| ---------------------| ----------------------------------------------------------------- | -------- |
| User Service         | User details, authentication and authorization are handled here   | 8000     |
| Matching Service     | Users are matched according to the difficulty chosen here         | 8001     |
| Collabration Service | Users are able to collaborate on their solution here              | 8001     |
| Chat Service         | Allows users to communicate with each other via texts             | 8002     |
| Question Service     | Users are assigned a question based on the difficulty chosen      | 8050     |
| Frontend             | Handles the User Interface of the application                     | 3000     |

# Run the Application

To run the application, follow these steps.

### Setup MongoDB
1. Rename `.env.sample` file to `.env`.
2. Start the local MongoDB instance, or create a Cloud DB URL using Mongo Atlas (and set `ENV=PROD`).
3. Update the `.env` file with the relevant MongoDB endpoints.

Then, start each of the following services individually in the following way.

### User Service
1. Navigate into the `user-service` directory.
2. Install npm packages using `npm i`.
3. Run User Service using `npm run dev`.

### Matching Service & Collaboration Service
1. Navigate into the `matching-service` directory.
2. Install npm packages using `npm i`.
3. Run Matching Service using `npm run dev`.

### Chat Service
1. Navigate into the `chat-service` directory.
2. Install npm packages using `npm i`.
3. Run Matching Service using `npm run dev`.

### Question Service
1. Navigate into the `question-service` directory.
2. Install npm packages using `npm i`.
3. Run Matching Service using `npm run dev`.

### Frontend
1. Navigate into the `frontend` directory.
2. Install npm packages using `npm i`.
3. Run Frontend using `npm start`.
