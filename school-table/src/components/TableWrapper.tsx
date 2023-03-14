import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import styled from "styled-components";
import { LessonsList, RateList, SchoolboyList } from "../types/types";
import { TableContext } from "../context/context";
import SchoolTable from "./SchoolTable";
import { apiService } from "../utils/api";
import axios from "axios";
import Modal from "./Modal";

const StyledTableWrapper = styled.div`
  max-width: 700px;
  padding: 20px;
  margin: 0 auto;

  h1 {
    margin: 10px 0;
  }
`;

const TableWrapper: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [schoolboysInfo, setSchoolboysInfo] = useState<SchoolboyList>();
  const [lessons, setLessons] = useState<LessonsList>();
  const [rates, setRates] = useState<RateList>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let urls = ["/v1/2/Schoolboy", "/v1/2/Column", "v1/2/Rate"];
    axios
      .all(urls.map((promise) => apiService.get(promise)))
      .then(
        axios.spread((Colunm, Rate, Schoolboy) => {
          setSchoolboysInfo(Colunm.data);
          setLessons(Rate.data);
          setRates(Schoolboy.data);
          setLoading(false);
        })
      )
      .catch(function (error) {
        setLoading(false);
        console.log(error.message);
        setError(error.message);
        setIsOpen(true);
      });
  }, []);

  return (
    <StyledTableWrapper>
      {loading && <CircularProgress size={24} className="spinner" />}
      {!loading && (
        <TableContext.Provider
          value={{
            rates,
            setRates,
          }}
        >
          <h1>School Table</h1>
          {lessons && rates && schoolboysInfo && (
            <SchoolTable
              lessons={lessons}
              rates={rates}
              schoolboys={schoolboysInfo}
            ></SchoolTable>
          )}
        </TableContext.Provider>
      )}
      <Modal date={error} isOpen={isOpen} handleClose={handleClose} />
    </StyledTableWrapper>
  );
};

export default TableWrapper;
