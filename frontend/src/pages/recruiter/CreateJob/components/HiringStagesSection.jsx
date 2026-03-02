import React from 'react';
import styles from './HiringStages.module.css';

const HiringStagesSection = ({ stages, onChange }) => {
    const addStage = () => {
        const newStage = { id: Date.now(), name: '', order: stages.length + 1 };
        onChange([...stages, newStage]);
    };

    const updateStageName = (id, name) => {
        const updated = stages.map(s => s.id === id ? { ...s, name } : s);
        onChange(updated);
    };

    const removeStage = (id) => {
        const filtered = stages.filter(s => s.id !== id);
        // Re-calculate order
        const updated = filtered.map((s, idx) => ({ ...s, order: idx + 1 }));
        onChange(updated);
    };

    return (
        <div className={styles.stagesBuilder}>
            <div className={styles.stagesList}>
                {stages.map((stage, index) => (
                    <div key={stage.id} className={styles.stageRow}>
                        <div className={styles.stageOrderBadge}>{stage.order}</div>
                        <div className={styles.stageInputWrapper}>
                            <input
                                type="text"
                                value={stage.name}
                                onChange={(e) => updateStageName(stage.id, e.target.value)}
                                placeholder={index === 0 ? 'e.g., Aptitude Test' : index === 1 ? 'e.g., Technical Interview' : 'e.g., HR Interview'}
                                className={styles.stageInput}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeStage(stage.id)}
                            className={styles.btnDanger}
                            disabled={stages.length === 1}
                            title="Remove Stage"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addStage} className={styles.addStageBtn}>
                + Add Next Stage
            </button>
        </div>
    );
};

export default HiringStagesSection;
