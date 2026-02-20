/**
 *
 * SearchBar Component
 *
 */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

const SearchContainer = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  font-size: 15px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: linear-gradient(145deg, var(--color-background-secondary) 0%, var(--color-background) 100%);
  color: var(--color-text);
  font-family: inherit;
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-muted);
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

export function SearchBar({ onSearch, placeholder = 'Search for songs, artists...' }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (onSearch) {
        onSearch(term);
      }
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      if (router.pathname !== '/search') {
        router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  return (
    <SearchContainer data-testid="search-bar">
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </SearchContainer>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string
};

export default SearchBar;
