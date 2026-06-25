export const APPS = {
  GATEWAY: 'gateway',
  AUTH: 'auth',
  COURSES: 'courses',
  LESSONS: 'lessons',
  USERS: 'users',
  NOTIFICATIONS: 'notifications',
};

export const MESSAGES = {
  USERS: {
    CREATED: 'users:created',
  },
  AUTH: {
    SIGN_UP: 'auth:sign-up',
  },
  NOTIFICATIONS: {
    SEND_EMAIL: 'notifications:send-email',
  },
} as const;

export const QUEUES = {
  USERS: 'users:queue',
  COURSES: 'courses:queue',
  AUTH: 'auth:queue',
  NOTIFICATIONS: 'notifications:queue',
  LESSONS: 'lessons:queue',
  NOTIFICATIONS_RETRY: 'notifications.retry.queue',
  NOTIFICATIONS_DEAD: 'notifications.dead.queue',
} as const;

export const EXCHANGES = {
  NOTIFICATIONS: 'notifications.exchange',
  NOTIFICATIONS_RETRY: 'notifications.retry.exchange',
  NOTIFICATIONS_DEAD: 'notifications.dead.exchange',
} as const;

export const EMAIL_ROUTING_KEYS = {
  SEND_EMAIL: 'email.send',
  EMAIL_RETRY_500: 'email.retry.500',
  EMAIL_DEAD: 'email.dead',
} as const;
