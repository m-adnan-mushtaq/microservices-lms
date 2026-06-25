export const APPS = {
  GATEWAY: 'gateway',
  AUTH: 'auth',
  COURSES: 'courses',
  LESSONS: 'lessons',
  USERS: 'users',
};

export const MESSAGES = {
  USERS: {
    CREATED: 'users:created',
  },
  AUTH: {
    SIGN_UP: 'auth:sign-up',
  },
} as const;

export const QUEUES = {
  USERS: 'users:queue',
  COURSES: 'courses:queue',
  AUTH: 'auth:queue',
  NOTIFICATIONS: 'notifications:queue',
  LESSONS: 'lessons:queue',
} as const;
