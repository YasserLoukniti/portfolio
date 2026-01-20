# Technical Showcase - WeNeeds Platform

> Document technique destiné aux entretiens et discussions avec des développeurs fullstack.
> Ce document présente les fonctionnalités avancées, patterns architecturaux et bonnes pratiques implémentées.

---

## Table des Matières

1. [Vue d'ensemble Architecture](#1-vue-densemble-architecture)
2. [Infrastructure AWS & DevOps](#2-infrastructure-aws--devops)
3. [Backend NestJS - Patterns Avancés](#3-backend-nestjs---patterns-avancés)
4. [Frontend Next.js - Techniques Avancées](#4-frontend-nextjs---techniques-avancées)
5. [AI/ML Backend - FastAPI & LangChain](#5-aiml-backend---fastapi--langchain)
6. [Admin Dashboard](#6-admin-dashboard)
7. [Points Clés pour Entretiens](#7-points-clés-pour-entretiens)

---

## 1. Vue d'ensemble Architecture

### Stack Technique

| Couche | Technologies |
|--------|-------------|
| **Frontend** | Next.js 14, React, Redux Toolkit, styled-components, React Query |
| **Backend API** | NestJS, TypeORM, PostgreSQL, MongoDB, Redis, Elasticsearch |
| **Microservices** | Payment Service, Mail Service, Notification Service, FFmpeg Service |
| **AI/ML** | FastAPI (10+ services), LangChain, LangGraph, Weaviate, OpenAI/Anthropic/Mistral |
| **Infrastructure** | AWS EKS (Multi-Pod), Terraform, ArgoCD, GitHub Actions CI/CD |
| **Messaging** | Apache Kafka (event-driven), Redis Pub/Sub (real-time) |

### Architecture Globale Complète

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND TIER                                       │
│  ┌─────────────────────────────┐     ┌─────────────────────────────┐            │
│  │   Web App (Next.js)         │     │   Admin Dashboard (React)   │            │
│  │   Port: 4200                │     │   Port: 4201                │            │
│  │   • Redux + Persist         │     │   • 40+ pages admin         │            │
│  │   • React Query             │     │   • Analytics/Monitoring    │            │
│  │   • Socket.IO Client        │     │   • Payment Management      │            │
│  └──────────────┬──────────────┘     └──────────────┬──────────────┘            │
└─────────────────┼────────────────────────────────────┼──────────────────────────┘
                  │ HTTP REST (OpenAPI generated)      │
                  └────────────────┬───────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         NESTJS API GATEWAY (Port 3011)                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ Auth Module │ │ Jobs Module │ │ Admin Module│ │ LLM Service │               │
│  │ • JWT/OAuth │ │ • Matching  │ │ • RBAC      │ │ • AI Proxy  │──────────┐    │
│  │ • Guards    │ │ • Search    │ │ • Audit     │ │ • Scoring   │          │    │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │    │
│                                                                            │    │
│  Kafka Producer ──────────────────────────────────────────┐               │    │
│  • offer.created • action.performed • mail.send           │               │    │
│  • notification.send • video.generate                     │               │    │
└───────────────────────────────────────────────────────────┼───────────────┼────┘
                                                            │               │
        ┌───────────────────────────────────────────────────┘               │
        │ KAFKA EVENT BUS                                                   │
        ▼                                                                   ▼
┌───────────────────────────────────────────────────┐   ┌───────────────────────────────┐
│              MICROSERVICES TIER                    │   │    FASTAPI AI SERVICES        │
│                                                    │   │    (HTTP Direct from NestJS)  │
│  ┌─────────────────┐  ┌─────────────────┐        │   │                               │
│  │ Payment Service │  │ Mail Service    │        │   │  ┌─────────────────────────┐  │
│  │ Port: 3010      │  │ Port: 3002      │        │   │  │ AI Agent (LangGraph)    │  │
│  │ • Stripe        │  │ • AWS SES       │        │   │  │ • Multi-agent routing   │  │
│  │ • Budget Mgmt   │  │ • Templates     │        │   │  │ • 6+ specialized agents │  │
│  │ • Audit Logs    │  │ • Dual Control  │        │   │  └─────────────────────────┘  │
│  └─────────────────┘  └─────────────────┘        │   │  ┌─────────────────────────┐  │
│                                                    │   │  │ Matching Services       │  │
│  ┌─────────────────┐  ┌─────────────────┐        │   │  │ • Candidates matching   │  │
│  │ Notification    │  │ FFmpeg Service  │        │   │  │ • Jobs matching         │  │
│  │ Service         │  │ Port: 3001      │        │   │  │ • Prospects matching    │  │
│  │ Port: 3000      │  │ • Transcoding   │        │   │  └─────────────────────────┘  │
│  │ • Firebase FCM  │  │ • S3 Storage    │        │   │  ┌─────────────────────────┐  │
│  │ • Push Notifs   │  │ • Moderation    │        │   │  │ CV Parsing / Scoring    │  │
│  └─────────────────┘  └─────────────────┘        │   │  │ Interview Gen/Analysis  │  │
│                                                    │   │  │ Nanoservice             │  │
└───────────────────────────────────────────────────┘   └───────────────────────────────┘
                          │                                           │
                          ▼                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            DATA TIER                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │ PostgreSQL  │ │  MongoDB    │ │   Redis     │ │  Weaviate   │ │Elasticsearch│
│  │ (TypeORM)   │ │ (Mongoose)  │ │  (Cache)    │ │ (Vectors)   │ │ (Search)  │ │
│  │ • Users     │ │ • Audit Logs│ │ • Sessions  │ │ • Embeddings│ │ • Jobs    │ │
│  │ • Jobs      │ │ • Settings  │ │ • Socket.IO │ │ • Hybrid    │ │ • Profiles│ │
│  │ • Payments  │ │ • Templates │ │ • Bull Queue│ │   Search    │ │           │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Communication Inter-Services

| Source | Destination | Protocole | Usage |
|--------|-------------|-----------|-------|
| Frontend | NestJS API | HTTP REST | Toutes les requêtes |
| NestJS | FastAPI Services | HTTP Direct | Appels AI/ML synchrones |
| NestJS | Payment Service | Kafka | Events asynchrones |
| NestJS | Mail Service | Kafka | Envoi emails |
| NestJS | Notification Service | Kafka | Push notifications |
| NestJS | FFmpeg Service | Kafka | Traitement vidéo |

**Point clé** : Le frontend ne communique **JAMAIS** directement avec les services AI. Tout passe par NestJS qui orchestre les appels.

---

## 2. Infrastructure AWS & DevOps

### 2.1 AWS EKS Multi-Pod Architecture

**Cluster Kubernetes** déployé sur AWS EKS avec Terraform :

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AWS EKS CLUSTER (eu-west-3)                       │
│                    Kubernetes v1.29                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                   NAMESPACE: weenyd-develop                  │    │
│  │                                                              │    │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │    │
│  │  │   Pod:       │ │   Pod:       │ │   Pod:       │        │    │
│  │  │   Backend    │ │   Frontend   │ │   Django     │        │    │
│  │  │   (NestJS)   │ │   (Next.js)  │ │   (FastAPI)  │        │    │
│  │  │   :3011      │ │   :4200      │ │   :8000      │        │    │
│  │  └──────────────┘ └──────────────┘ └──────────────┘        │    │
│  │                                                              │    │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │    │
│  │  │   Pod:       │ │   Pod:       │ │   Pod:       │        │    │
│  │  │   Payment    │ │   Mail       │ │   Notif      │        │    │
│  │  │   Service    │ │   Service    │ │   Service    │        │    │
│  │  │   :3010      │ │   :3002      │ │   :3000      │        │    │
│  │  └──────────────┘ └──────────────┘ └──────────────┘        │    │
│  │                                                              │    │
│  │  ┌──────────────┐ ┌──────────────┐                          │    │
│  │  │   Pod:       │ │   Pod:       │   + 10 FastAPI           │    │
│  │  │   Admin      │ │   FFmpeg     │     AI Services          │    │
│  │  │   Dashboard  │ │   Service    │                          │    │
│  │  │   :4201      │ │   :3001      │                          │    │
│  │  └──────────────┘ └──────────────┘                          │    │
│  │                                                              │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    NODE GROUP (Auto-scaling)                 │    │
│  │    Instance: t3.medium | Min: 2 | Max: 3 | Desired: 3       │    │
│  │    Multi-AZ: eu-west-3a, eu-west-3b, eu-west-3c             │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                AWS ALB INGRESS CONTROLLER                    │    │
│  │    • /       → frontend-service:4200                        │    │
│  │    • /api    → backend-service:3011                         │    │
│  │    • /admin  → admin-dashboard:4201                         │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Terraform Infrastructure-as-Code

**Modules Terraform** pour provisionnement automatisé :

```terraform
# Infrastructure-eks/terraform-manifest/

# 1. VPC avec Multi-AZ
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "weenyd-eks-vpc"
  cidr   = "10.0.0.0/16"

  azs             = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]

  enable_nat_gateway   = true
  enable_dns_hostnames = true

  # Tags pour ALB auto-discovery
  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
  }
}

# 2. EKS Cluster avec IRSA
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "weenyd-eks"
  cluster_version = "1.29"

  enable_irsa = true  # IAM Roles for Service Accounts

  eks_managed_node_groups = {
    workers = {
      min_size     = 2
      max_size     = 3
      desired_size = 3
      instance_types = ["t3.medium"]
    }
  }

  cluster_addons = {
    coredns    = { most_recent = true }
    kube-proxy = { most_recent = true }
    vpc-cni    = { most_recent = true }
  }
}

# 3. ALB Controller via Helm
resource "helm_release" "aws_load_balancer_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"
}

# 4. ArgoCD pour GitOps
resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = "argocd"
  create_namespace = true
}
```

**Remote State** sécurisé :
```terraform
terraform {
  backend "s3" {
    bucket         = "terraform-bucket-eks"
    key            = "terraform/terraform.state"
    region         = "eu-west-3"
    dynamodb_table = "eks-terraform-state-weenyd"  # State locking
  }
}
```

### 2.3 ArgoCD GitOps Deployment

**Principe** : Les déploiements sont déclenchés par des commits Git, pas par des scripts manuels.

```yaml
# ArgoCD Application Definition
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: weenyd-backend
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/weenyd/weenyd_tech
    targetRevision: production
    path: Infrastructure-eks/k8s-manifest
  destination:
    server: https://kubernetes.default.svc
    namespace: weenyd-develop
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

### 2.4 CI/CD Pipeline (GitHub Actions)

**Pipeline de déploiement production** (~2000 lignes) :

```yaml
# .github/workflows/deployment-production.yaml

name: Production Deployment
on:
  push:
    branches: [production]

jobs:
  # 1. Détection des changements par service
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      backend: ${{ steps.filter.outputs.backend }}
      frontend: ${{ steps.filter.outputs.frontend }}
      payment: ${{ steps.filter.outputs.payment }}
      # ... 17+ services trackés
    steps:
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            backend:
              - 'apps/nest-api/**'
            frontend:
              - 'apps/web/**'
            payment:
              - 'apps/payment-service/**'
            ai-agent:
              - 'apps/fastapi-ai-agent/**'

  # 2. Build conditionnel par service
  build-backend:
    needs: [detect-changes]
    if: needs.detect-changes.outputs.backend == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}  # OIDC, pas de clés statiques
          aws-region: eu-west-3

      - uses: aws-actions/amazon-ecr-login@v2

      - name: Build and Push
        run: |
          docker build -t $ECR_REGISTRY/weenyd:backend-$VERSION \
            -f apps/nest-api/Dockerfile .
          docker push $ECR_REGISTRY/weenyd:backend-$VERSION

  # 3. Déploiement via ArgoCD sync
  deploy:
    needs: [build-backend, build-frontend, ...]
    runs-on: ubuntu-latest
    steps:
      - name: Trigger ArgoCD Sync
        run: |
          argocd app sync weenyd-backend --prune
```

**Sécurité CI/CD** :
- **OIDC Authentication** : Pas de clés AWS stockées dans GitHub
- **Build conditionnel** : Seuls les services modifiés sont rebuild
- **Semantic versioning** : Tags automatiques depuis les commits

### 2.5 Kubernetes Manifests

**Deployment avec ConfigMap et Secrets** :

```yaml
# Infrastructure-eks/k8s-manifest/backend-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
  namespace: weenyd-develop
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: 905418449213.dkr.ecr.eu-west-3.amazonaws.com/weenyd:backend-latest
        ports:
        - containerPort: 3011
        envFrom:
        - configMapRef:
            name: backend-configmap
        - secretRef:
            name: backend-secret
        resources:
          requests:
            cpu: "100m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
```

**Ingress ALB** :
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: weenyd-ingress
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/healthcheck-path: /health
spec:
  rules:
  - http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 3011
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 4200
```

### 2.6 Services AWS Utilisés

| Service | Usage | Configuration |
|---------|-------|---------------|
| **EKS** | Orchestration Kubernetes | 3 nodes t3.medium, Multi-AZ |
| **ECR** | Registry Docker | `weenyd-docker-images` (20+ images) |
| **ALB** | Load Balancer | Ingress Controller, HTTPS termination |
| **RDS** | PostgreSQL managé | `weenyd.cniwwqi0qan9.eu-west-3.rds.amazonaws.com` |
| **DocumentDB** | MongoDB compatible | Audit logs, settings |
| **ElastiCache** | Redis managé | Sessions, cache, pub/sub |
| **S3** | Object storage | `weneeds-public`, `weneeds-private` |
| **CloudFront** | CDN | Distribution images/vidéos |
| **SES** | Email service | Transactional emails |
| **SSM** | Secrets management | Firebase credentials |

---

## 3. Backend NestJS - Patterns Avancés

### 3.1 Architecture Modulaire Multi-Database

**40+ modules** organisés par domaine avec support multi-bases de données :

```typescript
// apps/nest-api/src/app.module.ts
@Module({
  imports: [
    // PostgreSQL via TypeORM (master-slave)
    TypeOrmModule.forRootAsync({
      useFactory: (config) => ({
        type: 'postgres',
        replication: {
          master: { host: config.masterHost, ... },
          slaves: [{ host: config.slaveHost, ... }],
        },
      }),
    }),

    // MongoDB via Mongoose (audit logs, settings)
    MongooseModule.forRootAsync({
      useFactory: async (configService) => ({
        uri: buildMongoUri(configService),
        tlsCAFile: configService.get('MONGODB_CERT_PATH'),
      }),
    }),

    // Redis pour cache et pub/sub
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: process.env.REDIS_URL,
          tls: process.env.REDIS_TLS === 'true' ? tlsConfig : undefined,
        },
      }),
    }),
  ],
})
```

### 3.2 Système de Guards avec Reflector Pattern

**Multi-niveau d'autorisation** : User Roles + Company Roles

```typescript
// guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Récupération des métadonnées via Reflector
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}

// Décorateur custom pour les rôles entreprise
// decorators/company-roles.decorator.ts
export const CompanyRoles = (...roles: CollaboratorRole[]) =>
  SetMetadata(COMPANY_ROLES_KEY, roles);

// Utilisation
@Post('job')
@Roles(UserRole.RECRUITER)
@CompanyRoles(CollaboratorRole.ADMIN, CollaboratorRole.MANAGER)
async createJob(@Body() dto: CreateJobDto) { ... }
```

### 3.3 Event-Driven Architecture avec Kafka

**Pattern Producer-Consumer** pour découplage des services :

```typescript
// services/kafka-producer.service.ts
@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private producer: Producer;

  // Événements typés pour le système de paiement
  async publishApplicationReceived(data: {
    offerId: string;
    companyId: string;
    applicationId: string;
    matchingScore: number;  // Score 0-100 du matching AI
  }) {
    await this.send('application.received', [data]);
  }

  async publishActionPerformed(data: {
    type: PaymentActionType;
    jobId: string;
    amount: number;
  }) {
    await this.send('action.performed', [data]);
  }
}

// Consumer avec MessagePattern (Microservices)
@Controller()
export class PaymentConsumer {
  @MessagePattern('payment.method.added')
  async handlePaymentMethodAdded(@Payload() data: PaymentMethodEvent) {
    // Notifier tous les collaborateurs de l'entreprise
    await this.notificationService.notifyCollaborators(data.companyId, {
      type: 'PAYMENT_METHOD_ADDED',
      data,
    });
  }
}
```

### 3.4 Payment Audit System avec Write-Ahead Log

**MongoDB pour audit trail** avec fallback automatique :

```typescript
// services/payment-audit-mongo.service.ts
@Injectable()
export class PaymentAuditMongoService {

  // Write-ahead log: action loguée AVANT traitement
  async createAuditLog(type: PaymentActionType, payload: any): Promise<AuditLog> {
    // Calcul du montant basé sur le type d'action
    const amount = this.calculateAmount(type, payload);

    const auditLog = new this.auditLogModel({
      type,
      payload,
      status: PaymentAuditStatus.PENDING,
      amount,
      retryCount: 0,
      createdAt: new Date(),
    });

    return await auditLog.save();  // Persiste AVANT l'action
  }

  private calculateAmount(type: PaymentActionType, payload: any): number {
    switch (type) {
      case PaymentActionType.APPLICATION_RECEIVED:
        return (payload.matchingScore || 67) * 0.01;  // ~0.67€
      case PaymentActionType.INTERVIEW_SUCCEEDED:
        return 1.00;
      case PaymentActionType.INTERVIEW_FAILED:
        return 0.50;
      default:
        return 0;
    }
  }
}

// Service de retry avec Cron
@Injectable()
export class PaymentRetryService {
  @Cron('*/1 * * * *')  // Chaque minute
  async processPendingPaymentLogs() {
    const pendingLogs = await this.paymentAuditService.getPendingLogs(50);

    for (const log of pendingLogs) {
      try {
        await this.kafkaProducer.sendPaymentAction(log);
        await this.paymentAuditService.markAsProcessed(log.id);
      } catch (error) {
        await this.paymentAuditService.incrementRetryCount(log.id);
      }
    }
  }
}
```

### 3.5 Strategy Pattern pour Intégrations Calendrier

**Support multi-providers** : Google, Microsoft, Calendly

```typescript
// strategies/calendar.strategy.ts
@Injectable()
export class CalendarStrategy {
  private strategies: Map<CalendarType, CalendarsService>;

  constructor(
    private googleStrategy: CalendarGoogleStrategy,
    private calendlyStrategy: CalendarCalendlyStrategy,
    private microsoftStrategy: CalendarMicrosoftStrategy,
  ) {
    this.strategies = new Map([
      [CalendarType.GOOGLE, this.googleStrategy],
      [CalendarType.CALENDLY, this.calendlyStrategy],
      [CalendarType.MICROSOFT, this.microsoftStrategy],
    ]);
  }

  async getStrategy(userId: string, type: CalendarType): Promise<CalendarsService> {
    const strategy = this.strategies.get(type);
    const calendar = await this.getCalendarConfig(userId, type);

    // Refresh automatique des tokens OAuth expirés
    if (this.isTokenExpired(calendar)) {
      await this.refreshToken(calendar, type);
    }

    return strategy;
  }

  async createMeeting(userId: string, type: CalendarType, data: MeetingData) {
    const strategy = await this.getStrategy(userId, type);
    return strategy.createEvent(data);
  }
}
```

### 3.6 Optimisation Query TypeORM

**Élimination N+1** avec Query Builder avancé :

```typescript
// applications.service.ts
async findApplicationsWithRelations(jobId: string, page: number, limit: number) {
  const queryBuilder = this.applicationRepository
    .createQueryBuilder('application')
    .where('application.jobId = :jobId', { jobId })
    // Eager loading sans N+1
    .leftJoinAndSelect('application.candidate', 'candidate')
    .leftJoinAndSelect('candidate.user', 'candidateUser')
    .leftJoinAndSelect('candidate.address', 'candidateAddress')
    .leftJoinAndSelect('application.job', 'job')
    .leftJoinAndSelect('job.company', 'company')
    .leftJoinAndSelect('application.meeting', 'meeting')
    // Projection sélective pour réduire le payload
    .select([
      'application.id',
      'application.status',
      'application.matchingScore',
      'candidate.id',
      'candidate.firstName',
      'candidateUser.email',
      'job.title',
      'company.name',
    ])
    .orderBy('application.createdAt', 'DESC')
    .skip((page - 1) * limit)
    .take(limit);

  // Count + Data en une seule query
  const [applications, total] = await queryBuilder.getManyAndCount();

  return { applications, total, page, limit };
}
```

### 3.7 WebSocket Gateway Production-Ready

```typescript
// chat/chat.gateway.ts
@WebSocketGateway({
  cors: { origin: allowedOrigins, credentials: true },
  pingTimeout: 30000,
  pingInterval: 15000,
  transports: ['websocket', 'polling'],
  perMessageDeflate: { threshold: 1024 },  // Compression
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Heartbeat tracking pour détection de déconnexion
  private heartbeatIntervals: Map<string, NodeJS.Timeout> = new Map();

  afterInit(server: Server) {
    // Redis adapter pour scaling horizontal
    const { pubClient, subClient } = this.redisService.createSocketIORedisClients();
    server.adapter(createAdapter(pubClient, subClient));

    // Socket.io Admin UI en dev
    if (process.env.NODE_ENV !== 'production') {
      instrument(server, { auth: false });
    }
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    const user = await this.authService.verifyToken(token);

    client.data.userId = user.id;
    await client.join(`user:${user.id}`);

    // Setup heartbeat
    this.setupHeartbeat(client);
  }
}
```

### 3.8 Validators Async avec Database Access

```typescript
// validators/is-not-exists.validator.ts
@Injectable()
@ValidatorConstraint({ name: 'IsNotExist', async: true })
export class IsNotExist implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [repository] = args.constraints;
    const currentEntity = args.object as { id?: string };

    const entity = await this.dataSource
      .getRepository(repository)
      .findOne({ where: { [args.property]: value } });

    // Permet la mise à jour de l'entité actuelle
    if (entity?.id === currentEntity?.id) return true;

    return !entity;  // true si n'existe pas
  }
}

// Utilisation dans un DTO
export class CreateUserDto {
  @IsNotExist('User', { message: 'Email déjà utilisé' })
  email: string;
}
```

---

## 4. Frontend Next.js - Techniques Avancées

### 4.1 State Management Redux Toolkit + Persist

```typescript
// libs/ui/store/store.ts

// Storage SSR-safe pour éviter les erreurs côté serveur
const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key: string, value: any) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

const webStorage = typeof window !== 'undefined'
  ? createWebStorage('local')
  : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: webStorage,
  whitelist: ['collaboration'],  // Seuls les slices critiques
};

// Middleware custom pour purge sur logout
const clearStateMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'auth/logout') {
    persistor.purge().then(() => {
      store.dispatch(collaborationSlice.actions.resetState());
    });
  }
  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(clearStateMiddleware),
});
```

### 4.2 Custom Hooks Architecture

#### Hook Budget avec React Query + Fallback

```typescript
// libs/ui/hooks/src/lib/useJobBudget.ts
export function useJobBudget(jobId: string | undefined, isPremiumJob = false) {
  // Jobs premium = budget illimité
  if (isPremiumJob) {
    return {
      hasBudget: true,
      budgetActive: true,
      currentBalance: 999999,
      status: 'ACTIVE',
      isLoading: false,
    };
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['job-budget', jobId],
    queryFn: () => PaymentService.getBudgetInfo(jobId!),
    enabled: !!jobId,
    staleTime: 30 * 1000,      // 30s avant refetch
    cacheTime: 5 * 60 * 1000,  // 5min en cache
    retry: (failureCount, error: any) => {
      // Pas de retry sur 404 (pas de budget configuré)
      if (error?.status === 404) return false;
      return failureCount < 2;
    },
  });

  return {
    hasBudget: data?.currentBalance > 0,
    budgetActive: data?.status === 'ACTIVE',
    currentBalance: data?.currentBalance ?? 0,
    totalBudget: data?.totalBudget ?? 0,
    pausedAt: data?.pausedAt,
    billingCycleStartsAt: data?.billingCycleStartsAt,
    isLoading,
    error,
  };
}
```

#### Hook Performance Monitoring

```typescript
// libs/ui/hooks/src/lib/usePageLoadTime.ts
interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  jsLoadTime: number;
  cssLoadTime: number;
  routeChangeTime: number;
}

export function usePageLoadTime() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      // First Contentful Paint
      const fcp = entries.find(e => e.name === 'first-contentful-paint');

      // Resource timing breakdown
      const resources = performance.getEntriesByType('resource');
      const jsTime = resources
        .filter(r => r.name.endsWith('.js'))
        .reduce((acc, r) => acc + r.duration, 0);

      setMetrics({
        pageLoadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        firstContentfulPaint: fcp?.startTime ?? 0,
        jsLoadTime: jsTime,
        // ...
      });
    });

    observer.observe({ entryTypes: ['paint', 'navigation'] });
    return () => observer.disconnect();
  }, []);

  // Track route changes (SPA navigation)
  useEffect(() => {
    const start = performance.now();

    const handleComplete = () => {
      setMetrics(prev => ({
        ...prev!,
        routeChangeTime: performance.now() - start,
      }));
    };

    router.events.on('routeChangeComplete', handleComplete);
    return () => router.events.off('routeChangeComplete', handleComplete);
  }, [router]);

  return metrics;
}
```

#### Hook Video Upload avec Tus Protocol

```typescript
// libs/ui/hooks/src/lib/useVideoUpload.ts
export function useVideoUpload(candidateId: string) {
  const [progress, setProgress] = useState(0);
  const uploadRef = useRef<Upload | null>(null);

  // Socket.IO pour progress real-time
  useEffect(() => {
    const socket = io('/videos', { auth: { token } });

    socket.on('videoUploadProgress', (data) => {
      setProgress(data.progress);
    });

    socket.on('videoUploadCompleted', (data) => {
      setProgress(100);
      onComplete?.(data.videoUrl);
    });

    return () => socket.disconnect();
  }, [candidateId]);

  const upload = useCallback(async (file: File) => {
    // Tus protocol pour uploads résumables
    uploadRef.current = new Upload(file, {
      endpoint: `${API_URL}/videos/upload`,
      retryDelays: [0, 1000, 3000, 5000],
      chunkSize: 5 * 1024 * 1024,  // 5MB chunks
      metadata: {
        filename: file.name,
        filetype: file.type,
        candidateId,
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        setProgress((bytesUploaded / bytesTotal) * 100);
      },
      onSuccess: () => {
        console.log('Upload complete');
      },
      onError: (error) => {
        // Resume automatique après erreur réseau
        if (error.originalResponse?.status === 503) {
          setTimeout(() => uploadRef.current?.start(), 3000);
        }
      },
    });

    uploadRef.current.start();
  }, [candidateId]);

  return { upload, progress, cancel: () => uploadRef.current?.abort() };
}
```

### 4.3 Optimistic Updates avec Redux

```typescript
// libs/ui/context/slices/candidateInteractionsSlice.ts
const candidateInteractionsSlice = createSlice({
  name: 'candidateInteractions',
  initialState: {
    candidates: {} as Record<string, CandidateInteraction>,
    error: null as string | null,
  },
  reducers: {
    // Optimistic update immédiat
    toggleLikeOptimistic: (state, action: PayloadAction<{ candidateId: string }>) => {
      const { candidateId } = action.payload;
      const candidate = state.candidates[candidateId];

      if (candidate) {
        candidate.isLiked = !candidate.isLiked;
        candidate.likesCount += candidate.isLiked ? 1 : -1;
      }
    },

    // Rollback en cas d'erreur
    toggleLikeRollback: (state, action: PayloadAction<{ candidateId: string }>) => {
      const { candidateId } = action.payload;
      const candidate = state.candidates[candidateId];

      if (candidate) {
        candidate.isLiked = !candidate.isLiked;
        candidate.likesCount += candidate.isLiked ? 1 : -1;
      }
    },
  },
});

// Usage dans un hook
export function useCandidateInteractions(candidateId: string) {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useToggleLikeMutation();

  const toggleLike = useCallback(async () => {
    // 1. Optimistic update
    dispatch(toggleLikeOptimistic({ candidateId }));

    try {
      // 2. API call
      await mutateAsync({ candidateId });
    } catch (error) {
      // 3. Rollback si erreur
      dispatch(toggleLikeRollback({ candidateId }));
      throw error;
    }
  }, [candidateId, dispatch, mutateAsync]);

  return { toggleLike };
}
```

### 4.4 Middleware Auth avec JWT Server-Side

```typescript
// apps/web/middleware.ts
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('wToken')?.value;

  // Routes publiques
  const publicPaths = ['/login', '/register', '/coming-soon'];
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Vérification JWT côté serveur avec jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);

    if (payload.access !== 'site') {
      throw new Error('Invalid token type');
    }

    // Check maintenance mode avec cache 5min
    const maintenanceMode = await checkMaintenanceMode();
    if (maintenanceMode && !request.nextUrl.pathname.startsWith('/maintenance')) {
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Token invalide ou expiré
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('wToken');
    return response;
  }
}
```

### 4.5 API Layer Auto-Générée (OpenAPI)

```typescript
// libs/network-layer/src/lib/requests/core/OpenAPI.ts
export const OpenAPI: OpenAPIConfig = {
  BASE: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3011',
  WITH_CREDENTIALS: true,
  CREDENTIALS: 'include',
  TOKEN: async () => {
    if (typeof window === 'undefined') return undefined;
    return localStorage.getItem('wToken') || undefined;
  },
};

// Généré automatiquement depuis le schema OpenAPI du backend
// libs/network-layer/src/lib/requests/services/ApplicationService.ts
export class ApplicationService {
  public static async getApplications(
    params: GetApplicationsParams
  ): CancelablePromise<PaginatedApplicationResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/applications',
      query: {
        page: params.page,
        limit: params.limit,
        status: params.status,
      },
    });
  }
}

// Hook généré avec React Query
export function useGetApplications(params: GetApplicationsParams) {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: () => ApplicationService.getApplications(params),
  });
}
```

### 4.6 Session Management Safari-Safe

```typescript
// libs/ui/hooks/useSession.ts
export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      // Gestion Safari Private Mode
      let token: string | null = null;
      try {
        token = localStorage.getItem('wToken');
      } catch (storageError) {
        console.warn('Safari Private Mode: localStorage inaccessible');
        return { data: undefined, status: 'unauthenticated' };
      }

      if (!token) {
        return { data: undefined, status: 'unauthenticated' };
      }

      try {
        const user = await AuthService.getMe();

        // Détection compte banni
        if (user.status === UserStatus.BANNED) {
          window.location.href = '/banned';
          return { data: undefined, status: 'banned' };
        }

        return { data: user, status: 'authenticated' };
      } catch (error: any) {
        // Préserver le status HTTP pour gestion fine
        error.httpStatus = error.response?.status;
        throw error;
      }
    },
    retry: (failureCount, error: any) => {
      // Pas de retry sur 401/403
      if (error?.httpStatus === 401 || error?.httpStatus === 403) return false;
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000,
  });
}
```

---

## 5. AI/ML Backend - FastAPI & LangChain

### 5.1 Multi-Agent Orchestration avec LangGraph

**Architecture Supervisor-Router** avec 6+ agents spécialisés :

```python
# apps/fastapi-ai-agent/backend/langgraph_agent.py

from langgraph.graph import StateGraph, MessagesState
from langgraph.types import Command

class Router(TypedDict):
    """Décision de routage structurée."""
    next: Literal[
        "legal_assistant",      # Droit du travail
        "work_assistant",       # Emploi général
        "assistant_improvement",# Coaching carrière
        "assistant_widgets",    # Optimisation profil
        "assistant_summarize",  # Scoring compatibilité
        "possible_jobs",        # Recommandations postes
        "assistant_scope",      # Hors sujet
    ]

async def supervisor_node(state: MessagesState, config: RunnableConfig) -> Command:
    """
    Supervisor qui route vers l'agent approprié.
    Utilise structured output pour garantir un routage valide.
    """
    system_prompt = """Tu es un superviseur qui dirige les questions vers l'agent approprié.
    Analyse la question et choisis l'agent le plus pertinent."""

    messages = [{"role": "system", "content": system_prompt}] + state["messages"]

    # Structured output pour routage fiable
    response = await llm.with_structured_output(Router).ainvoke(messages)

    return Command(goto=response["next"])

# Construction du graphe
builder = StateGraph(MessagesState)
builder.add_node("supervisor", supervisor_node)
builder.add_node("legal_assistant", legal_assistant_node)
builder.add_node("assistant_improvement", improvement_node)
# ... autres agents

builder.add_edge(START, "supervisor")
builder.add_conditional_edges("supervisor", lambda x: x.goto)

# Checkpointer pour persistance conversation
memory = MemorySaver()
graph = builder.compile(checkpointer=memory)
```

### 5.2 Vector Search Hybride avec Weaviate

**Combinaison recherche sémantique + keyword** :

```python
# apps/fastapi-scoring-experience/backend/utils/new_weaviate_utils.py

async def hybrid_candidate_search(
    client: WeaviateAsyncClient,
    job_description: str,
    skill_requirements: List[str],
    limit: int = 50
) -> List[CandidateMatch]:
    """
    Recherche hybride: 75% sémantique + 25% keyword.
    """
    collection = client.collections.get("Candidate")

    # Construire la query d'expérience
    exp_query = f"{job_description} {' '.join(skill_requirements)}"

    results = await collection.query.hybrid(
        query=exp_query,
        query_properties=["jobTitle", "experiences", "skills"],
        target_vector="experiences",  # Vector spécifique aux expériences
        alpha=0.75,  # 75% sémantique, 25% BM25
        vector=HybridVector.near_text(
            query=exp_query,
            # Booster les concepts pertinents
            move_to=Move(force=1.0, concepts=skill_requirements),
        ),
        fusion_type=HybridFusion.RELATIVE_SCORE,
        limit=limit,
        return_metadata=MetadataQuery(score=True, explain_score=True),
    )

    return [
        CandidateMatch(
            id=obj.uuid,
            score=obj.metadata.score,
            explanation=obj.metadata.explain_score,
            data=obj.properties,
        )
        for obj in results.objects
    ]
```

### 5.3 Scoring Multi-Dimensionnel

**Système de scoring à 10 dimensions** :

```python
# apps/fastapi-ai-agent/backend/tools/scoring_tools.py

class ExperienceScore(BaseModel):
    """Score détaillé d'une expérience professionnelle."""
    pertinence: float       # 0-25: Pertinence du titre
    contract: float         # 0-10: Type de contrat
    duration: float         # 0-15: Durée d'expérience
    skills: float           # 0-20: Compétences acquises
    responsibilities: float # 0-10: Niveau de responsabilité
    complexity: float       # 0-10: Complexité des projets
    recency: float          # 0-10: Récence de l'expérience
    sum: float              # 0-100: Score total

    # Coefficients de pondération
    coefficient_pertinence: float  # 0-1: Multiplicateur contexte
    coefficient_recency: float     # 0-1: Multiplicateur temporel

class OverallScore(BaseModel):
    """Score global du candidat."""
    final_score: float
    reliability_index: Literal["HIGH", "MEDIUM", "LOW"]
    career_progression: float   # 0-10: Évolution de carrière
    path_coherence: float       # -5 à 5: Cohérence du parcours
    total_experiences_bonus: float  # 0-5: Bonus expériences
    missing_info_penalty: float     # 0-20: Pénalité infos manquantes
```

### 5.4 Prompt Engineering Conditionnel

**4 chemins de prompts** selon les données disponibles :

```python
# apps/fastapi-scoring-experience/backend/chain_functions/score_exp.py

async def score_experience(
    experience: dict,
    job_details: Optional[dict],
    achievements: Optional[List[str]],
    user_id: str
) -> ExperienceScore:
    """
    Scoring avec sélection dynamique du prompt.
    """
    # Sélection du prompt selon les données
    if achievements and job_details:
        prompt = PROMPT_WITH_ACHIEVEMENTS_AND_JOB
    elif achievements:
        prompt = PROMPT_WITH_ACHIEVEMENTS_ONLY
    elif job_details:
        prompt = PROMPT_WITH_JOB_ONLY
    else:
        prompt = PROMPT_BASIC

    # Parser avec retry automatique
    parser = JsonOutputParser(pydantic_object=ExperienceScore)
    retry_parser = RetryOutputParser.from_llm(
        parser=parser,
        llm=llm,
        max_retries=3,
    )

    chain = (
        RunnableParallel(
            prompt_value=prompt,
            completion=prompt | llm,
        )
        | RunnableLambda(
            lambda x: retry_parser.parse_with_prompt(
                x["completion"].content,
                x["prompt_value"]
            )
        )
    )

    # Invocation avec tracing Langfuse
    result = await chain.ainvoke(
        {"experience": experience, "job": job_details, "achievements": achievements},
        config={
            "callbacks": [langfuse_handler],
            "metadata": {
                "langfuse_user_id": user_id,
                "langfuse_tags": ["scoring", "experience"],
            },
        },
    )

    return result
```

### 5.5 Déduplication Intelligente des Réalisations

```python
# apps/fastapi-scoring-experience/backend/chain_functions/achievements_extraction.py

def filter_duplicate_achievements(
    new_achievements: List[str],
    existing_achievements: List[str],
    threshold: float = 0.7
) -> List[str]:
    """
    Filtre les doublons par similarité textuelle.
    Seuil de 70% pour éviter les faux positifs.
    """
    filtered = []

    for new_ach in new_achievements:
        is_duplicate = False
        normalized_new = normalize_text(new_ach)

        for existing in existing_achievements:
            normalized_existing = normalize_text(existing)

            # Match exact
            if normalized_new == normalized_existing:
                is_duplicate = True
                break

            # Similarité par overlap de mots
            similarity = word_overlap_ratio(normalized_new, normalized_existing)
            if similarity >= threshold:
                is_duplicate = True
                break

        if not is_duplicate:
            filtered.append(new_ach)

    return filtered

def word_overlap_ratio(text1: str, text2: str) -> float:
    """Ratio d'intersection des mots."""
    words1 = set(text1.split())
    words2 = set(text2.split())
    intersection = words1 & words2
    return len(intersection) / min(len(words1), len(words2))
```

### 5.6 Tool Calling avec Context Database

```python
# apps/fastapi-ai-agent/backend/tools/agent_tools.py

@tool
def get_top_matches(config: RunnableConfig) -> List[dict]:
    """
    Récupère les meilleurs matchs de postes pour le candidat.
    Intégration directe PostgreSQL dans le tool LangChain.
    """
    candidate_id = config.get("configurable", {}).get("candidate_id")

    if not candidate_id:
        return []

    # Connexion DB dans le contexte du tool
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cursor = conn.cursor()

    query = """
        SELECT
            j.id, j.title, j.description,
            m.score, m.explanation
        FROM matches m
        JOIN jobs j ON m.job_id = j.id
        WHERE m.candidate_id = %s
        ORDER BY m.score DESC
        LIMIT 10
    """

    cursor.execute(query, (candidate_id,))
    results = cursor.fetchall()

    conn.close()

    return [
        {
            "job_id": r[0],
            "title": r[1],
            "description": r[2][:200],
            "score": r[3],
            "explanation": r[4],
        }
        for r in results
    ]

@tool
def search_legal_info(query: str, config: RunnableConfig) -> str:
    """
    Recherche d'informations juridiques via Tavily.
    Spécialisé droit du travail français.
    """
    search = TavilySearchResults(
        max_results=5,
        search_depth="advanced",
        include_domains=["legifrance.gouv.fr", "service-public.fr"],
    )

    results = search.invoke(f"droit du travail france {query}")

    return "\n\n".join([
        f"Source: {r['url']}\n{r['content']}"
        for r in results
    ])
```

### 5.7 WebSocket Streaming Real-Time

```python
# apps/fastapi-ai-agent/backend/web_socket_routes.py

@websocket_router.websocket("/ws/chat/")
async def chat_websocket(websocket: WebSocket):
    """
    WebSocket pour streaming des réponses LLM.
    """
    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_json()

            # Configuration du graphe avec context utilisateur
            config = {
                "configurable": {
                    "thread_id": data["thread_id"],
                    "candidate_id": data.get("candidate_id"),
                    "user_type": data.get("user_type", "candidate"),
                }
            }

            # Streaming token par token
            async for event in graph.astream_events(
                {"messages": [HumanMessage(content=data["message"])]},
                config=config,
                version="v2",
            ):
                if event["event"] == "on_chat_model_stream":
                    chunk = event["data"]["chunk"]
                    if chunk.content:
                        await websocket.send_json({
                            "type": "token",
                            "content": chunk.content,
                        })

                elif event["event"] == "on_tool_start":
                    await websocket.send_json({
                        "type": "tool_start",
                        "tool": event["name"],
                    })

            await websocket.send_json({"type": "complete"})

    except WebSocketDisconnect:
        logger.info("Client disconnected")
```

---

## 6. Admin Dashboard

### 6.1 Architecture Admin

**Application séparée** (React + Vite) avec accès à l'API NestJS :

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD (Port 4201)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  40+ PAGES ADMIN                         │    │
│  │                                                          │    │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │    │
│  │  │ Users        │ │ Companies    │ │ Jobs         │    │    │
│  │  │ Management   │ │ Management   │ │ Management   │    │    │
│  │  └──────────────┘ └──────────────┘ └──────────────┘    │    │
│  │                                                          │    │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │    │
│  │  │ Payment      │ │ Analytics    │ │ Email        │    │    │
│  │  │ Audit & Mgmt │ │ Dashboard    │ │ Templates    │    │    │
│  │  └──────────────┘ └──────────────┘ └──────────────┘    │    │
│  │                                                          │    │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │    │
│  │  │ Video        │ │ Feature      │ │ Content      │    │    │
│  │  │ Moderation   │ │ Audit Logs   │ │ Management   │    │    │
│  │  └──────────────┘ └──────────────┘ └──────────────┘    │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Authentication: JWT Admin Token (séparé des users)             │
│  Roles: ADMIN | SUPER_ADMIN                                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Modules Admin Backend (NestJS)

**Controllers dédiés** avec RBAC multi-niveau :

```typescript
// modules/admin/admin.controller.ts

@Controller('admin')
@UseGuards(AdminJwtGuard)  // JWT spécifique admin
export class AdminController {

  // Dashboard statistics
  @Get('stats')
  async getDashboardStats(): Promise<DashboardStats> {
    return {
      totalCandidates: await this.countCandidates(),
      totalCompanies: await this.countCompanies(),
      totalJobs: await this.countJobs(),
      recentUploads: await this.getRecentUploads(),
      systemHealth: await this.checkSystemHealth(),
    };
  }

  // System health monitoring
  @Get('health')
  async getSystemHealth(): Promise<SystemHealth> {
    return {
      status: 'operational',
      services: [
        { name: 'PostgreSQL', status: 'healthy', responseTime: 12 },
        { name: 'MongoDB', status: 'healthy', responseTime: 8 },
        { name: 'Redis', status: 'healthy', responseTime: 2 },
        { name: 'Elasticsearch', status: 'healthy', responseTime: 15 },
      ],
      lastChecked: new Date(),
    };
  }
}

// Super Admin only operations
@Controller('admin/management')
@UseGuards(AdminJwtGuard, SuperAdminGuard)
export class AdminManagementController {

  @Post('admins')
  @ApiOperation({ summary: 'Create new admin (Super Admin only)' })
  async createAdmin(@Body() dto: CreateAdminDto): Promise<Admin> {
    // Seuls les Super Admins peuvent créer d'autres admins
  }

  @Get('logs')
  async getActionLogs(@Query() query: PaginationDto): Promise<PaginatedLogs> {
    // Audit trail de toutes les actions admin
  }
}
```

### 6.3 Fonctionnalités Admin Clés

#### A. Payment Management

```typescript
// modules/payments/controllers/payment-admin.controller.ts

@Controller('admin/payments')
@UseGuards(AdminJwtGuard)
export class PaymentAdminController {

  // Audit logs avec pagination
  @Get('audit-logs')
  async getAuditLogs(
    @Query('page') page = 1,
    @Query('limit') limit = 50,
    @Query('status') status?: PaymentAuditStatus,
  ) {
    return this.paymentAuditService.getPaginatedLogs({ page, limit, status });
  }

  // Statistiques de paiement
  @Get('audit-logs/stats')
  async getAuditStats() {
    return {
      totalProcessed: await this.countByStatus('PROCESSED'),
      totalPending: await this.countByStatus('PENDING'),
      totalFailed: await this.countByStatus('FAILED'),
      totalRevenue: await this.calculateTotalRevenue(),
      revenueByDay: await this.getRevenueTimeline(),
    };
  }

  // Retry manuel des paiements échoués
  @Post('audit-logs/:id/retry')
  async retryPayment(@Param('id') id: string) {
    return this.paymentRetryService.manualRetry(id);
  }

  // Ajustement manuel du budget
  @Post('balances/:jobId/adjust')
  async adjustBalance(
    @Param('jobId') jobId: string,
    @Body() dto: AdjustBalanceDto,
  ) {
    // Audit log automatique de l'ajustement
    return this.balanceService.adjust(jobId, dto.amount, dto.reason);
  }
}
```

#### B. Email Notification Management

```typescript
// modules/mail/controllers/mail-admin.controller.ts

@Controller('admin/mail/notifications')
@UseGuards(AdminJwtGuard)
export class MailAdminController {

  // Dual Control: Admin defaults + User preferences
  @Get('defaults')
  async getGlobalDefaults(): Promise<EmailNotificationDefaults> {
    // 10 types d'emails en 6 catégories
    return this.emailService.getAdminDefaults();
  }

  @Put('defaults')
  async updateDefaults(@Body() dto: UpdateDefaultsDto) {
    // Persiste dans MongoDB: email_notification_defaults
  }

  // Template management
  @Get('templates')
  async getTemplates() {
    return this.templateService.getAllTemplates();
  }

  @Put('templates/:emailType')
  async updateTemplate(
    @Param('emailType') type: string,
    @Body() dto: { subject: string; htmlContent: string },
  ) {
    return this.templateService.updateTemplate(type, dto);
  }

  // Preview & Test
  @Post('templates/:emailType/preview')
  async previewTemplate(@Param('emailType') type: string) {
    return this.templateService.renderPreview(type);
  }

  @Post('templates/:emailType/test')
  async sendTestEmail(
    @Param('emailType') type: string,
    @Body() dto: { email: string },
  ) {
    return this.emailService.sendTestEmail(type, dto.email);
  }
}
```

#### C. Feature Audit System

```typescript
// modules/features-audit/controllers/feature-audit-admin.controller.ts

// 40+ types de features trackées
enum FeatureType {
  USER_LOGIN = 'USER_LOGIN',
  JOB_CREATED = 'JOB_CREATED',
  APPLICATION_SENT = 'APPLICATION_SENT',
  VIDEO_UPLOADED = 'VIDEO_UPLOADED',
  PAYMENT_PROCESSED = 'PAYMENT_PROCESSED',
  AI_MATCHING_USED = 'AI_MATCHING_USED',
  // ... 34+ autres
}

@Controller('admin/features-audit')
export class FeatureAuditAdminController {

  @Get('logs')
  async getLogs(@Query() query: FeatureAuditQueryDto) {
    // Filtrage par feature, user, date range
    return this.auditService.getPaginatedLogs(query);
  }

  @Get('statistics')
  async getStatistics(@Query('dateFrom') from: string, @Query('dateTo') to: string) {
    return {
      featureUsage: await this.getUsageByFeature(from, to),
      userActivity: await this.getActiveUsers(from, to),
      peakHours: await this.getPeakUsageHours(from, to),
      trends: await this.getUsageTrends(from, to),
    };
  }

  // Alertes configurables
  @Post('alerts')
  async configureAlert(@Body() dto: AlertConfigDto) {
    // Ex: Alerte si > 100 erreurs de paiement en 1h
  }
}
```

#### D. Video Moderation (AI-Powered)

```typescript
// modules/moderation/controllers/moderation-admin.controller.ts

@Controller('admin/moderation')
export class ModerationAdminController {

  // Contenu bloqué par l'IA
  @Get('blocked-content')
  async getBlockedContent(@Query() query: PaginationDto) {
    return this.moderationService.getBlockedContent(query);
  }

  // Résultats de modération IA
  @Get('moderation-results')
  async getModerationResults(@Query('status') status?: 'pending' | 'approved' | 'rejected') {
    return this.moderationService.getResults(status);
  }

  // Review manuel
  @Patch('moderation-results/:id')
  async reviewContent(
    @Param('id') id: string,
    @Body() dto: { decision: 'approve' | 'reject'; reason?: string },
    @CurrentAdmin() admin: Admin,
  ) {
    // Log de la décision admin
    return this.moderationService.review(id, dto, admin.id);
  }

  // URL présignée pour contenu privé
  @Get('moderation-results/:id/file-url')
  async getFileUrl(@Param('id') id: string) {
    // CloudFront presigned URL (expire en 1h)
    return this.s3Service.getPresignedUrl(id);
  }
}
```

### 6.4 Admin Action Logging

**Audit trail complet** de toutes les actions admin :

```typescript
// entities/admin-action-log.entity.ts

@Entity('admin_action_logs')
export class AdminActionLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Admin)
  admin: Admin;

  @Column({ type: 'enum', enum: AdminActionType })
  actionType: AdminActionType;

  @Column()
  resourceType: string;  // 'user', 'job', 'company', 'payment'

  @Column({ nullable: true })
  resourceId: string;

  @Column({ nullable: true })
  resourceName: string;

  @Column('jsonb', { nullable: true })
  metadata: {
    oldValues?: Record<string, any>;
    newValues?: Record<string, any>;
    reason?: string;
  };

  @Column({ default: true })
  success: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

// Enum des actions trackées
enum AdminActionType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  BAN_USER = 'BAN_USER',
  UNBAN_USER = 'UNBAN_USER',
  ADJUST_BALANCE = 'ADJUST_BALANCE',
  RETRY_PAYMENT = 'RETRY_PAYMENT',
  APPROVE_CONTENT = 'APPROVE_CONTENT',
  REJECT_CONTENT = 'REJECT_CONTENT',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  CREATE_ADMIN = 'CREATE_ADMIN',
  // ... 20+ actions
}
```

### 6.5 Analytics Dashboard

```typescript
// modules/analytics/controllers/analytics-admin.controller.ts

@Controller('admin/analytics')
export class AnalyticsAdminController {

  @Get('summary')
  async getSummary(@Query('period') period: '7d' | '30d' | '90d') {
    return {
      visitors: {
        total: 15420,
        unique: 8930,
        returning: 6490,
        trend: '+12%',
      },
      pageViews: {
        total: 89500,
        avgPerSession: 5.8,
        bounceRate: '32%',
      },
      topPages: await this.getTopPages(period),
      deviceBreakdown: await this.getDeviceStats(period),
    };
  }

  @Get('traffic-breakdown')
  async getTrafficBreakdown() {
    return {
      byDevice: { mobile: 62, desktop: 35, tablet: 3 },
      byBrowser: { chrome: 58, safari: 25, firefox: 12, other: 5 },
      byOS: { ios: 35, android: 27, windows: 25, macos: 10, other: 3 },
    };
  }

  @Get('visitor-sessions/:ipAddress')
  async getVisitorSessions(@Param('ipAddress') ip: string) {
    // Détail des sessions d'un visiteur (GDPR compliant)
    return this.analyticsService.getSessionsByIp(ip);
  }
}
```

### 6.6 Sécurité Admin

```typescript
// guards/super-admin.guard.ts

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const admin = request.admin;

    if (admin.role !== AdminRole.SUPER_ADMIN) {
      throw new ForbiddenException('Super Admin access required');
    }

    return true;
  }
}

// decorators/current-admin.decorator.ts
export const CurrentAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Admin => {
    const request = ctx.switchToHttp().getRequest();
    return request.admin;
  },
);
```

### 6.7 Endpoints Admin Résumé

| Catégorie | Endpoints | Description |
|-----------|-----------|-------------|
| **Dashboard** | `GET /admin/stats`, `/health` | Stats globales, santé système |
| **Users** | `GET/PUT/DELETE /admin/users/*` | CRUD users, ban/unban |
| **Payments** | `GET /admin/payments/audit-logs/*` | Audit, stats, retry, adjust |
| **Mail** | `GET/PUT /admin/mail/notifications/*` | Templates, defaults, test |
| **Features** | `GET /admin/features-audit/*` | Logs, statistics, alerts |
| **Moderation** | `GET/PATCH /admin/moderation/*` | Review, block/unblock |
| **Analytics** | `GET /admin/analytics/*` | Traffic, visitors, pages |
| **Management** | `POST/PUT/DELETE /admin/management/*` | Admin CRUD (Super Admin) |

---

## 7. Points Clés pour Entretiens

### Architecture & Design Patterns

| Pattern | Implémentation | Bénéfice |
|---------|---------------|----------|
| **Event Sourcing** | Kafka + MongoDB audit logs | Traçabilité complète, replay possible |
| **CQRS** | Read models optimisés, write via events | Performance lecture, cohérence écriture |
| **Strategy** | Calendriers multi-providers | Extensibilité sans modification |
| **Circuit Breaker** | Fallback MongoDB si Kafka down | Résilience système |
| **Optimistic Locking** | Redux optimistic updates | UX fluide, rollback si erreur |

### Performance & Scalabilité

| Technique | Contexte | Impact |
|-----------|----------|--------|
| **Query Builder N+1** | TypeORM joins optimisés | -80% requêtes DB |
| **Redis Pub/Sub** | Socket.IO scaling | Horizontal scaling WebSockets |
| **React Query Cache** | 5min stale, 30min cache | -70% appels API |
| **Tus Protocol** | Upload vidéo résumable | Fiabilité sur réseaux instables |
| **Hybrid Vector Search** | Weaviate 75/25 semantic/keyword | Pertinence + précision |

### Sécurité & Fiabilité

| Mesure | Implémentation |
|--------|----------------|
| **JWT Server-Side** | Middleware Next.js avec jose |
| **RBAC Multi-niveau** | User roles + Company roles |
| **Rate Limiting** | Custom decorator + Redis |
| **Audit Trail** | Write-ahead log MongoDB |
| **OAuth Token Refresh** | Strategy pattern automatique |

### AI/ML Engineering

| Technique | Utilisation |
|-----------|-------------|
| **LangGraph Agents** | Orchestration multi-agents supervisée |
| **Structured Output** | Routage fiable avec Pydantic |
| **Retry Parser** | Robustesse parsing LLM |
| **Langfuse Tracing** | Observabilité chaînes LLM |
| **Hybrid Search** | Combinaison BM25 + embeddings |

### Questions Fréquentes Entretiens

1. **"Comment gérez-vous les transactions distribuées ?"**
   > Write-ahead log MongoDB + Kafka events avec retry automatique. Si le payment-service est down, les actions sont loguées et rejouées.

2. **"Comment scalez-vous les WebSockets ?"**
   > Redis adapter pour Socket.IO permettant le scaling horizontal. Chaque instance partage l'état via pub/sub.

3. **"Comment évitez-vous les N+1 queries ?"**
   > Query Builder TypeORM avec leftJoinAndSelect explicites et projection sélective des champs.

4. **"Comment gérez-vous l'état côté client ?"**
   > Redux Toolkit pour état global (auth, collaboration), React Query pour cache serveur avec invalidation intelligente.

5. **"Comment routez-vous vers le bon agent AI ?"**
   > LangGraph supervisor avec structured output. Le LLM retourne un enum typé, garantissant un routage valide.

---

## Conclusion

Ce projet démontre une maîtrise de :
- **Architecture microservices** avec communication event-driven
- **Patterns de résilience** (circuit breaker, retry, fallback)
- **Optimisation performance** (caching multi-niveaux, query optimization)
- **AI/ML engineering** (agents LLM, vector search, scoring)
- **Bonnes pratiques** (TypeScript strict, tests, monitoring)

La combinaison NestJS + Next.js + FastAPI/LangChain offre une stack moderne et performante pour une plateforme de recrutement intelligente.
