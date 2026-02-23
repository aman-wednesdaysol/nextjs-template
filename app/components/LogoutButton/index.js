import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import Router from 'next/router';
import { clearStoredToken } from '@utils/authStorage';
import { LogoutBtn } from '@components/styled/logoutButton';
import { TooltipWrapper } from '@components/styled/toolTip';

const handleLogout = () => {
  clearStoredToken();
  Router.push('/login');
};

const LogoutButton = () => (
  <TooltipWrapper label="Log out">
    <LogoutBtn data-testid="logout-button" onClick={handleLogout} aria-label="Log out">
      <LogoutOutlined />
    </LogoutBtn>
  </TooltipWrapper>
);

export default LogoutButton;
