import { Content } from '../../components/Layout';
import React from 'react';

const EmptyLayout = ({ children, ...restProps }) => (
  <main className="cr-app " style={{backgroundColor: 'grey'}} {...restProps}>
    <Content fluid>{children}</Content>
  </main>
);

export default EmptyLayout;
