import React from 'react'

// 引入antd的UI
import {Spin, Alert, Pagination} from 'antd';

// 引入跨域请求
import fetchJSONP from 'fetch-jsonp';

import MovieItem from './MovieItem.jsx'

const rootAPI = 'https://api.douban.com/v2/movie/';
const AK = '&apikey=0df993c66c0c636e29ecbb5344252a4a';

export default class OnShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			currentType: props.match.params.type || 'in_theaters',
			currentPage: parseInt(props.match.params.page || 1),
			pageSize: 20,
			total: 0,
			isLoading: true
		};
	}
	
	componentWillMount() {
		this.getAndSetData(this.props.match.params.type);
	}
	
	render() {
		return <div>
			{this.loadingShow()}
		</div>
	}
	
	componentWillReceiveProps(nextProps, nextContent) {
		this.getAndSetData(nextProps.match.params.type, nextProps.match.params.page);
	}
	
	/* 自定义的方法 */
	// 根据type和page获取数据
	getAndSetData = (type, page = 1) => {
		const data = require(`../test_data/${type}.json`);
		this.setState({
			isLoading: true
		});
		setTimeout(() => {
			console.log(data);
			this.renderData(data, type, page);
		}, 300);
	};
	
	getAndSetData1 = (type, page = 1) => {
		this.setState({
			isLoading: true
		});
		let start = this.state.pageSize * (page - 1);
		let link = `${type}?start=${start}&count=${this.state.pageSize}`;
		fetchJSONP(rootAPI + link + AK).then(res => res.json()).then((data) => {
			console.log(data);
			this.renderData(data, type, page);
		});
	};
	
	
	// 根据获取到的数据设置state，将通过render自动同步到页面上
	renderData = (data, type, page) => {
		this.setState({
			movies: data.subjects,
			total: data.total,
			isLoading: false,
			currentType: type,
			currentPage: page
		});
	};
	
	// render调用的渲染逻辑函数
	loadingShow = () => {
		if (this.state.isLoading) {
			return <Spin tip="Loading...">
				<Alert
						message="数据加载中"
						description="精彩内容，马上呈现..."
						type="info"
				/>
			</Spin>
		} else {
			return <div>
				<div style={{display: "flex", flexWrap: "wrap"}}>
					{this.state.movies.map(item => {
						return <MovieItem {...item} key={item.id}></MovieItem>
					})}
				
				</div>
				<Pagination defaultCurrent={this.state.currentPage} total={this.state.total} pageSize={this.state.pageSize}
										onChange={this.pageChanged}/>
			</div>
		}
	};
	
	// 分页后点击页面触发的函数
	pageChanged = (count) => {
		this.props.history.push(`/movie/${this.state.currentType}/${count}`);
		
	}
}
