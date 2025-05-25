# DCL
1.Setup

    1.1 Prerequisites

        Node.js

        npm

        Node.js (version>=20)

        PostgreSQL

        Nest CLI
  
      bash:

         npm i -g @nestjs/cli
    
     1.2 Project Create

       bash:

           nest new event

      1.3 Database Setup

        bash:

             npm install --save @nestjs/typeorm typeorm pg

2.Configure .env

     JWT_SECRET=supersecretkey

     JWT_EXPIRES_IN=1d
       
3. Validation

    bash:

       npm i --save class-validator class-transformer
       
import { ApiProperty } from "@nestjs/swagger";

import { IsInt, Max, Min } from "class-validator";

export class CreateBookingDto {

  @ApiProperty({ example: 1, description: 'The ID of the program to book' })

  @IsInt()

  programId: number;

  @ApiProperty({ example: 2, description: 'Number of seats to book (1 to 4)' })

  @IsInt()

  @Min(1)

  @Max(4)

  seats: number;
}

4. JWT Authentication

   bash:

       npm install @nestjs/jwt @nestjs/passport passport passport-jwt

5.Hashing Password and verify the hashing password

   bash:

        npm install bcryptjs

        npm install --save-dev @types/bcryptjs

6. Photo file upload [Multer]

     bash:

         npm install @nestjs/platform-express multer

         npm install --save-dev @types/multer
         
7.Install Express

       bash:

          npm install @nestjs/platform-express
         
         Installs Express support and Multer for file (photo) uploads in NestJS, plus TypeScript types for development.


8. API documentation Swagger

     bash:

          npm install --save @nestjs/swagger swagger-ui-express

9.Start the server

     bash:

         npm run start:dev

Server runs at: http://localhost:3000

Swagger UI: http://localhost:3000/api/docs

10.Features

 10.1 Authentication & Authorization

        User registration and login via email/password

        JWT-based authentication for secure access

        Role-based access control: user and admin

10.2 Event Management

     Admin can:

       Create, update, and delete program

       Upload a program photo

       View all programs

    Public access to:
        View upcoming and past programs

        View individual program details by name or ID

10.3 Seat Booking System

    Authenticated users can:

    Book 1–4 seats for future 

    View their own bookings
      
      Booking validation includes:

            No overbooking beyond capacity

            No booking of past and ongoing program



11.API Endpoints

Authentication

Method	Path	Description

POST     /api/auth/register	Register a new user

POST	/api/auth/login	Login with email and password

Users

Method	Path	Description	Auth & Roles

GET	/api/users/admin	Admin test endpoint	JWT + admin only

GET	/api/users/profile	Get current user profile	JWT




Programs

Method	Path	Description	Auth & Roles

GET	/api/program/upcoming	List upcoming programs	Public

GET	/api/program/past	List past programs	Public

GET	/api/program/{name}	Get program details by name	Public

GET	/api/program/id/{id}	Get program details by ID	Public

GET	/api/program	List all programs (admin view)	JWT + admin only

POST	/api/program	Create a new program (with photo)	JWT + admin only

PATCH	/api/program/{id}	Update a program (with photo)	JWT + admin only

DELETE	/api/program/{id}	Delete a program	JWT + admin only

Bookings

Method	Path	Description	Auth & Roles

POST	/api/bookings/book	Book seats for a program (1–4 seats)	JWT + user

GET	/api/bookings/my-bookings	Get bookings for the logged-in user	JWT + user










    
