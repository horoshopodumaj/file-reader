const EmptyTable = () => {
  return (
    <div className="table-empty">
      <p className="table-empty__title">Нет данных</p>
      <p className="table-empty__hint">Загрузите JSON-файл или обновите страницу</p>
    </div>
  );
};

export default EmptyTable;
