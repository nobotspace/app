/*
 * index.tsx
 * author: evan kirkiles
 * created on Wed May 10 2023
 * 2023 the nobot space 
 */


import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';

export default function ControlBar() {
  const user = useContext(AuthContext);

  return (
    <nav className="ControlBar">
      <ul className="ControlBar__inner">
        <li>
          USER: {user?.user?.getUsername()}
        </li>
      </ul>
    </nav>
  );
}
