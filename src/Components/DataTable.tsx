import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

export interface Column {
  label: string;
  align: "center" | "left" | "right" | "justify";
}

export const Comparator = (a: any, b: any) => {
  if (b < a) return -1;
  if (b > a) return 1;
  return 0;
};

export const getComparator = (
  orderBy: "asc" | "desc",
  comparator: (a: any, b: any) => number
) => {
  return orderBy === "desc"
    ? (a: any, b: any) => comparator(a, b)
    : (a: any, b: any) => -comparator(a, b);
};

export const sortedRowInformation = (
  rowInformation: any[],
  comparator: (valueA: any, valueB: any) => number
) => {
  const stabilizedRowArray = rowInformation.map((el, index) => [el, index]);
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedRowArray.map((el) => el[0]);
};

const TableHeaderCell = ({
  align = "left",
  label,
  activeProperty,
  sortDirection,
  OnClick,
}: {
  align?: "center" | "left" | "right" | "justify";
  label: string;
  activeProperty?: string;
  sortDirection?: "asc" | "desc";
  OnClick: (property: string) => void;
}) => {
  const isPropertyActive: boolean = activeProperty === label;

  return (
    <TableCell key={label} align={align}>
      <TableSortLabel
        direction={isPropertyActive ? sortDirection : "asc"}
        active={isPropertyActive}
        onClick={() => {
          OnClick(label);
        }}
      >
        <Typography fontWeight="bold">{label}</Typography>
      </TableSortLabel>
    </TableCell>
  );
};

export const TableHeader = ({
  headers,
  sortDirection,
  activeProperty,
  OnClick,
}: {
  headers: Column[];
  sortDirection?: "asc" | "desc";
  activeProperty: string;
  OnClick: (property: string) => void;
}) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => {
          return (
            <TableHeaderCell
              key={header.label}
              label={header.label}
              align={header.align}
              OnClick={OnClick}
              activeProperty={activeProperty}
              sortDirection={sortDirection}
            />
          );
        })}
      </TableRow>
    </TableHead>
  );
};

const DataTable = () => {
  return <div>DataTable</div>;
};

export default DataTable;
