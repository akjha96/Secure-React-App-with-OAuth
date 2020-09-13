import React, { Component } from "react";
import "./Profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      error: "",
    };
  }

  componentDidMount = () => {
    this.loadUserProfile();
  };

  loadUserProfile = () => {
    this.props.auth.getProfile((profile, error) => {
      this.setState({ profile, error }); // object shorthand syntax
    });
  };

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <>
        <h1>Profile</h1>
        <h5>{profile.nickname}</h5>
        <div className="profile-data">
          <img
            style={{ maxWidth: 150, maxHeight: 150, paddingRight: 15 }}
            src={profile.picture}
            alt="profile"
          />

          <ul>
            <li>
              <strong>Name</strong>: {profile.name}
            </li>
            <br />
            <li>
              <strong>Nick Name</strong>: {profile.nickname}
            </li>
            <br />
            <li>
              <strong>Email</strong>: {profile.email}
            </li>
            <br />
            <li>
              <strong>Email Verified</strong>: {profile.email_verified}
            </li>
            <br />
            <li>
              <strong>Updated at</strong>: {profile.updated_at}
            </li>
            <br />
            <li>
              <strong>Picture URL</strong>: {profile.picture}
            </li>
            <br />
            <li>
              <strong>Locale</strong>: {profile.locale}
            </li>
          </ul>
        </div>
      </>
    );
  }
}
