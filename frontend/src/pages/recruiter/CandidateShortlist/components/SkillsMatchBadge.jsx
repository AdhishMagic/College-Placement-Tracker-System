import React from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const SkillsMatchBadge = ({ matchLevel, count, total }) => {
    if (matchLevel === "Full") {
        return (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">100% Match</span>
            </div>
        );
    }

    if (matchLevel === "Partial") {
        return (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700">
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">{count}/{total} Skills</span>
            </div>
        );
    }

    return (
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700">
            <XCircle className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">Low Match</span>
        </div>
    );
};

export default SkillsMatchBadge;
