import React from 'react'

// 按需引入antd进行布局
import {Layout, Menu} from 'antd';

const {Content, Sider} = Layout;

// 引入路由
import {Route, Link, Switch} from "react-router-dom";
// 引入路由对应的组件（结构一样，合并唯一）
import MovieShow from './MovieShow.jsx'
// 引入单个电影详细内容的组件
import MovieItemDetail from './MovieItemDetail.jsx'

export default class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return <Layout style={{height: "100%"}}>
			<Sider width={200} style={{background: '#fff'}}>
				<Menu
						mode="inline"
						defaultSelectedKeys={[window.location.hash.split('/')[2]]}
						style={{height: '100%', borderRight: 0}}
				>
					<Menu.Item key="in_theaters" style={{marginTop: 0}}>
						<Link to='/movie/in_theaters/1'>正在上映</Link>
					</Menu.Item>
					<Menu.Item key="coming_soon">
						<Link to='/movie/coming_soon/1'>即将上映</Link>
					</Menu.Item>
					<Menu.Item key="top250">
						<Link to='/movie/top250/1'>Top250</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout style={{paddingLeft: '1px'}}>
				<Content
						style={{
							background: '#fff',
							padding: 10,
							margin: 0,
							minHeight: 280,
							overflow: 'auto',
						}}
				>
					<Switch>
						<Route path='/movie/detail/:id' component={MovieItemDetail}></Route>
						<Route path='/movie/:type/:page' component={MovieShow}></Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	}
}
