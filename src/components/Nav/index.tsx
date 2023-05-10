/*
 * index.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space
 */

import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="Nav">
      <ul className="Nav__inner">
        <li>
          <Link to="/">NOBOTS</Link>
        </li>
        <li>
          <Link to="/whatsnext">WHAT&apos;S NEXT</Link>
        </li>
        <li>
          <Link to="/logout">LOGOUT</Link>
        </li>
      </ul>
    </nav>
  );
}
