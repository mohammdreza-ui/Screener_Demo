import { forwardRef, useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Filter, Search } from "react-iconly";
import { Button, CheckPicker, Dropdown, Input, InputGroup, Popover, Whisper } from "rsuite";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { simplifyNumber, sortData } from "util/helper";

import sampleData  from "./sample-data.json";

interface dataModel{
  id: number,
  icon: string,
  title: string,
  subtitle: string,
  price: number,
  chg: number|string,
  chgp: number|string,
  technical_ration:number|string,
  vol:number,
  p_e:number,
  sector: string,
  vol_price:number,
  mkt_cap:number,
  eps:number,
  employees:number,
}

const ImageCell = ({ rowData, dataKey, ...props }: any) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 35,
        height: 35,
        borderRadius: 100,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img src={rowData.icon} width="35" />
    </div>
  </Cell>
);

// eslint-disable-next-line react/display-name
const ComparePopover = forwardRef(({ content, column, handleSubmit, min, max, index, ...props }:any, ref:unknown) => {
  const [selectedMin, setSelectedMin] = useState(column.filters.filterValue0??min);
  const [selectedMax, setSelectedMax] = useState(column.filters.filterValue1??max);
  const [type, setType] = useState(column.filters.filterType);
  // below
  // above
  // between

  const setRange = (range:any) => {
    setSelectedMin(range[0]);
    setSelectedMax(range[1]);
  }

  const [mode, setMode] = useState(column.filters.filterMode);
  const onSelect = (val: any) => {
    setMode(val);
  };

  return (
    <Popover ref={ref} title="Title" {...props}>
      <p className="mb-2">{content}</p>
      <div className="d-flex gap-2 align-items-center">
        <Dropdown title={mode} onSelect={onSelect} size="xs">
          <Dropdown.Item eventKey={"below"}>Below</Dropdown.Item>
          <Dropdown.Item eventKey={"above"}>Above</Dropdown.Item>
          <Dropdown.Item eventKey={"between"}>Between</Dropdown.Item>
        </Dropdown>
        <Input value={selectedMin} onChange={setSelectedMin} style={{width:100}} size="xs" />
        {mode == "between" ? <Input value={selectedMax} onChange={setSelectedMax} style={{ width: 100 }} size="xs" /> : null}
      </div>
      <Button size="xs" className="mt-3" onClick={()=>handleSubmit(index, column, type, mode, [selectedMin, selectedMax])}>Filter</Button>
    </Popover>
  );
});

const CustomComponent = ({ loading, children, style, min, max, index, handleSubmit, column }:any) => (
  <Whisper
    trigger="click"
    placement={"top"}
    controlId={`control-id-${column.key}`}
    speaker={
      <ComparePopover content={""} index={index} column={column} defaultValue={0} handleSubmit={handleSubmit}  />
    }
    style={style}
  >
    <Button appearance="subtle" style={{padding:"0px 3px", marginTop:-5, marginLeft:5}}  size="xs">{children}</Button>
  </Whisper>
);

