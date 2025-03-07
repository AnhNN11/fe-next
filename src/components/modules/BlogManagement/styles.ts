import styled from "styled-components";
import { Select as SelectFromAntd } from "antd";

export const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding-bottom: 16px;

  .ant-select {
    width: 100%;
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 24px;
`;

export const TableWrapper = styled.div`
  width: 100%;

  margin-bottom: 24px;

  margin-top: 24px;
`;

export const FilterWrapper = styled.div`
  margin-bottom: 24px;
`;
export const Select = styled(SelectFromAntd)`
  width: 100%;
`;
