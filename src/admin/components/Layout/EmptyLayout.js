import { Content } from '../../components/Layout';
import React from 'react';

const EmptyLayout = ({ children, ...restProps }) => (
  <main  className="cr-app " style={{backgroundColor: '#D7D7D7',height:'100vh'}} {...restProps}>
    <Content fluid>{children}</Content>
  </main>
);

export default EmptyLayout;
