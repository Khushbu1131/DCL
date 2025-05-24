# DCL
# Project Directory Structure
event/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts
│   │       ├── roles.guard.ts
│   │       └── roles.decorator.ts
│
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── user.entity.ts
│       └── dto/
│   │       ├── login.dto.ts
│   │       └── create-user.dto.ts
│   ├── program/
│   │   ├── program.controller.ts
│   │   ├── program.service.ts
│   │   ├── program.module.ts
│   │   ├── program.entity.ts
│   │   └── dto/
│   │       └── create-program.dto.ts
            └── update-program.dto.ts
│
│   ├── bookings/
│   │   ├── bookings.controller.ts
│   │   ├── bookings.service.ts
│   │   ├── bookings.module.ts
│   │   ├── booking.entity.ts
│   │   └── dto/
│   │       └── create-booking.dto.ts
│

│
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
│
├── uploads/
│   └── [uploaded photos go here]
│
│
│
├── .env
├── README.md
├── package.json
├── tsconfig.json
└── nest-cli.json
