import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';

// Define the state interfaces
interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; phone: string } | null;
}

interface PostsState {
  posts: Post[];
}

interface StoreState {
  auth: AuthState;
  posts: PostsState;
}

// Load state from localStorage
const loadState = (): Partial<StoreState> | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: StoreState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('Failed to save state:', err);
  }
};

// Create the Redux store with preloaded state
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
  preloadedState: loadState(),
});

// Subscribe to store changes and save the state
store.subscribe(() => {
  saveState(store.getState() as StoreState); // Ensure the state matches StoreState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
