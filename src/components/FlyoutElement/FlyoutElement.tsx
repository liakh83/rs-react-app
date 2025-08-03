import { useAppDispatch, useAppSelector } from '@hooks/index';
import { clearItems } from '@redux/selectedItemsSlice';

const FlyoutElement = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems
  );
  const selectedCount = Object.keys(selectedItems).length;

  if (selectedCount === 0) return null;

  const handleClear = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    const itemsArray = Object.values(selectedItems);
    if (itemsArray.length === 0) return;

    const headers = [
      'Name',
      'ID',
      'Height',
      'Weight',
      'Types',
      'Abilities',
      'DetailsURL',
    ];

    const csvRows = itemsArray.map((item) => {
      const types = item.types?.map((type) => type).join(', ') ?? '';
      const abilities =
        item.abilities?.map((ability) => ability).join(', ') ?? '';
      const url = `https://pokeapi.co/api/v2/pokemon/${item.name}`;

      return [
        item.name,
        item.id,
        item.height,
        item.weight,
        types,
        abilities,
        url,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    });

    const headerRow = headers
      .map((header) => `"${header.replace(/"/g, '""')}"`)
      .join(',');
    const csvContent = [headerRow, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${itemsArray.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white border shadow-xl rounded-lg px-6 py-4 flex items-center gap-4">
      <span className="font-semibold">Selected: {selectedCount}</span>
      <button
        onClick={handleClear}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Unselect all
      </button>
      <button
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
      >
        Download
      </button>
    </div>
  );
};

export default FlyoutElement;
