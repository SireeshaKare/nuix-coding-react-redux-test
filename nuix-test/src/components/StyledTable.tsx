import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface TableColumnProps<RowData> {
  id: keyof RowData;
  label: string;
  isSelected?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface StyledTableProps<RowData extends { [key: string]: any }> {
  rows: RowData[];
  headerTitles: TableColumnProps<RowData>[];
  onRowClick?: (row: RowData, rowIndex: number) => void;
  selectedRowIndex?: number | null;
}

export const StyledTable = <RowData extends object>({
  rows,
  headerTitles,
  onRowClick,
  selectedRowIndex,
}: StyledTableProps<RowData>) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
      <Table sx={{ minWidth: 300 }} aria-label="All Items table">
        <TableHead>
          <StyledTableRow>
            {headerTitles.map((headerTitle, id) => (
              <StyledTableCell key={id} align="center">
                {headerTitle.label}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <StyledTableRow
              key={rowIndex}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  boxShadow: onRowClick
                    ? "0 0 10px rgba(0,0,0,0.5)"
                    : "inherit",
                },
                cursor: onRowClick ? "pointer" : "default",
                backgroundColor:
                  rowIndex === selectedRowIndex ? "#1976d2" : "white",
              }}
              onClick={() => onRowClick && onRowClick(row, rowIndex)}
            >
              {headerTitles.map((column, cellIndex) => (
                <StyledTableCell key={cellIndex} align="center">
                  {String(row[column.id])}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
