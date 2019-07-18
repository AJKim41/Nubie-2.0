import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfileJobs } from "../../actions/profile";

const ProfileJobs = ({ getCurrentProfileJobs, jobs, location, skills }) => {
  useEffect(() => {
    getCurrentProfileJobs(location, skills);
  }, [getCurrentProfileJobs]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Profile Jobs</h2>
      {jobs === null ? (
        <Spinner />
      ) : (
        jobs.map((job, index) => (
          <div key={`${job.type}-${index}`} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
              </h4>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
            <div style={{ width: "50%" }}>
              <ul>
                <li className="badge badge-primary">
                  Location: {job.location}
                </li>
                <li className="badge badge-dark">Company: {job.company}</li>
                <li className="badge badge-light">
                  <img src={job.company_logo} />
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileJobs.propTypes = {
  getCurrentProfileJobs: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  jobs: state.profile.jobs
});

export default connect(
  mapStateToProps,
  { getCurrentProfileJobs }
)(ProfileJobs);
