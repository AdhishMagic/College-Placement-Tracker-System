import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobOverview: {
        id: "job_123",
        title: "Software Engineer",
        totalApplicants: 142,
        eligibilityCriteria: { minCgpa: 8.0, maxBacklogs: 0, requiredSkills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"] },
        stageMetrics: {
            applied: 142,
            shortlisted: 45,
            interview_1: 20,
            interview_2: 12,
            offer: 5
        }
    },
    candidates: {
        list: [
            {
                id: "cand_01",
                name: "Aarav Sharma",
                email: "aarav.sharma@example.com",
                department: "Computer Science",
                cgpa: 9.12,
                skillsCount: 5,
                totalSkillsRequired: 5,
                matchLevel: "Full",
                backlogs: 0,
                applicationDate: "2026-10-12",
                stage: "Shortlisted",
                skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"]
            },
            {
                id: "cand_02",
                name: "Priya Patel",
                email: "priya.p@example.com",
                department: "Information Technology",
                cgpa: 8.75,
                skillsCount: 3,
                totalSkillsRequired: 5,
                matchLevel: "Partial",
                backlogs: 0,
                applicationDate: "2026-10-13",
                stage: "Applied",
                skills: ["React", "Node.js", "SQL"]
            },
            {
                id: "cand_03",
                name: "Rahul Kumar",
                email: "rahul.k@example.com",
                department: "Electronics",
                cgpa: 7.9,
                skillsCount: 1,
                totalSkillsRequired: 5,
                matchLevel: "Low",
                backlogs: 1,
                applicationDate: "2026-10-14",
                stage: "Applied",
                skills: ["C++"]
            },
            {
                id: "cand_04",
                name: "Neha Gupta",
                email: "neha.g@example.com",
                department: "Computer Science",
                cgpa: 9.4,
                skillsCount: 5,
                totalSkillsRequired: 5,
                matchLevel: "Full",
                backlogs: 0,
                applicationDate: "2026-10-10",
                stage: "Interview Round 1",
                skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "AWS"]
            }
        ],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        totalRecords: 142,
        currentPage: 1,
        limit: 10
    },
    filters: {
        searchQuery: "",
        cgpaRange: [0, 10],
        department: [],
        stage: [],
        skillMatch: [],
    },
    selection: {
        selectedIds: [],
        comparisonIds: []
    },
    ui: {
        isDrawerOpen: false,
        viewMode: 'table'
    }
};

const shortlistSlice = createSlice({
    name: 'shortlist',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.filters.searchQuery = action.payload;
        },
        setCgpaRange: (state, action) => {
            state.filters.cgpaRange = action.payload;
        },
        toggleDynamicFilter: (state, action) => {
            const { type, value } = action.payload;
            const index = state.filters[type].indexOf(value);
            if (index === -1) {
                state.filters[type].push(value);
            } else {
                state.filters[type].splice(index, 1);
            }
        },
        clearAllFilters: (state) => {
            state.filters = {
                searchQuery: "",
                cgpaRange: [0, 10],
                department: [],
                stage: [],
                skillMatch: [],
            };
        },
        toggleSelection: (state, action) => {
            const candidateId = action.payload;
            const index = state.selection.selectedIds.indexOf(candidateId);
            if (index === -1) {
                state.selection.selectedIds.push(candidateId);
            } else {
                state.selection.selectedIds.splice(index, 1);
            }
        },
        selectAll: (state, action) => {
            if (action.payload) {
                state.selection.selectedIds = state.candidates.list.map(c => c.id);
            } else {
                state.selection.selectedIds = [];
            }
        },
        toggleComparison: (state, action) => {
            const candidateId = action.payload;
            const index = state.selection.comparisonIds.indexOf(candidateId);
            if (index === -1) {
                if (state.selection.comparisonIds.length < 3) {
                    state.selection.comparisonIds.push(candidateId);
                    state.ui.isDrawerOpen = true;
                }
            } else {
                state.selection.comparisonIds.splice(index, 1);
                if (state.selection.comparisonIds.length === 0) {
                    state.ui.isDrawerOpen = false;
                }
            }
        },
        setDrawerOpen: (state, action) => {
            state.ui.isDrawerOpen = action.payload;
            if (!action.payload) {
                state.selection.comparisonIds = [];
            }
        },
        updateCandidateStage: (state, action) => {
            const { id, newStage } = action.payload;
            const candidate = state.candidates.list.find(c => c.id === id);
            if (candidate) {
                candidate.stage = newStage;
            }
        },
        bulkUpdateStage: (state, action) => {
            const newStage = action.payload;
            state.candidates.list.forEach(c => {
                if (state.selection.selectedIds.includes(c.id)) {
                    c.stage = newStage;
                }
            });
            state.selection.selectedIds = [];
        },
    },
});

export const {
    setSearchQuery,
    setCgpaRange,
    toggleDynamicFilter,
    clearAllFilters,
    toggleSelection,
    selectAll,
    toggleComparison,
    setDrawerOpen,
    updateCandidateStage,
    bulkUpdateStage
} = shortlistSlice.actions;

// Selectors
export const selectJobOverview = (state) => state.shortlist.jobOverview;
// Filter candidates
export const selectFilteredCandidates = (state) => {
    let list = state.shortlist.candidates.list;
    const { searchQuery, cgpaRange, department, stage, skillMatch } = state.shortlist.filters;

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        list = list.filter(c => c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query));
    }

    list = list.filter(c => c.cgpa >= cgpaRange[0] && c.cgpa <= cgpaRange[1]);

    if (department.length > 0) {
        list = list.filter(c => department.includes(c.department));
    }

    if (stage.length > 0) {
        list = list.filter(c => stage.includes(c.stage));
    }

    if (skillMatch.length > 0) {
        list = list.filter(c => skillMatch.includes(c.matchLevel));
    }

    return list;
};

export const selectSelection = (state) => state.shortlist.selection;
export const selectFilters = (state) => state.shortlist.filters;
export const selectUiState = (state) => state.shortlist.ui;
export const selectAllCandidates = (state) => state.shortlist.candidates.list;

export default shortlistSlice.reducer;
