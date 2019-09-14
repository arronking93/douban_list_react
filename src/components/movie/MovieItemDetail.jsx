import React from 'react'

// 引入antd的UI
import {Spin, Alert, Button, Icon} from 'antd';

// 引入跨域请求
import fetchJSONP from 'fetch-jsonp';

const rootAPI = 'https://api.douban.com/v2/movie/';
const AK2 = '?apikey=0df993c66c0c636e29ecbb5344252a4a';

export default class MovieItemDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: {}
		};
		console.log(props);
	}
	
	componentWillMount() {
		this.getAndSetDetailData(this.props.location.pathname.replace('/movie/detail', 'subject'));
	}
	
	render() {
		return <div>
			{this.loadingDetailShow()}
		</div>
	}
	
	/* 自定义的方法 */
	// 根据id或subStr获取数据
	getAndSetDetailData1 = (id = 1) => {
		const data = require(`../test_data/detail.json`);
		this.setState({
			isLoading: true
		});
		setTimeout(() => {
			console.log(data);
			this.renderDetailData(data);
		}, 300);
	};
	
	getAndSetDetailData = (subStr) => {
		this.setState({
			isLoading: true
		});
		fetchJSONP(rootAPI + subStr + AK2).then(res => res.json()).then((data) => {
			console.log(data);
			this.renderDetailData(data);
		});
	};
	
	
	// 根据获取到的数据设置state，将通过render自动同步到页面上
	renderDetailData = (data) => {
		this.setState({
			movie: data,
			isLoading: false,
		});
	};
	
	// render调用的渲染逻辑函数
	loadingDetailShow = () => {
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
				<Button type="primary" onClick={this.goBack}>
					<Icon type="left"/>
					Backward
				</Button>
				<div style={{textAlign: "center"}}>
					<h1>{this.state.movie.title}</h1>
					<img src={this.state.movie.images.large} alt=""/>
				</div>
				<p style={{textIndent: "2em"}}>{this.state.movie.summary}</p>
			</div>
		}
	};
	
	goBack = () => {
		this.props.history.go(-1);
	};
}