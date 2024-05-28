import { Form, Input, Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/lib/table';
import { FilterValue } from 'antd/lib/table/interface';
import React, { memo, useEffect, useState } from 'react';

interface PropsType extends TableProps<any> {
  requestFun: (_data?: any) => Promise<{ entries: Array<any>; total: number }>; // 请求方法
  requestData: any; // 额外参数
  pageName?: string; // 分页名称
  sizeName?: string; // 分页大小名称
  columns: Array<any>; // 表头
  handleSave?: (_dataIndex: string, _row: any, _values: any) => Promise<void>; // 修改单元格回调
  mappingTable?: any; // 排序映射
  dataChange?: (_data?: any) => void;
  defaultRequest?: boolean; // 是否请求
  isEditKey?: string; // 当前可编辑行key
  changeRow?: (value?: any) => void;
  rowForm?: any;
}
/**
 * 封装的列表请求，
 * @param {Request} requestFun 请求方法这个接口需返回格式为{data.data.records: Array<any>, data.data.total: number}
 * @param {any} requestData 额外参数
 * @param {string} pageName 分页名称
 * @param {string} sizeName 额外参数
 * @param {()=>void} handleSave 修改单元格回调
 */
let timr: any = null;
export default memo(
  ({
    requestFun,
    requestData,
    pageName = 'pageNum',
    sizeName = 'pageSize',
    mappingTable,
    columns: defaultColumns,
    dataChange,
    defaultRequest = true,
    isEditKey,
    rowForm,
    ...props
  }: PropsType) => {
    const [dataList, setDataList] = useState<Array<any>>([]); // 数据列表
    const [pageLimit, setPageLimit] = useState<number>(20); // 分页大小
    const [page, setPage] = useState<number>(1); // 当前页数
    const [listTotal, setListTotal] = useState<number>(1); // 总页数
    const [loading, setLoading] = useState<boolean>(false); // 是否加载中
    const [sorter, setSorter] = useState<{ field?: string; order?: string }>({
      field: '',
      order: '',
    }); // 排序

    const mappingFun = (key: string, table: any) => {
      return table[key] || key;
    };

    const getListData = (current: number, size: number) => {
      clearTimeout(timr);
      timr = setTimeout(async () => {
        setLoading(true);
        try {
          // 缓存查询的条件
          const subData = {
            [pageName]: current || page,
            [sizeName]: size || pageLimit,
            ...requestData,
            orderByColumn: mappingTable
              ? mappingFun(sorter.field || '', mappingTable)
              : sorter.field,
            isAsc: sorter.order
              ? sorter.order === 'descend'
                ? 'desc'
                : 'asc'
              : '',
          };
          const data: any = await requestFun(subData);
          const newDateList = data.data.pageData
            ? data.data.pageData.rows
            : data.data.rows
            ? data.data.rows
            : data.data.records;
          setDataList(newDateList);
          setListTotal(
            data.data.pageData ? data.data.pageData.total : data.data.total,
          );
          if (dataChange) dataChange(data.data);
        } catch (error) {
          setDataList([]);
        }
        setLoading(false);
      }, 50);
    };

    useEffect(() => {
      setPage(1);
      if (defaultRequest || JSON.stringify(requestData) !== '{}') {
        getListData(1, pageLimit);
      } else {
        setListTotal(0);
        setDataList([]);
      }
    }, [requestData]);
    useEffect(() => {
      if (defaultRequest || JSON.stringify(requestData) !== '{}') {
        getListData(page, pageLimit);
      }
    }, [sorter.field, sorter.order]);

    const isEditing = (record: any) => record.id === isEditKey;

    // 为每列添加额为属性与方法
    const columns = defaultColumns.map((col: any) => {
      if (!col?.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          min: col.min,
          max: col.max,
          rowEditing: isEditing(record),
        }),
      };
    });
    // 单元格编辑组件
    function EditableCell({
      title,
      editable,
      children,
      dataIndex,
      rowEditing,
      ...restProps
    }: any) {
      let childNode = children;
      if (rowEditing) {
        childNode = editable ? (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[{ required: true, message: `${title}不能为空` }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <div className="editable-cell-value-wrap" aria-hidden="true">
            {children}
          </div>
        );
      }
      return <td {...restProps}>{childNode}</td>;
    }
    // 表格变化
    const tabOnChange = (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: any,
    ) => {
      if (sorter?.columnKey !== 'sorter') {
        setSorter({ field: sorter.field, order: sorter.order });
      }
    };

    const components = {
      body: {
        cell: EditableCell,
      },
    };
    return (
      <Form form={rowForm} component={false}>
        <Table
          size="small"
          showSorterTooltip={false}
          pagination={{
            pageSize: pageLimit,
            showQuickJumper: true,
            current: page,
            total: listTotal,
            showSizeChanger: true,
            showTotal: (total) => `总共${total}条`,
            onChange: (page, size) => {
              if (size === pageLimit) {
                setPage(page);
                getListData(page, pageLimit);
              }
            },
            onShowSizeChange: (current, size) => {
              setPage(1);
              setPageLimit(size);
              getListData(1, size);
            },
          }}
          dataSource={dataList}
          loading={loading}
          columns={columns.map((res) => {
            if (!res.render) {
              res.render = (text: any) => text || '--';
            }
            return res;
          })}
          onChange={tabOnChange}
          {...props}
          components={components}
        />
      </Form>
    );
  },
);
