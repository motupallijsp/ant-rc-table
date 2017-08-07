import React from 'react'
import {Row, Col, Table, Alert, Icon} from 'antd';
import {Spin} from 'antd';
import {message, notification} from 'antd';


const title = () => '';
const showHeader = true;
const footer = () => '';
const scroll = { y: 240 };

// This is the component for giving the dynamic rows and columns

export default class TableComponent extends React.Component {

 constructor() {
  super();
  this.state = {
   tableData: [],
   bordered: true,
    loading: false,
    pagination: true,
    size: 'default',
    title,
    showHeader,
    footer,
    rowSelection: {},
  columnsJsonObj : [],
  noOfRecords : 5,
  scrollData : 240,
  filteredInfo: null
  }
 }

 

   
 componentWillMount() {
   
  this.setState( { tableData : this.props.tableJSONData });
    
  var columnsList = [];
  var columnValueList = [];
  var columnFilterTableList = [];
  var tableFirstRow = this.props.tableJSONData[0];

   
  if(tableFirstRow != null){
    for(var key in tableFirstRow){
      var rowKey = key;
      var rowValue = tableFirstRow[key];
      columnValueList.push(rowValue);
      columnsList.push(rowKey);
    }
    var headerJsonObj = [];
    for(var key in columnsList){
       var header = {};
     var dataFilter =  [
      { text: columnValueList[key], value: columnValueList[key] }
    ];
        var link = "text => <a>{text}</a>"
      header ["title"] = columnsList[key];
      header ["dataIndex"] = columnsList[key];
      header ["width"] = 250;
      header ["filters"] = dataFilter;
      header ["key"] = columnsList[key];
      header ["filteredValue"] = "filteredInfo."+columnsList[key];
      
      headerJsonObj.push(header);
    } 
    this.setState({columnsJsonObj : headerJsonObj});
  }else{
     //To Do
     alert("Invalid DataSet")
  }
   }

 render() {
	 
	  handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters);
    this.setState({
      filteredInfo: filters
    });
  }
   
  // var data = { render: text => <a href="#">{text}</a>};
  let tableData = (<Table {...this.state}
   columns={this.state.columnsJsonObj}
   dataSource={this.props.tableJSONData}
   onChange={this.handleChange}
   pagination={{
   pageSize: this.state.noOfRecords
  }}
  
   scroll={{
   y: this.state.scrollData
  }}/>);
  
    let {  filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
  
  return (
  <div>
    <h3>Table Data Set1</h3>
    <div>
      {this.state.tableData
      ? tableData
      : 'Invalid DataSet'}
    </div> 
      </div>
  )
 }
}
