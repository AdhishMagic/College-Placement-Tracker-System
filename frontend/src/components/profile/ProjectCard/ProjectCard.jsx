import { FiGithub, FiExternalLink, FiEdit3, FiTrash2 } from 'react-icons/fi';
import styles from './ProjectCard.module.css';

/**
 * ProjectCard Component
 * Displays a project with title, description, tech stack, and links.
 * Supports edit/view mode with edit and delete actions.
 */
const ProjectCard = ({
    project,
    editMode = false,
    onEdit,
    onDelete,
    className = '',
}) => {
    const { title, description, technologies = [], githubLink, portfolioLink } = project;

    return (
        <div className={`${styles.card} ${className}`}>
            <div className={styles.cardHeader}>
                <h4 className={styles.title}>{title || 'Untitled Project'}</h4>
                {editMode && (
                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.actionBtn}
                            onClick={() => onEdit?.(project)}
                            aria-label="Edit project"
                        >
                            <FiEdit3 />
                        </button>
                        <button
                            type="button"
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                            onClick={() => onDelete?.(project.id)}
                            aria-label="Delete project"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                )}
            </div>

            <p className={styles.description}>
                {description || 'No description provided.'}
            </p>

            {technologies.length > 0 && (
                <div className={styles.techStack}>
                    {technologies.map((tech) => (
                        <span key={tech} className={styles.techBadge}>{tech}</span>
                    ))}
                </div>
            )}

            <div className={styles.links}>
                {githubLink && (
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        <FiGithub />
                        <span>GitHub</span>
                    </a>
                )}
                {portfolioLink && (
                    <a
                        href={portfolioLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        <FiExternalLink />
                        <span>Live Demo</span>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
