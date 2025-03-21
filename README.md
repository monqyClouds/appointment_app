# Appointment App

This is a small Express application designed to manage appointments, doctors, and slots. It provides endpoints to create doctors, book slots, and retrieve available and booked slots for doctors.

## Features

- **Doctor Management**: Create and retrieve doctors.
- **Slot Management**: Create slots for doctors and book appointments.
- **Validation**: Request validation using Zod schemas.
- **Database**: Uses MySQL for data storage and Prisma for ORM.

## Prerequisites

- Node.js (>= 12.6.0)
- Docker and Docker Compose
- MySQL

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/appointment-app.git
cd appointment-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=mysql://user:password@mysql:3306/appointment_app
```

### 4. Start the Application with Docker

```bash
docker-compose up --build
```

This command will start the MySQL database and the Express application. The application will be available at `http://localhost:8000`.

### 5. Run Migrations

The application will automatically run Prisma migrations when it starts. If you need to run migrations manually, use the following command:

```bash
npx prisma migrate deploy
```

## API Endpoints

### Doctors

- **Create a Doctor**

  - `POST /doctors`
  - Body: `createDoctorSchema`
    ```typescript
    {
      userName: string; // Non-empty string
      firstName: string; // Non-empty string
      lastName: string; // Non-empty string
    }
    ```

- **Get Doctors**

  - `GET /doctors`
  - Query: `getDoctorsQuerySchema`
    ```typescript
    {
      skip?: number; // Optional, minimum 0
      limit?: number; // Optional, positive integer
    }
    ```

- **Get Available Slots for a Doctor**

  - `GET /doctors/:id/available_slots`
  - Query: `getAvailableSlotsQuerySchema`
    ```typescript
    {
      skip?: number; // Optional, minimum 0
      limit?: number; // Optional, positive integer
      date?: string; // Optional, date string
    }
    ```

- **Get Booked Slots for a Doctor**

  - `GET /doctors/:id/bookings`
  - Query: `getBookedSlotsQuerySchema`
    ```typescript
    {
      skip?: number; // Optional, minimum 0
      limit?: number; // Optional, positive integer
      startDate?: string; // Optional, date string
      endDate?: string; // Optional, date string
    }
    ```

- **Create Slots for a Doctor**
  - `POST /doctors/:id/slots`
  - Body: `createSlotSchema`
    ```typescript
    {
      startTime: Date; // Must be a future date
      endTime: Date; // Must be after startTime and on the same day
      duration: 15 | 30; // Slot duration in minutes
      daily?: boolean; // Optional, defaults to false
      weekdays?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'>; // Optional, minimum 1 weekday if provided
    }
    ```

### Slots

- **Book a Slot**
  - `POST /slots/:id/book`
  - Body: `bookSlotSchema`
    ```typescript
    {
      fullName: string; // Non-empty string
    }
    ```

## Development

### Running the Application in Development Mode

```bash
npm run start:dev
```

This command will start the application in development mode with hot-reloading.

### Linting and Formatting

- Lint the code:

  ```bash
  npm run lint
  ```

- Fix linting issues:

  ```bash
  npm run fix
  ```

### Testing

Currently, there are no tests specified. You can add tests and run them using:

```bash
npm test
```

## Built With

- [Express](https://expressjs.com/) - Web framework for Node.js
- [Prisma](https://www.prisma.io/) - ORM for Node.js and TypeScript
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [MySQL](https://www.mysql.com/) - Relational database management system

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the creators of Express, Prisma, and Zod for their amazing tools.
- Special thanks to the Node.js community for their continuous support and contributions.

---

Feel free to contribute to this project by opening issues or submitting pull requests. Happy coding! 🚀
