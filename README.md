# CS3219 Team One Project

This application aims to help those preparing for their technical interview by allowing them to practice different questions based on the difficulty that they have chosen. The collaboration service and chat service facilitates this process as they would be able to discuss a particular question therfore improving their technical communication skills.

The table below shows the different services and its respective port numbers that the application contains

| Service              | Summary                                                     | Port No. |
| ---------------------| ----------------------------------------------------------- | -------- |
| User Service         | User details are handled here                               | 8000     |
| Matching Service     | Users are matched accroding to the difficulty chosen here   | 8001     |
| Collabration Service | Users are able to work on their solution to the problem here| 8001     |
| Chat Service         | Allows users to commicate with each other via texts         | 8002     |
| Question Service     | Users are assigned a question based on the difficulty choose| 8003     |
| Frontend             | Handles the UI of the application                           | 3000     |

# Run the Program

To run the program start each of the following services individually in the following way

### User Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run User Service using `npm run dev`.

### Matching Service & Collaboration Service
1. Install npm packages using `npm i`.
2. Run Matching Service using `npm run dev`.

### Question Service
1. Install npm packages using `npm i`.
2. Run Matching Service using `npm run dev`.

### Frontend
1. Install npm packages using `npm i`.
2. Run Frontend using `npm start`.
