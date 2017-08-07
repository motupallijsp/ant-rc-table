<br />
<div align="center">
  <a href="https://github.com/react-tools/react-table" target="\_parent"><img src="https://github.com/react-tools/media/raw/master/logo-react-table.png" alt="React Table Logo" style="width:450px;"/></a>
  <br />
</div>

# React Table
`react-table` is a **lightweight, fast and extendable datagrid** built for React

## Table of Contents
- [Installation](#installation)
- [Example](#example)
- [Data](#data)
- [Props](#props)
- [Columns](#columns)
- [Column Header Groups](#column-header-groups)
- [Custom Cell and Header and Footer Rendering](#custom-cell-header-and-footer-rendering)
- [Styles](#styles)
- [Custom Props](#custom-props)
- [Pivoting and Aggregation](#pivoting-and-aggregation)
- [Sub Tables and Sub Components](#sub-tables-and-sub-components)
- [Server-side Data](#server-side-data)
- [Fully Controlled Component](#fully-controlled-component)
- [Functional Rendering](#functional-rendering)
- [Multi-Sort](#multi-sort)
- [Filtering](#filtering)
- [Component Overrides](#component-overrides)
- [Contributing](#contributing)
- [Scripts](#scripts)
- [Used By](#used-by)

## Installation
1. Install React Table as a dependency
```bash
$ yarn add ant-rc-table
```
2. Import the `ant-rc-table` module
```javascript
// ES6
import ReactTable from 'ant-rc-table'
// ES5
```
3. Import styles by including `react-table.css`
```javascript
// JS (Webpack)
```
##### CDN
```html
  <!-- CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/2.12.4/antd.css">

```
## Example
```javascript
import ReactTable from 'ant-rc-table'

render() {
  const data = [{
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },{
    ...
  }]

  const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }]

  <ReactTable
    tableJSONData={columns}
  />
}
```

## Data
Simply pass the `data` prop anything that resembles an array or object. Client-side sorting and pagination are built in, and your table will update gracefully as you change any props. [Server-side data](#server-side-data) is also supported!


## Props
These are all of the available props (and their default values) for the main `<ReactTable />` component.