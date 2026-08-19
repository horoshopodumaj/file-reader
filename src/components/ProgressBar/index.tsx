import React from "react";

import "./style.scss";

interface IProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<IProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-text">{Math.round(progress)}%</div>
    </div>
  );
};

export default ProgressBar;
