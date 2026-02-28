import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationsAPI from './notificationsAPI';

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (params, { rejectWithValue }) => {
        try {
            const response = await notificationsAPI.getAll(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch notifications' });
        }
    }
);

export const markNotificationRead = createAsyncThunk(
    'notifications/markRead',
    async (id, { rejectWithValue }) => {
        try {
            const response = await notificationsAPI.markRead(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to mark notification' });
        }
    }
);

const initialState = {
    list: [],
    unreadCount: 0,
    loading: false,
    error: null,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.list.unshift(action.payload);
            state.unreadCount += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.list = action.payload.notifications || [];
                state.unreadCount = action.payload.unreadCount || 0;
                state.loading = false;
            })
            .addCase(markNotificationRead.fulfilled, (state, action) => {
                const id = action.payload.id;
                const notification = state.list.find((n) => n.id === id);
                if (notification) {
                    notification.read = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            });
    },
});

export const { addNotification } = notificationsSlice.actions;
export const selectNotifications = (state) => state.notifications.list;
export const selectUnreadCount = (state) => state.notifications.unreadCount;

export default notificationsSlice.reducer;
