/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Message from "./Message";

const Profile = () => {
  return (
    <>
      <Message />
      <div>
        <h1>Messages Received</h1>
      </div>
      <div>
        <h2>Sent Messages</h2>
      </div>
    </>
  );
};

export default Profile;
