import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import ProfileJobs from "./ProfileJobs";
import ProfileEstates from "./ProfileEstates";
import { getProfileById } from "../../actions/profile";
import axios from "axios";

const defaultProfile = {
  skills: ["java"],
  location: "usa"
};

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
  getCurrentProfileJobs,
  getCurrentProfileEstates
}) => {
  console.log("profile: ", profile);
  const test = defaultProfile;
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getProfileById(match.params.id);
  }, [
    getProfileById,
    match.params.id,
    test,
    getCurrentProfileJobs,
    getCurrentProfileEstates
  ]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>

          <div className="job-list bg-white p-2">
            <ProfileJobs
              location={profile.location.split(",").join("+")}
              skills={profile.skills.join("+")}
            />
            <ul />
          </div>
          <div className="estate-list bg-white p-2">
            <ProfileEstates
              address={profile.address.join("+")}
              location={profile.location.split(",").join("+")}
            />
            <ul />
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
