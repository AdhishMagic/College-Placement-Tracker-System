import axiosInstance from '../../services/api';

/**
 * Mock API for Company Profile Management
 * Simulates fetching and updating the recruiter's company profile
 */

const mockCompanyProfile = {
    id: 'comp_001',
    overview: {
        companyName: 'Tech Innovators Inc.',
        logoUrl: 'https://ui-avatars.com/api/?name=Tech+Innovators&background=0D8ABC&color=fff&size=200',
        industry: 'Software & Technology',
        companySize: '1000-5000',
        website: 'https://techinnovators.example.com'
    },
    basicInfo: {
        companyName: 'Tech Innovators Inc.',
        industry: 'Software & Technology',
        headquarters: 'San Francisco, CA',
        contactEmail: 'careers@techinnovators.example.com',
        contactPhone: '+1 (555) 123-4567'
    },
    about: {
        description: 'Tech Innovators Inc. is a leading global software provider specializing in cloud computing, artificial intelligence, and cutting-edge web infrastructure. We value engineering excellence and seek top-tier talent from elite institutions worldwide to drive our next generation of products.'
    },
    hiringPreferences: {
        departments: ['Computer Science', 'Information Technology', 'Electronics'],
        minCGPA: 8.0,
        backlogTolerance: 0,
        preferredSkills: ['React', 'Node.js', 'Python', 'AWS', 'System Design']
    }
};

const companyProfileAPI = {
    getProfile: async () => {
        // Return mock data after 800ms delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: { profile: mockCompanyProfile } });
            }, 800);
        });
    },

    updateProfile: async (profileData) => {
        // Return success after 1000ms delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: { profile: profileData, message: 'Profile updated successfully' } });
            }, 1000);
        });
    },

    uploadLogo: async (file) => {
        // Mock logo upload returning a new URL
        return new Promise((resolve) => {
            setTimeout(() => {
                const url = URL.createObjectURL(file);
                resolve({ data: { logoUrl: url } });
            }, 1000);
        });
    }
};

export default companyProfileAPI;
