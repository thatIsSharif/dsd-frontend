import {styled} from '@mui/material/styles';
import {
  DataGrid,
  gridClasses,
  GridColumnMenu,
  GridColumnMenuFilterItem,
  GridColumnMenuItemProps,
  GridColumnMenuProps,
  GridLoadingOverlay,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

import {CustomPaginationProps, TableProps} from './propTypes/types.ts';
import './Table.scss';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import NoDataAvailable from 'assets/PNG/NoDataAvailableIcon.png';
import {useTranslation} from 'react-i18next';
import styles from 'styles/design-systems.module.scss';

const StyledGridOverlay = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? styles.greyDarker : styles.charcoal,
  },
  '& .ant-empty-img-2': {
    fill:
      theme.palette.mode === 'light'
        ? styles.bgColorBeigeLight
        : styles.greySoft,
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? styles.greyDarker : styles.charcoal,
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? styles.whitePure : styles.charcoal,
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill:
      theme.palette.mode === 'light' ? styles.bgWhiteSmoke : styles.whitePure,
  },
}));

function CustomNoRowsOverlay() {
  const {t} = useTranslation();

  return (
    <StyledGridOverlay>
      <img src={NoDataAvailable} alt="No data" className="no-data-img" />
      <Box
        sx={{
          mt: 0.5,
          color: styles.grayMuted,
          fontSize: styles.fontSizeLg,
          fontWeight: styles.fontWeightNormal,
          mb: 0.5,
        }}>
        {t('table.noDataAvailable')}
      </Box>
    </StyledGridOverlay>
  );
}

function CustomPagination({
  page,
  pageCount,
  handlePageChange,
}: CustomPaginationProps) {
  const apiRef = useGridApiContext();
  const currentPage = page ?? useGridSelector(apiRef, gridPageSelector);
  const totalPageCount =
    pageCount ?? useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      sx={{
        '& .MuiPaginationItem-root': {
          minWidth: '32px',
          height: '32px',
          fontSize: styles.fontSizeXsm,
        },
      }}
      variant="outlined"
      shape="circular"
      page={currentPage + 1}
      count={totalPageCount}
      renderItem={props => <PaginationItem {...props} />}
      onChange={(_, value) => {
        if (handlePageChange) {
          handlePageChange(value);
        } else {
          apiRef.current.setPage(value - 1);
        }
      }}
    />
  );
}

function CustomFilterItem(props: GridColumnMenuItemProps) {
  return <GridColumnMenuFilterItem className={'filter-btn'} {...props} />;
}

function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      className={'filter-item'}
      {...props}
      slots={{
        // Hide `columnMenuColumnsItem`
        columnMenuColumnsItem: null,
        columnMenuFilterItem: CustomFilterItem,
      }}
    />
  );
}

export default function Table({
  rows,
  columns,
  getRowId,
  showLoading,
  showMenu,
  noOfRows,
  minHeight = 270,
  withBorder = false,
  handlePageChange,
  page,
  pageCount,
}: TableProps) {
  return (
    <DataGrid
      className={'table'}
      loading={showLoading}
      slots={{
        loadingOverlay: () => {
          return <GridLoadingOverlay sx={{backgroundColor: 'inherit'}} />;
        },
        noRowsOverlay: CustomNoRowsOverlay,
        columnMenu: CustomColumnMenu,
        noResultsOverlay: CustomNoRowsOverlay,
        pagination: () => (
          <CustomPagination
            page={page}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        ),
      }}
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      autoHeight={false}
      getRowHeight={() => 'auto'} //Passing function to automatically set row height of each row
      getEstimatedRowHeight={() => 52} //giving estimated row height for performance enhancements
      initialState={{
        sorting: {
          sortModel: [{field: 'date', sort: 'desc'}],
        },
        pagination: {
          paginationModel: {
            pageSize: noOfRows,
          },
        },
      }}
      columnHeaderHeight={35}
      pageSizeOptions={[noOfRows]}
      disableColumnMenu={!showMenu}
      disableRowSelectionOnClick
      sx={{
        border: 'none',
        overflow: 'hidden',
        minHeight: rows?.length > 0 ? minHeight : 400,
        maxHeight: rows?.length > 0 ? minHeight : 400,
        color: 'rgba(255, 255, 255, 0.85)',
        backgroundColor: 'transparent',
        fontFamily: "'Space Grotesk', sans-serif",
        '& .MuiDataGrid-menuIcon': {
          visibility: 'visible',
          width: 'auto',
        },
        '& .MuiDataGrid-menuIconButton': {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeadersInner': {
          width: '100%',
          backgroundColor: 'transparent',
        },
        '& .MuiDataGrid-sortIcon': {
          color: '#7C3AED',
          visibility: 'visible',
          opacity: 1,
          width: 'auto',
        },
        '& .MuiDataGrid-virtualScroller': {
          overflow: 'hidden',
        },
        '& .MuiDataGrid-overlayWrapper': {
          height: '100%',
        },
        '& .MuiDataGrid-main': {
          borderRadius: '8px',
          backgroundColor: 'transparent',
          border: withBorder ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        },
        '& .MuiDataGrid-row.Mui-hovered': {
          backgroundColor: 'transparent',
        },
        '& .MuiDataGrid-row': {
          backgroundColor: 'transparent',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        },
        '& .MuiDataGrid-row:last-child': {
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        },
        [`& .${gridClasses.cell}`]: {
          paddingTop: 0.4,
          paddingLeft: 3,
          color: 'rgba(255, 255, 255, 0.8)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '13px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        },
        [`& .${gridClasses.cell}:focus, .${gridClasses.cell}:focus-within,  & .${gridClasses.columnHeader}:focus`]:
          {
            outline: 0,
          },
        [`& .${gridClasses.columnHeader}`]: {
          paddingLeft: 3,
          color: '#7C3AED',
          backgroundColor: 'transparent',
          fontFamily: "'Space Grotesk', sans-serif",
        },
        [`& .${gridClasses.columnHeaderTitle}`]: {
          fontWeight: 600,
          color: '#7C3AED',
        },
        ['.MuiDataGrid-footerContainer']: {
          py: 3,
          height: 30,
          minHeight: 10,
          backgroundColor: 'transparent',
          borderTop: 'none',
        },
      }}
    />
  );
}

