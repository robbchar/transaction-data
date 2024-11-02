import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const RootDiv = styled.div`
  display: grid;
  grid-template-columns:
    [viewport-start] minmax(1em, 1fr)
    [container-start] minmax(0, 110rem) [container-end]
    minmax(1em, 1fr) [viewport-end];
`;

const ItemContainerDiv = styled.div`
  grid-column: container;
  display: flex;
`;

const SideBarNav = styled.nav`
  height: 100vh;
  background-color: #dadee3;
  padding-left: 1rem;
  width: 20rem;
`;

const MainContent = styled.main`
  background-color: #f9fafc;
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;
  flex: 1;
`;

export default function App() {
  return (
    <RootDiv>
      <ItemContainerDiv>
        <SideBarNav>
          <h1>Transactions</h1>
          <div>
            <ul>
              <li>
                <Link to={`/pages/EditTransactions`}>Edit Transactions</Link>
              </li>
              <li>
                <Link to={`/`}>View Transactions</Link>
              </li>
            </ul>
          </div>
        </SideBarNav>
        <MainContent>
          <Outlet />
        </MainContent>
      </ItemContainerDiv>
    </RootDiv>
  );
}
