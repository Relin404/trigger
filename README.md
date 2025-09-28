# Trigger

A distributed microservices platform built with NestJS, Nx monorepo, and event-driven architecture for scalable job processing and user authentication.

## 🏗️ Architecture Overview

Trigger is a modern microservices platform designed for handling distributed job processing with the following key components:

### 🔧 Core Services

- **🔐 Auth Service** (`apps/auth`) - Authentication and user management with gRPC API
- **📋 Jobs Service** (`apps/jobs`) - Job management and scheduling with GraphQL API
- **⚡ Executor Service** (`apps/executor`) - Job execution engine with Pulsar messaging

### 📚 Shared Libraries

- **🌐 GraphQL** (`libs/graphql`) - Shared GraphQL schemas and utilities
- **🔗 gRPC** (`libs/grpc`) - Protocol buffer definitions and gRPC clients
- **🎯 NestJS** (`libs/nestjs`) - Common NestJS utilities and decorators
- **💾 Prisma** (`libs/prisma`) - Database client and schema management
- **📡 Pulsar** (`libs/pulsar`) - Apache Pulsar messaging client and utilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL database
- Apache Pulsar cluster

### Development Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   # Root environment configuration
   cp .env.example .env
   # Edit .env with your configuration

   # Application-specific environment files
   cp apps/auth/.env.example apps/auth/.env
   cp apps/jobs/.env.example apps/jobs/.env
   cp apps/executor/.env.example apps/executor/.env
   # Edit each app's .env file with service-specific configuration
   ```

3. **Generate Prisma client:**

   ```bash
   npx nx run auth:generate-prisma
   ```

4. **Start all services:**

   ```bash
   npm start
   ```

This will start:

- Auth Service: <http://localhost:3000/api>
- Jobs Service: <http://localhost:3001/api>
- Executor Service: <http://localhost:3002/api>

### Individual Service Commands

Start specific services:

```bash
# Auth service only
npx nx serve auth

# Jobs service only
npx nx serve jobs

# Executor service only
npx nx serve executor
```

## 🏢 Service Details

### Auth Service (Port 3000)

- **Purpose**: User authentication and authorization
- **Technologies**: NestJS, Prisma, gRPC, GraphQL
- **Features**:
  - User registration and login
  - JWT token management
  - gRPC microservice for inter-service communication
  - GraphQL API for frontend integration

### Jobs Service (Port 3001)

- **Purpose**: Job management and scheduling
- **Technologies**: NestJS, Apache Pulsar, GraphQL
- **Features**:
  - Job creation and scheduling
  - Job status tracking
  - Event-driven job processing
  - GraphQL API with job providers discovery

### Executor Service (Port 3002)

- **Purpose**: Job execution engine
- **Technologies**: NestJS, Apache Pulsar
- **Features**:
  - Consumes jobs from Pulsar queues
  - Executes job workloads
  - Reports job completion status
  - Scalable worker architecture

## 🐳 Docker Deployment

The project includes Docker configurations for containerized deployment:

```bash
# Build all services
docker-compose build

# Start the entire stack
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🛠️ Development

### Project Structure

```
apps/
├── auth/          # Authentication service
├── executor/      # Job execution service
└── jobs/          # Job management service

libs/
├── graphql/       # Shared GraphQL utilities
├── grpc/          # gRPC protocol definitions
├── nestjs/        # Common NestJS utilities
├── prisma/        # Database client
└── pulsar/        # Messaging client
```

### Building

```bash
# Build all projects
npx nx run-many -t build

# Build specific project
npx nx build auth
```

### Testing

```bash
# Run all tests
npx nx run-many -t test

# Test specific project
npx nx test auth
```

### Code Generation

```bash
# Generate new NestJS app
npx nx g @nx/nest:app my-service

# Generate new library
npx nx g @nx/node:lib my-lib

# Generate Prisma migrations
npx nx run auth:prisma-migrate-dev
```

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/trigger"

# Pulsar
PULSAR_SERVICE_URL="pulsar://localhost:6650"

# JWT
JWT_SECRET="your-secret-key"

# gRPC
GRPC_PORT=50051
```

### Module Resolution

The project uses a custom module resolver (`module-resolver.js`) to handle internal library dependencies in the monorepo. This ensures proper module resolution in both development and production environments.

## 🏗️ Technology Stack

- **Framework**: NestJS
- **Monorepo**: Nx
- **Database**: PostgreSQL with Prisma ORM
- **Messaging**: Apache Pulsar
- **API**: GraphQL + gRPC
- **Authentication**: JWT
- **Containerization**: Docker
- **Language**: TypeScript

## 📝 API Documentation

### GraphQL APIs

- **Jobs Service**: <http://localhost:3001/graphql>
- **Auth Service**: <http://localhost:3000/graphql>

### gRPC Services

- **Auth Service**: localhost:50051

## 📊 Project Management with Linear

I use [Linear](https://linear.app) for issue tracking and project management throughout this project. Linear's streamlined workflow has been instrumental in maintaining my development velocity by providing:

- **Automated branch naming** - Each issue automatically generates branch names (e.g., `side-22-dockerize-all-microservices`)
- **Seamless PR linking** - Pull requests are automatically linked to Linear issues for complete traceability
- **Milestone tracking** - Clear progress visualization across development phases
- **Efficient workflow** - Streamlined task management and status updates

The branch naming convention you see across this repository directly reflects Linear's issue tracking system, ensuring every code change I make is tied to a specific feature or bug fix.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📋 Roadmap & Todo

### 🛍️ Products Module

- [ ] Add a products module with full CRUD operations
- [ ] Integrate Drizzle ORM for database operations in the products module
- [ ] Implement gRPC communication protocol for the products service
<!-- - [ ] Create product catalog and inventory management features -->

### ☸️ Kubernetes Integration

- [ ] Prepare Kubernetes manifests
<!-- - [ ] Set up Kubernetes cluster configuration
- [ ] Integrate with GitHub Actions for CI/CD pipeline
- [ ] Configure Amazon ECR (Elastic Container Registry) for Docker images
- [ ] Create comprehensive Helm charts for all services
- [ ] Implement horizontal pod autoscaling (HPA) for dynamic scaling
- [ ] Set up resource limits and requests for optimal performance -->

### 🚀 Production Deployment

- [ ] Deploy to AWS Elastic Kubernetes Service (EKS)
- [ ] Configure AWS-specific Helm charts and values
<!-- - [ ] Set up custom domain with Route 53 DNS management
- [ ] Implement SSL/TLS certificates with AWS Certificate Manager
- [ ] Configure production-grade monitoring and logging
- [ ] Set up automated backup and disaster recovery -->

---

Built with ❤️ using [Nx](https://nx.dev) and [NestJS](https://nestjs.com)
