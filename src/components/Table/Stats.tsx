interface IStatProps {
  value: number;
}

const Stats = ({ value }: IStatProps) => {
  return <div className="stats">Найдено: {value} записей</div>;
};

export default Stats;
