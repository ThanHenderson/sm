import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import Navbar, { LinkNames } from './Navbar';

export type LayoutProps = {
  children: ReactNode
  preContainer?: ReactNode
  active?: LinkNames
};

const SimpleLayout = ({ active, preContainer, children }: LayoutProps) => (
  <>
    <Navbar active={active} />
    <main role="main">
      {preContainer && preContainer}
      <div className="py-5 bg-light">
        <Container>
          {children}
        </Container>
      </div>
    </main>
  </>
);

SimpleLayout.defaultProps = {
  active: 'Home',
  preContainer: null,
};

export default SimpleLayout;
