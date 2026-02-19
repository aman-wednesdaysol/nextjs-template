import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Layout from '@app/components/Layout';
import ProtectedRoute from '@app/components/ProtectedRoute';
import { selectIsAuthenticated } from '@app/containers/Auth/selectors';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LibraryContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const LibraryTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--color-text);
  animation: fadeInUp 0.5s ease forwards;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: var(--color-text-secondary);
  animation: fadeInUp 0.5s ease 0.15s forwards;
  opacity: 0;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const EmptyStateIcon = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
`;

const EmptyStateText = styled.p`
  font-size: 17px;
  margin: 0;
  color: var(--color-text);
`;

function LibraryPage({ isAuthenticated }) {
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Layout>
        <LibraryContainer>
          <LibraryTitle>Your Library</LibraryTitle>
          <EmptyState>
            <EmptyStateIcon>📚</EmptyStateIcon>
            <EmptyStateText>Your saved songs will appear here</EmptyStateText>
          </EmptyState>
        </LibraryContainer>
      </Layout>
    </ProtectedRoute>
  );
}

LibraryPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated()
});

export default connect(mapStateToProps)(LibraryPage);
