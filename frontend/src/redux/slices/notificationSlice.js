import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock fetching notifications
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchAll',
    async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        type: 'Application Shortlisted',
                        category: 'Applications',
                        title: 'Shortlisted for Google SWE',
                        description: 'Congratulations! Your application for Software Engineer at Google has been shortlisted. Please check the portal for next steps.',
                        timestamp: new Date().toISOString(),
                        isRead: false,
                        actionLink: '/student/applications/google-swe',
                        actionText: 'View Application',
                    },
                    {
                        id: '2',
                        type: 'Interview Scheduled',
                        category: 'Interviews',
                        title: 'Microsoft Technical Round Scheduled',
                        description: 'Your technical round with Microsoft has been scheduled for tomorrow at 10:00 AM. Access the meeting link below.',
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        isRead: false,
                        actionLink: '/student/interviews/123',
                        actionText: 'View Schedule',
                    },
                    {
                        id: '3',
                        type: 'System Alerts',
                        category: 'System',
                        title: 'Profile Incomplete: Upload Resume',
                        description: 'Your profile is missing an updated resume. Please upload your latest resume to apply for upcoming placement drives.',
                        timestamp: new Date(Date.now() - 86400000).toISOString(),
                        isRead: true,
                        actionLink: '/student/resume',
                        actionText: 'Update Resume',
                    },
                    {
                        id: '4',
                        type: 'Offer Released',
                        category: 'Offers',
                        title: 'Amazon Job Offer',
                        description: 'You have received an offer from Amazon! Review the offer letter details carefully before accepting.',
                        timestamp: new Date(Date.now() - 172800000).toISOString(),
                        isRead: true,
                        actionLink: '/student/offers/amazon',
                        actionText: 'View Offer Letter',
                    },
                ]);
            }, 1000);
        });
    }
);

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    unreadCount: 0,
    todaysCount: 0,
    alertCount: 0,
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        markAsRead(state, action) {
            const id = action.payload;
            const existingNotification = state.items.find((n) => n.id === id);
            if (existingNotification && !existingNotification.isRead) {
                existingNotification.isRead = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        markAllAsRead(state) {
            state.items.forEach((item) => {
                item.isRead = true;
            });
            state.unreadCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;

                // Compute derived stats
                state.unreadCount = state.items.filter((i) => !i.isRead).length;

                const today = new Date();
                state.todaysCount = state.items.filter((i) => {
                    const itemDate = new Date(i.timestamp);
                    return itemDate.toDateString() === today.toDateString();
                }).length;

                state.alertCount = state.items.filter((i) => i.category === 'System').length;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { markAsRead, markAllAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;
