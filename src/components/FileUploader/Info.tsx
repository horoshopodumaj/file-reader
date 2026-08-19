import React from "react";

interface IInfoProps {
  value: number;
}
const Info = ({ value }: IInfoProps) => {
  return (
    <div className="upload-info">
      <span className="info-label">Всего:</span>
      <span className="info-value">{value}</span>
    </div>
  );
};

export default Info;
