export enum ProductCategory {
  ALL = 'All',
  GRILL = 'Grill',
  HOT_DISHES = 'HotDishes',
  COLD_DISHES = 'ColdDishes', // add to sidebar
  DRINKS = 'Drinks',
  DESSERTS = 'Desserts',
  SALADS = 'Salads',
  SOUPS = 'Soups',
}

export enum ErrorType {
  NULL = 'Null',
  NETWORK_ERROR = 'NetworkError',
  SERVER_ERROR = 'ServerError',
  AUTH_ERROR = 'AuthError',
  VALIDATION_ERROR = 'ValidationError',
}

export enum Stage {
  LOGIN = 'Login',
  REGISTER = 'Register',
  FORGOT_PASSWORD = 'ForgotPassword',
  RESET_PASSWORD = 'ResetPassword',
  PROFILE = 'Profile',
}
