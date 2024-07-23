// Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <div>
      <Link to="/">Dashboard /</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={name}>
             {capitalizeFirstLetter(name)}
            </span>
        ) : (
          <span key={name}>
            <Link to={routeTo}> {capitalizeFirstLetter(name)}</Link> /&nbsp;
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
