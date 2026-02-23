import styled from '@emotion/styled';

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &::after {
    content: '${(props) => props.label}';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  &:hover::after {
    opacity: 1;
  }
`;
