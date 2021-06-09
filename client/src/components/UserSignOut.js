import React from 'react';
import { Redirect } from 'react-router-dom';

/** UserSignOut component - Signs out the authenticated user and redirects the user to the default route (course list)
 * This component does not render visual elements.  
 * */
const UserSignOut = ({context}) => {
  context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;