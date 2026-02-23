import React from 'react';
import ThemeToggle from '@components/ThemeToggle';
import LogoutButton from '@components/LogoutButton';
import NavLink from '@components/NavLink';
import { PageHeader, PageTitle, HeaderActions } from '@components/styled/musicPage';
import { NavGroup } from '@components/styled/navLink';

const MusicHeader = () => (
  <PageHeader>
    <PageTitle>MUSICA</PageTitle>
    <NavGroup>
      <NavLink href="/" label="Search" isActive />
      <NavLink href="/library" label="Favorites" />
    </NavGroup>
    <HeaderActions>
      <ThemeToggle />
      <LogoutButton />
    </HeaderActions>
  </PageHeader>
);

export default MusicHeader;
