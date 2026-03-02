import { usePageMeta } from '../../../hooks';
import CreateJobPage from '../../recruiter/CreateJob/CreateJobPage';

const RecruiterPostJob = () => {
    usePageMeta('Post New Job', ['Recruiter', 'Post Job']);

    return <CreateJobPage />;
};

export default RecruiterPostJob;
