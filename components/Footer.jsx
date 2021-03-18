import React from 'react';
import Collapsible from 'react-collapsible';

const Footer = () => {
  return (
    <>
      <Collapsible className="footer" trigger="EXPLORE">
        <p>
          This is the collapsible content. It can be any element or React
          component you like.
        </p>
      </Collapsible>
      <Collapsible className="footer" trigger="CONNECT">
        <p>
          This is the collapsible content. It can be any element or React
          component you like.
        </p>
      </Collapsible>
      <Collapsible className="footer" trigger="SUBSCRIBE">
        <p>
          This is the collapsible content. It can be any element or React
          component you like.
        </p>
      </Collapsible>
    </>
  );
};

export default Footer;