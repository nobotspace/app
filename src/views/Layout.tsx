/*
 * Layout.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space 
 */

// import Nav from "components/Nav";
import ControlBar from "components/ControlBar";
import Nav from "components/Nav";
import { forwardRef } from "react";

export default forwardRef<HTMLDivElement, React.PropsWithChildren>(
  function Layout({ children }, ref) {
    // const { data } = useListWorkspacesQuery();

    return (
      <div className="Layout" ref={ref}>
        <div className="Layout__inner">
          <Nav />
          {children}
          <ControlBar />
        </div>
      </div>
    );
  }
);
