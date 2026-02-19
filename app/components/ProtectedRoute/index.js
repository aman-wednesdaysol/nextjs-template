/**
 *
 * ProtectedRoute Component
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useRouter } from 'next/router';
import { selectIsAuthenticated } from '@app/containers/Auth/selectors';
import { getStoredToken } from '@app/utils/authUtils';

export function ProtectedRoute({ children, isAuthenticated }) {
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const token = getStoredToken();
    if (!token || !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Check if authenticated before rendering
  const token = getStoredToken();
  if (!token || !isAuthenticated) {
    return null; // Don't render children while redirecting
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated()
});

export default connect(mapStateToProps)(ProtectedRoute);