export const Main = () => {
  const [sortColumn, setSortColumn] = useState("price");
  const [sortType, setSortType] = useState<any>("asc");
  const [tableLoading, setTableLoading] = useState(false);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey:number) => {
    setPage(1);
    setLimit(dataKey);
  };


  const [dataDefault, setDataDefault] = useState<dataModel[]>([]);
  const [originalData, setOriginalData] = useState<dataModel[]>(sampleData);

  const [search, setSearch] = useState("");
  useEffect(() => {
    let copy = originalData;
    if (search) {
      copy = originalData.filter(function (i,n){
        const s1 = i.title.toLowerCase().search(search.toLowerCase());  
        const s2 = i.subtitle.toLowerCase().search(search.toLowerCase());  
        if (s1 >= 0 || s2 >= 0) {
          return i;
        }
      });
    }
    setDataDefault(copy);
  }, [search]);
  
  const data = originalData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const [dataa, setDataa] = useState(originalData);


  const [triggerSort, setTriggerSort] = useState(false);
  const handleSortColumn = useCallback((sortColumn: any, sortType: any) => {
    setTableLoading(true);
    setTimeout(() => {
      setTableLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
      setTriggerSort(!triggerSort);
    }, 500);
  },[triggerSort]);

  const [defaultColumns, setDefaultColumns] = useState<any[]>([
    {
      key: 'icon',
      label: 'icon',
      align:"center",
      render: <ImageCell dataKey="icon" />,
      filters: {
        filter: false,
      }
    },
    {
      key: 'title',
      label: 'TITLE',
      align: "left",
      width: 250,
      filters: {
        filter: false,
      },
      render: <Cell dataKey="title">{rowData => <>{rowData.title}<br /><span style={{ opacity: .5 }}>{rowData.subtitle}</span></>}</Cell>
    },
    {
      key: 'price',
      label: 'PRICE',
      align: "center",
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: 0,
        filterValue1: 0,
      },
      width: 150,
      render: <Cell dataKey="price">{rowData => <>{rowData.price} <span style={{ opacity:.5, zoom:.7, marginLeft:5}}>USD</span></>}</Cell>
    },
    {
      key: 'chgp',
      label: 'CHG %',
      align:"center",
      width: 150,
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: -100,
        filterValue1: 0,
      },
      render: <Cell dataKey="chgp">{rowData => <span style={{ color: rowData.chgp>=0?"#22cc44":"#ff2233" }}>{rowData.chgp}%</span>}</Cell>
    },
    {
      key: 'chg',
      label: 'CHG',
      align:"center",
      width: 150,
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: -1000000000000,
        filterValue1: 0,
      },
      render: <Cell dataKey="chg">{rowData => <><span style={{ color: rowData.chg>=0?"#22cc44":"#ff2233" }}>{rowData.chg}</span><span style={{ opacity:.5, zoom:.7, marginLeft:5}}>USD</span></>}</Cell>
    },
    {
      key: 'technical_ration',
      label: 'TECHNICAL RATING',
      width: 180,
      filters: {
        filter: false,
      },
      align:"center",
      render: <Cell dataKey="technical_ration">{rowData => <>{parseInt(rowData.technical_ration) > 0 ? <ChevronUp primaryColor="#4499ff" set="light" size={14}  /> : parseInt(rowData.technical_ration) < 0 ? <ChevronDown primaryColor="#ff2233" set="light" size={14} />: "-"} {parseInt(rowData.technical_ration)>0?<span style={{ color: "#4499ff" }}>Buy</span>:parseInt(rowData.technical_ration)==0?"Neutral":<span style={{ color: "#ff2233" }}>Sell</span>}</>}</Cell>
    },
    {
      key: 'vol',
      label: 'VOL',
      align: "center",
      width: 150,
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: 0,
        filterValue1: 1000000000000,
      },
      render: <Cell dataKey="vol">{rowData => <><span>{simplifyNumber(rowData.vol)}</span></>}</Cell>
    },
    {
      key: 'vol_price',
      label: 'Volume*Price',
      width: 150,
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: 0,
        filterValue1: 1000000000000,
      },
      align:"center",
      render: <Cell dataKey="vol_price">{rowData => <>{simplifyNumber(rowData.vol_price)}</>}</Cell>
    },
    {
      key: 'mkt_cap',
      label: 'MKT CAP',
      align:"center",
      width: 150,
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: 0,
        filterValue1: 1000000000000,
      },
      render: <Cell dataKey="mkt_cap">{rowData => <><span>{simplifyNumber(rowData.mkt_cap)}<span style={{ opacity:.5, zoom:.7, marginLeft:5}}>USD</span></span></>}</Cell>
    },
    {
      key: 'p_e',
      label: 'P/E',
      align:"center",
      width: 150,
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: 0,
        filterValue1: 100,
      },
      render: <Cell dataKey="p_e">{rowData => <><span>{rowData.p_e!=0?rowData.p_e:"-"}</span></>}</Cell>
    },
    {
      key: 'eps',
      label: 'EPS (TTM)',
      align: "center",
      width: 150,
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: -1000,
        filterValue1: 1000,
      },
      render: <Cell dataKey="eps">{rowData => <><span>{rowData.eps}<span style={{ opacity:.5, zoom:.7, marginLeft:5}}>USD</span></span></>}</Cell>
    },
    {
      key: 'employees',
      label: 'EMPLOYEES',
      width: 150,
      filters: {
        filter: true,
        filterType: "compare",
        filterMode: "above",
        filterValue0: -10000000,
        filterValue1: 10000000,
      },
      align:"center",
      render: <Cell dataKey="employees">{rowData => <><span>{simplifyNumber(rowData.employees)}</span></>}</Cell>
    },
    {
      key: 'sector',
      label: 'SECTOR',
      width:240,
      filters: {
        filter: false,
      },
      align: "left",
      render: <Cell dataKey="sector"/>
    },

  ]);

  const [columnKeys, setColumnKeys] = useState(defaultColumns.map(column => column.key));
  const columns = defaultColumns.filter((column) => columnKeys.some(key => key === column.key));
  
  const handleSubmit = useCallback((index, column, filterType:string, filterMode:string, range:any) => {

    const defaultColumnsCopy = defaultColumns;

    console.log(defaultColumnsCopy, index)
    defaultColumnsCopy[index].filters.filterType = filterType;
    defaultColumnsCopy[index].filters.filterMode = filterMode;
    defaultColumnsCopy[index].filters.filterValue0 = parseFloat(range[0]);
    defaultColumnsCopy[index].filters.filterValue1 = parseFloat(range[1]);

    setDefaultColumns(defaultColumnsCopy);
    setDataa(sortData(data, sortColumn, sortType, defaultColumnsCopy));
    // re filter

  }, [defaultColumns, data, sortColumn, sortType]);


  useEffect(() => {
    setDataa(sortData(dataDefault, sortColumn, sortType, defaultColumns));
  }, [triggerSort, dataDefault]);

  return (
    <section className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <h3 className="mb-2">Stock Screener</h3>
        </div>
        <div className="col-6 mb-2">
          <InputGroup inside size="sm" className="d-inline-block" style={{width:"50%", maxWidth:300}}>
            <Input onChange={setSearch} size="sm" placeholder="Search..." />
            <InputGroup.Addon>
              <Search set="light" size={16} />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className="col-6 mb-2">
          <CheckPicker 
            data={defaultColumns}
            labelKey="label"
            valueKey="key"
            value={columnKeys}
            onChange={setColumnKeys}
            cleanable={false}
            size="sm"
            style={{width:"50%", maxWidth:300, float:"right"}}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {
            data.length ? <Table
              data={dataa}
              sortColumn={sortColumn}
              sortType={sortType}
              loading={tableLoading}
              // onSortColumn={handleSortColumn}
              affixHorizontalScrollbar
              height={720}
              // autoHeight
              wordWrap={true}
            >
              {
                columns.map((column, index) => {
                  return (
                    // resizable
                    <Column key={column.key} width={column.width} flexGrow={column.flexGrow} verticalAlign="middle" sortable align={column.align} >
                      <HeaderCell fixed >
                        <span onClick={() => { handleSortColumn(column.key, sortType == "asc" ? "desc" : "asc") }} >{column.label}</span>
                        
                        {column.filters.filter ? <CustomComponent filterType={column.filters.filterType} index={index} style={{ display: "inline-block", zIndex: 100, width: "10px", float:"left" }} min={0} max={100} handleSubmit={handleSubmit} column={column}><Filter set="bold" size={14} /></CustomComponent> : null}

                      </HeaderCell>
                      {column.render}
                    </Column>
                  );
                })
              }
            </Table>:null
          }      
          <div style={{ padding: 20 }}>
            {/* <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="xs"
              layout={['total', '-', 'limit', '|', 'pager', 'skip']}
              total={dataDefault.length}
              limitOptions={[10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

