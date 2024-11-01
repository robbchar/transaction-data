import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const RootDiv = styled.div`
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
    </RootDiv>
  );
}
