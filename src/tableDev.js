import React from 'react'
import {Row, Col, Table, Alert, Icon} from 'antd';
import {Spin} from 'antd';
import {message, notification} from 'antd';


export default class TableComponent extends React.Component {

// This is React js constructor to set the varible delcaration and initliazation
 constructor() {
  super();
  this.state = {
    tableData: [],
    loading: false,
    rowSelection: {},
	columnsJsonObj : [],
	filteredInfo: null,
	columnsDataList : null,
	inputJSONState : null,
    noOfRecords: null,
    scrollData : null,
    pagination: null,
    bordered: null,
	title:'Table Component',
	footer: 'Table footer',
	showHeader: null,
	size:'default'		
  }
 }
   // This is componentWillMount() method. its set the default values
 componentWillMount() {

	this.setState( { scrollData : this.props.scrollData });
	this.setState( { noOfRecords : this.props.noOfRecords });
	this.setState( { pagination : this.props.pagination });
	this.setState( { bordered : this.props.bordered });
	this.setState( { title : this.props.title });
	this.setState( { footer : this.props.footer });
	this.setState( { showHeader : this.props.showHeader });
	this.setState( { size : this.props.size });
    this.setState( { tableJSONData : this.props.tableJSONData });
	this.setState( { columnsDataList : this.props.tableColumnList });
    
	var columnsList = [];
	var columnValueList = [];
	var columnFilterTableList = [];
	var tableFirstRow = this.props.tableJSONData[0];
     this.tableFilterData = this.props.tableJSONData;
    var filterData  = [];
	var emptyData = [];

    const as = Object.assign
    const filterResult = this.props.tableJSONData.map(item => {

			var dataArray = [];
			for (var i in item) {
			if (item.hasOwnProperty(i)) {
				var first = item[i];
			//	if(first != null)
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
		//	header ["width"] = this.state.scrollData;
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
   pagination={{
   pageSize: this.state.noOfRecords
  }}
  
   />);
  
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
