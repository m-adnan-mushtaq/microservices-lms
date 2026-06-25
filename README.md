<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

Welcome to my first open-source microservices project! Here, I’m developing an AI-powered Learning Management System (LMS) using modern architectural patterns such as microservices, dead-letter queues (DLQ), and Sagas—all built with NestJS, with Python integration coming soon. I'm excited to learn, build, and share this journey with you!

DLQ Pattern Implemented for Notifications

Below is an overview of the notification Dead Letter Queue (DLQ) message flow:

```
notification.exchange
    └─(routing key: email.send)──▶ email.main.queue
                                      │
                                     fail
                                      ▼
                        email.retry.500.exchange
                                      │
                                      ▼
                           email.retry.500.queue
                                      │
                                (TTL 500ms)
                                      ▼
notification.exchange
    └─(routing key: email.send)──▶ email.main.queue
                                      │
                             fail again (up to 3 retries)
                                      ▼
                                 email.dlx
    └─(routing key: email.dead)──▶ email.dead.queue
```

Made with ❤️ by Adnan Mushtaq
