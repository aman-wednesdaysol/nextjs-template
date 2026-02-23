import React from 'react';
import PropTypes from 'prop-types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { HeartBtn } from '@components/styled/heartButton';
import { TooltipWrapper } from '@components/styled/toolTip';

const HeartButton = ({ isLiked, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <TooltipWrapper label={isLiked ? 'Dislike' : 'Like'}>
      <HeartBtn
        data-testid="heart-button"
        isLiked={isLiked}
        onClick={handleClick}
        aria-label={isLiked ? 'Unlike song' : 'Like song'}
      >
        {isLiked ? <HeartFilled /> : <HeartOutlined />}
      </HeartBtn>
    </TooltipWrapper>
  );
};

HeartButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default HeartButton;
