import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

type TableElement = ReactElement<{
  children?: ReactNode;
  align?: "left" | "center" | "right";
  style?: CSSProperties;
  "data-align"?: CSSProperties["textAlign"];
  colSpan?: number;
  rowSpan?: number;
  scope?: string;
  role?: string;
}>;

function elements(children: ReactNode): TableElement[] {
  return Children.toArray(children).filter(isValidElement) as TableElement[];
}

function plainText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) =>
      isValidElement<{ children?: ReactNode }>(child)
        ? plainText(child.props.children)
        : String(child),
    )
    .join("");
}

/** Keep native table relationships, with a reading layout for prose on phones. */
export function ArticleTable({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"table">) {
  const sections = elements(children);
  const head = sections.find((section) => section.type === "thead");
  const headerRows = elements(head?.props.children);
  const headers = elements(headerRows[0]?.props.children);
  const rows = sections
    .filter((section) => section.type === "tbody")
    .flatMap((section) => elements(section.props.children));
  const cells = [...headers, ...rows.flatMap((row) => elements(row.props.children))];
  const isSimple =
    headerRows.length === 1 &&
    headers.length > 1 &&
    rows.length > 0 &&
    rows.every((row) => elements(row.props.children).length === headers.length) &&
    cells.every((cell) => (cell.props.colSpan ?? 1) === 1 && (cell.props.rowSpan ?? 1) === 1);
  const alignment = (cell: TableElement) => cell.props.style?.textAlign ?? cell.props.align;
  const isNumeric = isSimple && headers.slice(1).every((cell) => alignment(cell) === "right");
  const layout = isSimple && !isNumeric ? "records" : "comparison";
  const label = headers.map((cell) => plainText(cell.props.children)).join(" · ");

  return (
    <div className="article-table" role="region" aria-label={label || props["aria-label"] || "Table"} tabIndex={0}>
      <table {...props} className={`article-data-table ${className}`} data-layout={layout} role="table">
        {Children.map(children, (section) => {
          if (!isValidElement<TableElement["props"]>(section) || !["thead", "tbody"].includes(String(section.type))) return section;
          const isHeader = section.type === "thead";

          return cloneElement(section, { role: "rowgroup" },
            Children.map(section.props.children, (row) => {
              if (!isValidElement<TableElement["props"]>(row) || row.type !== "tr") return row;
              let columnIndex = 0;
              return cloneElement(row, { role: "row" },
                Children.map(row.props.children, (cell) => {
                  if (!isValidElement<TableElement["props"]>(cell)) return cell;
                  const index = columnIndex++;
                  const align = alignment(cell);
                  if (isHeader) return cloneElement(cell, { scope: cell.props.scope || "col", role: "columnheader", "data-align": align });
                  if (layout !== "records") return cloneElement(cell, { "data-align": align });
                  return cloneElement(cell, { role: "cell", "data-align": align }, <>
                    <span className="article-table-label" aria-hidden="true">{plainText(headers[index]?.props.children)}</span>
                    <span className="article-table-value">{cell.props.children}</span>
                  </>);
                }),
              );
            }),
          );
        })}
      </table>
    </div>
  );
}
