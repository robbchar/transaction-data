import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const RootDiv = styled.div`
  display: flex;
`;

const SideBarDiv = styled.div`
  height: 100vh;
  width: 20rem;
  background-color: #dadee3;
  padding-left: 1rem;
`;

const DetailrDiv = styled.div`
  height: 100vh;
  width: auto;
  background-color: #f9fafc;
  flex-grow: 1;
  padding-left: 1rem;
`;

export default function App() {
  return (
    <RootDiv>
      <SideBarDiv>
        <h1>Transactions</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/pages/EditTransactions`}>Edit Transactions</Link>
            </li>
            <li>
              <Link to={`/pages/ViewTransactions`}>View Transactions</Link>
            </li>
          </ul>
        </nav>
      </SideBarDiv>
      <DetailrDiv>
        <Outlet />
      </DetailrDiv>
    </RootDiv>
  );
}
