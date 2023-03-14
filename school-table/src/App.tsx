import React from "react";
import styled from "styled-components";
import "./App.css";
import TableWrapper from "./components/TableWrapper";
import Theme from "./Theme";

const StyledApp = styled.div`
  background-color: ${({ theme }): string => theme.bcMain};
  font-family: ${({ theme }): string => theme.bodyFontFamily};
  font-size: 1rem;
  color: ${({ theme }): string => theme.textPrimary};
`;

function App() {
  return (
    <Theme>
      <div className="App">
        <StyledApp>
          <TableWrapper></TableWrapper>
        </StyledApp>
      </div>
    </Theme>
  );
}

export default App;
