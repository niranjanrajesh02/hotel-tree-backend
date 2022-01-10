# CS-1202 E-Tre Website - Hoteltree

### By Aryaman, Madhav and Niranjan

Frontend repository: https://github.com/niranjanrajesh02/hotel-tree-frontend
Backend repository: https://github.com/niranjanrajesh02/hotel-tree-backend

## How to run HotelTree

1. Clone both the backend and frontend repos into local machine
2. Enter `npm install` in the terminal for **both of the directories**
3. In the directory for the backend, enter `npm start` to initialise the server on `localhost:4000`
4. In the directory for the frontend, enter `npm run dev` to initialise the front-end application on `localhost:3000`
5. Now you should be able to use the frontend app from `localhost:3000` while it communicates with the server on `localhost:4000`

#### Aryaman: Backend Developer

- Implementation of Booking and Wishlist Documents and Routes
- Added routes to save a hotel (including calculations of interested users for a hotel)
- Added routes to book the rooms required
- Implementation of Ratings and Review system with corresponding routes (including avg_rating calculations)
- Implementation of routes to track the User's preferences and travelling habits

#### Madhav: Frontend Developer

- Integrated hotels page and single hotel page to backend using axios
- Feature to create reviews implemented
- Sorting and filtering integrated with the backend
- Recommended products connected
- User details backend routes connected

#### Niranjan: Fullstack Developer (Frontend + Backend)

##### Backend

- Backend Initialisation of DB Models and Routes
- Implementation of relations between Documents
- Implementation of Hotel, User and Rooms Models and Routes

##### Frontend

- Initialised frontend using Next.js
- Created components for Navbar, Hotel Page, Single Hotel Pages and Filtering/Sorting, Account Page, Wishlist, and Booking Pages (all are made to be responsive as well)
- Added authentication (+social log in) using Auth-0
