// components/ui/AnimatedBorder.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface AnimatedBorderButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

const AnimatedBorderButton: React.FC<AnimatedBorderButtonProps> = ({ children, href, ...props }) => {
  return (
    <ButtonWrapper>
      <StyledLink href={href} {...props}>
        {children}
      </StyledLink>
    </ButtonWrapper>
  );
};

export default AnimatedBorderButton;


const ButtonWrapper = styled.span`
  position: relative;
  display: inline-block;
  padding: 4px;
  border-radius: 9999px;
  background: linear-gradient(45deg, #932F67, #E43636, #B4E50D, #F37199, #093FB4, #102E50);
  background-size: 300% 300%;
  animation: borderSpin 4s linear infinite;

  @keyframes borderSpin {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  // Create inner layer for masking the content
  & > span {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 9999px;
    background-color: white; // or your button background
    color: black;
    font-weight: 600;
    z-index: 1;
    position: relative;
  }
`


const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1.2rem;
  border-radius: 9999px;
  background-color: #ffffff;
  color: #2e7d32;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e8f5e9;
  }
`;
