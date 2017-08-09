'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactRouter = require('react-router');

var TableComponent = (function (_React$Component) {
	_inherits(TableComponent, _React$Component);

	function TableComponent() {
		_classCallCheck(this, TableComponent);

		_get(Object.getPrototypeOf(TableComponent.prototype), 'constructor', this).call(this);
		this.state = {
			tableData: [],
			loading: false,
			rowSelection: {},
			columnsJsonObj: [],
			filteredInfo: null,
			columnsDataList: null,
			inputJSONState: null,
			noOfRecords: null,
			scrollData: null,
			pagination: null,
			bordered: null,
			title: 'Table Component',
			footer: 'Table footer',
			showHeader: null,
			size: 'default'
		};
	}

	_createClass(TableComponent, [{
		key: 'componentWillMount',
		value: function componentWillMount() {

			this.setState({ scrollData: this.props.scrollData });
			this.setState({ noOfRecords: this.props.noOfRecords });
			this.setState({ pagination: this.props.pagination });
			this.setState({ bordered: this.props.bordered });
			this.setState({ title: this.props.title });
			this.setState({ footer: this.props.footer });
			this.setState({ showHeader: this.props.showHeader });
			this.setState({ size: this.props.size });
			this.setState({ tableJSONData: this.props.tableJSONData });
			this.setState({ columnsDataList: this.props.tableColumnList });

			var columnsList = [];
			var columnValueList = [];
			var columnFilterTableList = [];
			var tableFirstRow = this.props.tableJSONData[0];
			this.tableFilterData = this.props.tableJSONData;
			var filterData = [];
			var emptyData = [];

			var as = Object.assign;
			var filterResult = this.props.tableJSONData.map(function (item) {

				var dataArray = [];
				for (var i in item) {
					if (item.hasOwnProperty(i)) {
						var first = item[i];
						//	if(first != null)
						dataArray.push(first);
					}
				}

				return dataArray;
			}).reduce(function (acc, current) {
				var returnData = [];

				for (var index in current) {
					returnData.push(as({}, acc[index], _defineProperty({}, current[index], current[index])));
					emptyData.push({});
				}

				return returnData;
			}, emptyData);

			if (tableFirstRow != null) {
				for (var key in tableFirstRow) {
					var rowKey = key;
					var rowValue = tableFirstRow[key];
					columnValueList.push(rowValue);
					columnsList.push(rowKey);
				}
				var headerJsonObj = [];
				for (var key in columnsList) {
					var header = {};

					for (var data in filterResult[key]) {
						var testdata = {};
						testdata["text"] = data;
						testdata["value"] = data;
						filterData.push(testdata);
					}

					var link = "text => <a>{text}</a>";
					header["title"] = columnsList[key];
					header["dataIndex"] = columnsList[key];
					//	header ["width"] = this.state.scrollData;
					header["filters"] = filterData;
					//	header ["render"] = "<a></a>";
					//	header["render: text => <a>{text}</a>"]
					//	header ["key"] = columnsList[key];
					//	header ["filteredValue"] = "filteredInfo."+columnsList[key];

					headerJsonObj.push(header);
					filterData = [];
				}
				this.setState({ columnsJsonObj: headerJsonObj });
			} else {
				//To Do
				alert("Invalid DataSet");
			}
		}
	}, {
		key: 'render',
		value: function render() {

			var tableData = _react2['default'].createElement(_antd.Table, _extends({}, this.state, {
				columns: this.state.columnsJsonObj,
				dataSource: this.props.tableJSONData,
				pagination: {
					pageSize: this.state.noOfRecords
				}

			}));

			var filteredInfo = this.state.filteredInfo;

			filteredInfo = filteredInfo || {};

			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(
					'div',
					null,
					this.state.tableData ? tableData : 'Invalid DataSet'
				)
			);
		}
	}]);

	return TableComponent;
})(_react2['default'].Component);

exports['default'] = TableComponent;
module.exports = exports['default'];