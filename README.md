# Digital Menu App - Backend

## Description

FRONTNED REPOSITORY - https://github.com/amratansh12/digital-menu

The backend of the Digital Menu App is responsible for handling API requests, managing database interactions, and providing secure authentication for the app. It supports role-based access for Admins and Users, enabling comprehensive restaurant and menu management, order processing, and payment integration.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **Role-Based Authentication**: Secure login/signup for Admin and User roles using JWT.
- **Restaurant Management**: Create, join, and manage restaurants.
- **Menu Management**: Create and add menu items to restaurants.
- **Order Management**: Track and update order statuses.
- **QR Code Generation**: Generate QR codes for accessing restaurant menus.
- **Payment Integration**: Integrate with Razorpay for secure payments.

## Technologies Used

### Backend

- **ExpressJS**: Web framework for Node.js.
- **NodeJS**: JavaScript runtime for server-side applications.
- **MongoDB**: NoSQL database using Mongoose for data modeling.
- **JSON Web Token**: For secure authentication.
- **Bcrypt**: For password hashing.
- **Razorpay**: For payment processing.
- **qrcode**: For generating QR codes.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.22.x)
- MongoDB (>= 4.x)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/amratansh12/digital-menu-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd digital-menu-api
    ```
3. Install dependencies:
    ```bash
    npm install
    or
    yarn install
    ```
4. Create a `.env` file in the root directory and add the necessary environment variables. 
    ```bash
    # Mongo connection string
    MONGO_URL=<your_mongodb_url>

    # Port number
    PORT=<your_port_number>

    # Jwt private key
    JWT_PRIVATE_KEY=<your_jwt_private_key>

    # Frontend url for qrcode
    FRONTEND_URL=<your_frontend_url>

    # Razorpay keys
    RAZORPAY_API_KEY=<your_razorpay_api_key>
    RAZORPAY_API_SECRET=<your_razorpay_api_secret>
    ```

5. Start the server:
    ```bash
    npm run dev
    or
    yarn dev
    ```

## Usage

The backend provides a RESTful API for interacting with the frontend. It handles authentication, restaurant and menu management, order processing, and payment integration.

### Running Locally

1. Ensure MongoDB is running.
2. Use the provided commands to start the server. The server will run on the specified port, typically `http://localhost:<env_port_number>`.

## API Documentation

### Authentication

- **POST** `/auth/v1/signup`: Sign up a new user.
- **POST** `/auth/v1/signin`: Log in an existing user.

### Restaurants

- **POST** `/restaurant/v1/create`: Create a new restaurant.
- **POST** `/restaurant/v1/join`: Join a restaurant.
- **POST** `/restaurant/v1/menu`: Get menu items of a restaurant.
- **POST** `/restaurant/v1/info`: Get details of a restaurant.
- **POST** `/restaurant/v1/restaurants`: Get restaurants of a user.

### Menus

- **POST** `/menu/v1/create`: Add a new menu item.

### Orders

- **POST** `/payment/v1/create`: Initiate a new payment.
- **POST** `/payment/v1/success`: Verify payment and place order.
- **POST** `/payment/v1/restaurant/orders`: Get all orders of a restaurant.
- **POST** `/payment/v1/user/orders`: Get all orders of a user.
- **POST** `/payment/v1/update`: Update the status of a order.

### QR Codes

- **POST** `/qrcode/v1/create`: Generate a QR code for a specific restaurant.

## Database Schema

### User

- **Schema**:
    - `email`: String, required, unique
    - `password`: String, required, minimum Length = 8
    - `role`: String (admin/user), required
    - `restaurants`: Array of ObjectId(Restaurant)
    - `order`: Array of ObjectId(Orders)

### Restaurant

- **Schema**:
    - `name`: String, required
    - `location`: String, required
    - `description`: String
    - `menu`: Array of ObjectId(MenuItem)
    - `employees`: Array of ObjectId (User)
    - `orders`: Array of ObjectId (Orders)

### Menu

- **Schema**:
    - `name`: String, required
    - `description`: String, required
    - `price`: String, required
    - `category`: String, required
    - `restaurantId`: Array of ObjectId(Restaurant)

### Orders

- **Schema**:
    - `items`: Array of ObjectId(MenuItem)
    - `restaurantId`: ObjectId (Restaurant)
    - `userId`: ObjectId (User), required
    - `status`: String (Pending/Cancelled/Accepted/Served), required

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add your feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

Please ensure that your code adheres to our coding guidelines and includes appropriate tests.

## Contact

For any questions or suggestions, please contact:

- **Name**: Amratansh Shrivastava
- **Email**: ashri1205@gmail.com
- **GitHub**: [amratansh12](https://github.com/amratansh12)


