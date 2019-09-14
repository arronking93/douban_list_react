import React from 'react'
import itemStyles from '../../css/movie_item.scss'

// 引用UI设计评分
import {Rate} from 'antd'
import {Link} from 'react-router-dom'

export default class MovieItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return <Link className={itemStyles.box} to={`/movie/detail/${this.props.id}`}>
			<div className={itemStyles.play}>
				<img className={itemStyles.img} src={this.props.images.small} alt=""/>
				<h3 className={itemStyles.title}>名称：{this.props.title}</h3>
			</div>
			<div className={itemStyles.info}>
				<p className={itemStyles.item}>上映年份：{this.props.year}年</p>
				<p className={itemStyles.item}>电影类型：{this.props.genres.join(' ')}</p>
				<Rate disabled allowHalf defaultValue={Math.floor(this.props.rating.average)/2}/>
				<p className={itemStyles.item}>评分：{this.props.rating.average}分</p>
			</div>
		</Link>
	}
	
}
