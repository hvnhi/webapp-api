export const JWT_CONSTANTS = {
  JWT_SECRET:
    'uT9xCkVqpgRXiTQi51Bnxtowq5y1ciNV34mAmjv3dG8G8VfygilKoTOs3p8Z6OYD',
  JWT_EXPIRATION_TIME: '60s',
};

export enum USER_STATUS {
  INACTIVE = 1,
  ACTIVE = 2,
  SPAM = 3,
  BANNED = 4,
  TRASH = 5,
}

export enum USER_ROLE {
  USER = 0,
  DEV = 1,
  LEADER = 2,
  DEPUTY = 3,
  ADMIN = 4,
}

export const API_KEY = [
  { name: 'api', key: '4TKy2e72nJeAfHYCp6bQcsmin6Q0vKPD' },
];
