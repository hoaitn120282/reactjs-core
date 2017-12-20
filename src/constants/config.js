export const APP_DOM_CONTAINER = 'root';

//API URL
export const BASE_URL = process.env.REACT_APP_ENV === 'production' ? 'http://localhost' : 'http://localhost:3000';

// ASSET URL
export const SITE_URL = process.env.REACT_APP_ENV === 'production' ? 'http://localhost' : 'http://localhost:3000';

export const DEFAULT_REDIRECT = '/dashboard';

//CLIENT_ID
export const CLIENT_ID = 1;

export const UPLOAD_MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export const GOOGLE_MAP_API_KEY = 'AIzaSyDWgwCQGoLetkP-8OFb84Dr_jjI8ogHPj8';
