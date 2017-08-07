import React from 'react'
import {Row, Col, Table, Alert, Icon} from 'antd';
import {Link} from 'react-router';
import {Spin} from 'antd';
import {message, notification} from 'antd';
var Constant = require('./constants');


export default class TableComponent extends React.Component {

 constructor() {
  super();
  this.state = {
    tableData: [],
    bordered: false,
    loading: false,
    pagination: false,
    size: null,
    title : null,
    showHeader: false,
    footer: null,
    rowSelection: {},
	columnsJsonObj : [],
	noOfRecords : null,
	scrollData : null,
	filteredInfo: null
  }
 }

 
 handleChange = (pagination, filters) => {
    this.setState({
      filteredInfo: filters
    });
  }
   
 componentWillMount() {

	this.setState( { scrollData : Constant.scrollData });
	this.setState( { noOfRecords : Constant.noOfRecords });
	this.setState( { pagination : Constant.pagination });
	this.setState( { bordered : Constant.bordered });
	this.setState( { title : Constant.title });
	this.setState( { footer : Constant.footer });
	this.setState( { showHeader : Constant.showHeader });
	this.setState( { size : Constant.size });
    this.setState( { tableData : this.props.tableJSONData });
    
	var columnsList = [];
	var columnValueList = [];
	var columnFilterTableList = [];
	var tableFirstRow = this.props.tableJSONData[0];
	var tableFilterData = this.props.tableJSONData;
    var filterData  = [];
	var emptyData = [];

    const as = Object.assign
    const filterResult = this.props.tableJSONData.map(item => {

			var dataArray = [];
			for (var i in item) {
			if (item.hasOwnProperty(i)) {
				var first = item[i];
				dataArray.push(first);
				}
			}

		return dataArray;
	 })
	.reduce((acc, current) => {
		var returnData = [];
		
		for(var index in current ){
			 returnData.push( as({}, acc[index], {[current[index]]: current[index]}));	
			 emptyData.push({});
		}

	  return returnData
	},emptyData)


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
	   
			for(var data in filterResult[key] ){
				var testdata = {};	
				testdata ["text"] = data;
				testdata ["value"] = data;
				filterData.push(testdata);
			}
		   
		    var link = "text => <a>{text}</a>"
			header ["title"] = columnsList[key];
			header ["dataIndex"] = columnsList[key];
			header ["width"] = Constant.scrollData;
			header ["filters"] = filterData;
		//	header ["render"] = "<a></a>";
		//	header["render: text => <a>{text}</a>"]
		//	header ["key"] = columnsList[key];
		//	header ["filteredValue"] = "filteredInfo."+columnsList[key];
			
			headerJsonObj.push(header);
			filterData = [];
		}	
		this.setState({columnsJsonObj : headerJsonObj});
	}else{
	   //To Do
	   alert("Invalid DataSet")
	} 
   }

 render() {
	 
	
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
	
		<div>
			{this.state.tableData
			? tableData
			: 'Invalid DataSet'}
		</div> 
      </div>
  )
 }
}
