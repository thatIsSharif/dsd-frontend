import {Row} from 'component/Table/propTypes/types.ts';
import Table from 'component/Table/Table.tsx';
import {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import {getProductRowId} from 'utilities/getProductRowId.ts';
import {StockCheckOutContext} from '../propTypes/types.ts';
import {orderColDef} from './OrderColDef/OrderColDef.tsx';
import {getAssignedStock} from '../../../mock/api';

const OrderTable = () => {
  const {setRows, rows} = useOutletContext<StockCheckOutContext>();
  const [isTableLoaded, setIsTableLoaded] = useState(false);

  async function fetchRows() {
    try {
      const data = await getAssignedStock();
      const products: Row[] = data.map((item: any) => ({
        productId: item.product,
        externalId: item.product,
        name: item.description,
        description: item.description,
        uom: item.uom,
        quantity: item.initialStock,
      }));
      setRows(products);
      setIsTableLoaded(true);
    } catch (error) {
      console.error(error);
      setRows([]);
      setIsTableLoaded(true);
    }
  }

  useEffect(() => {
    fetchRows();
    return () => {
      setRows([]);
    };
  }, []);

  return (
    <Table
      noOfRows={4}
      showMenu={false}
      showLoading={!isTableLoaded}
      rows={rows}
      columns={orderColDef}
      getRowId={getProductRowId}
      minHeight={384}
    />
  );
};

export default OrderTable;

