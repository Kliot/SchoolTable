import React, { useState, useContext } from "react";
import { IRatesListContext } from "../types/types";
import styled from "styled-components";
import { apiService } from "../utils/api";
import Modal from "./Modal";
import { TableContext } from "../context/context";
import uuid from "react-uuid";

const StyledSkipBlock = styled.div`
  width: 100%;
  height: 100%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    cursor: pointer;
  }
`;

interface IProps {
  Title: string;
  SchoolboyId: number;
  ColumnId: number;
}

const SkipBlock: React.FC<IProps> = ({ SchoolboyId, ColumnId, Title }) => {
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { rates, setRates } = useContext<IRatesListContext>(TableContext);

  const handleClose = () => {
    setIsOpen(false);
    setError("");
  };

  const handleSubmit = () => {
    const changedUrl = !Title ? "v1/2/Rate" : "v1/2/UnRate";
    const deleteRate = () => {
      return rates.Items.filter(
        (elem) =>
          elem.ColumnId !== ColumnId ||
          elem.SchoolboyId !== SchoolboyId ||
          (elem.SchoolboyId !== SchoolboyId && elem.ColumnId !== ColumnId)
      );
    };

    const skipData = {
      SchoolboyId: SchoolboyId,
      ColumnId: ColumnId,
      Title: !!Title ? "" : "H",
    };
    apiService
      .post(changedUrl, skipData)
      .then((response) => {
        console.log("status", response.status);
        setRates(
          !!Title
            ? { Items: deleteRate(), Quantity: rates.Quantity - 1 }
            : {
                Items: [
                  ...rates.Items,
                  { Id: uuid(), Title: "H", SchoolboyId, ColumnId },
                ],
                Quantity: rates.Quantity + 1,
              }
        );
      })
      .catch(function (error) {
        console.log(error.toJSON());
        setError(error.message);
        setIsOpen(true);
      });
  };
  return (
    <>
      <StyledSkipBlock>
        <div onClick={handleSubmit}>{Title}</div>
      </StyledSkipBlock>
      <Modal date={error} isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};

export default SkipBlock;
