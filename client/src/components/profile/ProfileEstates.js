import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfileEstates } from "../../actions/profile";

const ProfileEstates = ({
  getCurrentProfileEstates,
  estates,
  location,
  address
}) => {
  useEffect(() => {
    console.log("Profile Estates");
    console.log(estates);
    getCurrentProfileEstates(address, location);
  }, [getCurrentProfileEstates]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Profile Real Estate</h2>
      {estates === null ? (
        <Spinner />
      ) : (
        <div>
          <a href={estates} target={"_blank"}>
            Homes in the area
          </a>
        </div>
      )}
    </div>
  );
};

ProfileEstates.propTypes = {
  getCurrentProfileEstates: PropTypes.func.isRequired,
  estates: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  estates: state.profile.estates
});

export default connect(
  mapStateToProps,
  { getCurrentProfileEstates }
)(ProfileEstates);
