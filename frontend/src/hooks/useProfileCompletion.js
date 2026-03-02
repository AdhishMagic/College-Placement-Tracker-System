import { useMemo } from 'react';

/**
 * useProfileCompletion Hook
 *
 * Calculates profile completion percentage based on filled sections.
 * Each section has a weight; total = 100%.
 *
 * Weights:
 *   - Personal info:   20%
 *   - Academic info:    20%
 *   - Technical skills: 15%
 *   - Soft skills:      10%
 *   - Projects:         20%
 *   - Certifications:   15%
 */
const useProfileCompletion = (profileData) => {
    return useMemo(() => {
        if (!profileData) return { percentage: 0, sections: [] };

        const sections = [];

        // ---- Personal Information (20%) ----
        const personalFields = ['fullName', 'email', 'phone', 'address', 'dateOfBirth'];
        const filledPersonal = personalFields.filter(
            (f) => profileData.personal?.[f] && profileData.personal[f].toString().trim() !== ''
        ).length;
        const personalScore = Math.round((filledPersonal / personalFields.length) * 100);
        sections.push({
            label: 'Personal Information',
            weight: 20,
            score: personalScore,
            filled: filledPersonal,
            total: personalFields.length,
        });

        // ---- Academic Information (20%) ----
        const academicFields = ['university', 'degree', 'department', 'cgpa', 'graduationYear'];
        const filledAcademic = academicFields.filter((f) => {
            const val = profileData.academic?.[f];
            if (typeof val === 'number') return val > 0;
            return val && val.toString().trim() !== '';
        }).length;
        const academicScore = Math.round((filledAcademic / academicFields.length) * 100);
        sections.push({
            label: 'Academic Information',
            weight: 20,
            score: academicScore,
            filled: filledAcademic,
            total: academicFields.length,
        });

        // ---- Technical Skills (15%) ----
        const techSkills = profileData.skills?.technical?.length || 0;
        const techScore = techSkills >= 3 ? 100 : Math.round((techSkills / 3) * 100);
        sections.push({
            label: 'Technical Skills',
            weight: 15,
            score: techScore,
            filled: techSkills,
            total: '3+',
        });

        // ---- Soft Skills (10%) ----
        const softSkills = profileData.skills?.soft?.length || 0;
        const softScore = softSkills >= 2 ? 100 : Math.round((softSkills / 2) * 100);
        sections.push({
            label: 'Soft Skills',
            weight: 10,
            score: softScore,
            filled: softSkills,
            total: '2+',
        });

        // ---- Projects (20%) ----
        const projectCount = profileData.projects?.length || 0;
        const projectScore = projectCount >= 2 ? 100 : Math.round((projectCount / 2) * 100);
        sections.push({
            label: 'Projects',
            weight: 20,
            score: projectScore,
            filled: projectCount,
            total: '2+',
        });

        // ---- Certifications (15%) ----
        const certCount = profileData.certifications?.length || 0;
        const certScore = certCount >= 1 ? 100 : 0;
        sections.push({
            label: 'Certifications',
            weight: 15,
            score: certScore,
            filled: certCount,
            total: '1+',
        });

        // ---- Weighted Total ----
        const percentage = Math.round(
            sections.reduce((acc, s) => acc + (s.score * s.weight) / 100, 0)
        );

        return { percentage, sections };
    }, [profileData]);
};

export default useProfileCompletion;
