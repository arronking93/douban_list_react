// 项目的根组件

import React from 'react'

// antd实现布局
import {Layout, Menu} from 'antd';

const {Header, Content, Footer} = Layout;
// 引入logo样式
import styles from './css/app.scss'

// 引入路由
import {HashRouter as Router, Route, Link} from "react-router-dom"

// 引入路由对应的组件
import HomeContainer from './components/home/HomeContainer.jsx'
import MovieContainer from './components/movie/MovieContainer.jsx'
import AboutContainer from './components/about/AboutContainer.jsx'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return <Router>
			<Layout className="layout" style={{height: "100%"}}>
				<Header>
					<div className={styles.logo}/>
					<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={[window.location.hash.split('/')[1]]}
							style={{lineHeight: '64px'}}
					>
						
						<Menu.Item key="home">
							<Link to="/home">首页</Link>
						</Menu.Item>
						<Menu.Item key="movie">
							<Link to="/movie/in_theaters/1">电影</Link>
						</Menu.Item>
						<Menu.Item key="about">
							<Link to="/about">关于</Link>
						</Menu.Item>
					
					</Menu>
				</Header>
				<Content style={{background: '#fff'}}>
					<Route path="/home" component={HomeContainer}></Route>
					<Route path="/movie" component={MovieContainer}></Route>
					<Route path="/about" component={AboutContainer}></Route>
				</Content>
				<Footer style={{textAlign: 'center'}}>传智播客 ©2019 兵马大元帅</Footer>
			</Layout>
		</Router>
	}
}
