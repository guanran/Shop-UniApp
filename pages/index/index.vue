<template>
	<view class="index">

		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="请输入搜索关键字" @click="navToSeach()" disabled />
		</view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in swiperList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
					<image :src="item.sImg" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item">
				<image src="/static/temp/c6.png"></image>
				<text>潮玩盲盒</text>
			</view>
			<view class="cate-item">
				<image src="/static/temp/c3.png"></image>
				<text>免费放送</text>
			</view>
			<view class="cate-item">
				<image src="/static/temp/c8.png"></image>
				<text>好物团购</text>
			</view>
			<view class="cate-item">
				<image src="/static/temp/c7.png"></image>
				<text>天天乐玩</text>
			</view>
		</view>



		<!--新闻通知-->
		<rf-swiper-slide :list="announceList">
			<view slot="header" class="swiper-slide-header">
				<image class="swiper-slide-image" src="/static/news.png"></image>
			</view>
		</rf-swiper-slide>
		
		<!--新品上市-->
		<rf-floor-index :list="newProductList" @toBanner="indexTopToDetailPage" @toList="toProductList({is_new: 1})" :header="{title: '新品上市', desc: 'New Products Listed'}"
		 @detail="navToDetailPage" :banner="carouselList.index_new && carouselList.index_new[0]" />
		<!--推荐商品-->
		<rf-floor-index :list="recommendProductList" :header="{title: '推荐商品', desc: 'Recommend Product'}" @toBanner="indexTopToDetailPage"
		 @toList="toProductList({is_recommend: 1})" @detail="navToDetailPage" :banner="carouselList.index_recommend && carouselList.index_recommend[0]" />
		<!--热门商品-->
		<rf-floor-index :list="hotProductList" :header="{title: '热门商品', desc: 'Hot Product'}" @toBanner="indexTopToDetailPage"
		 @toList="toProductList({is_hot: 1})" @detail="navToDetailPage" :banner="carouselList.index_hot && carouselList.index_hot[0]" />
		<!--猜你喜欢-->
		<rf-floor-index :list="guessYouLikeProductList" :header="{title: '猜你喜欢', desc: 'Guess You Like It'}" @toList="toProductList({guessYouLike: 1})"
		 @detail="navToDetailPage" :bannerShow="false" />
		<!--网站备案号-->
		<!--#ifdef H5-->
		<view class="copyright" v-if="config.web_site_icp">
			{{ config.copyright_desc }} <a href='http://www.beian.miit.gov.cn'>{{ config.web_site_icp }}</a>
		</view>

		<!--商户切换-->
		<!--<view class="uni-title uni-common-pl">商户切换</view>-->
		<!--<view class="uni-list">-->
		<!--<view class="uni-list-cell">-->
		<!--<view class="uni-list-cell-left">-->
		<!--当前选择-->
		<!--</view>-->
		<!--<view class="uni-list-cell-db">-->
		<!--<picker @change="bindPickerChange" range-key="title" :value="index" :range="merchantList">-->
		<!--<view class="uni-input">{{merchantList[index] && merchantList[index].title}}</view>-->
		<!--</picker>-->
		<!--</view>-->
		<!--</view>-->
		<!--</view>-->
		<!--#endif-->

		<!--页面加载动画-->
		<rf-loading v-if="loading"></rf-loading>
	</view>
</template>
<script>
	/**
	 * @des 微商城首页
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-01-08 14:14
	 * @copyright 2019
	 */

	import {
		indexList,
		carouselList,
		wholesaleProductIndex
	} from "@/api/product";
	import {
		merchantIndex
	} from "@/api/merchant";
	import rfSwipeDot from '@/components/rf-swipe-dot/rf-swipe-dot';
	import rfFloorIndex from '@/components/rf-floor-index/rf-floor-index';
	import rfSearchBar from '@/components/rf-search-bar/rf-search-bar';
	import rfSwiperSlide from '@/components/rf-swiper-slide/rf-swiper-slide';
	import {
		notifyAnnounceIndex
	} from "@/api/basic";
	export default {
		components: {
			rfFloorIndex,
			rfSwipeDot,
			rfSearchBar,
			rfSwiperSlide
		},
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				swiperList: [],
				goodsList: [],

				current: 0,
				headerShow: true,
				carouselList: {},
				hotProductList: [],
				recommendProductList: [],
				guessYouLikeProductList: [],
				newProductList: [],
				brandList: [],
				config: {},
				index: 0,
				merchantList: [],
				announceList: [], //首页新闻滚动条
				loading: true,
				hotSearchDefault: '请输入关键字',
			};
		},
		// onLoad() {
		// 	this.initData();
		// },
		onShow() {
			if (uni.getStorageSync('accessToken') && uni.getStorageSync('cartNum')) {
				if (uni.getStorageSync('cartNum') == 0) {
					uni.removeTabBarBadge({
						index: 2
					});
				} else {
					uni.setTabBarBadge({
						index: 2,
						text: uni.getStorageSync('cartNum').toString(),
					});
				}
			}
			this.loading = true;
			this.initData();
		},
		onShareAppMessage() {
			return {
				title: '欢迎来到乐玩商城',
				path: `/pages/index/index`
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getIndexList('refresh');
		},
		// onLoad() {
		// 	this.loadData();
		// },
		methods: {
			//跳转查询页面
			navToSeach() {
				uni.navigateTo({
					url: '/pages/index/search/search'
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].sBackGround;
			},

			// 监听切换商户
			bindPickerChange(e) {
				uni.setStorageSync('merchantId', this.merchantList[e.target.value].id);
				uni.setStorageSync('merchantIndex', e.target.value);
				this.index = e.target.value;
				uni.removeStorage({
					key: 'userInfo'
				})
				uni.removeStorage({
					key: 'accessToken'
				})
				this.getIndexList();
			},
			// 监听轮播图切换
			handleDotChange(e) {
				this.current = e.detail.current
			},
			// 数据初始化
			initData() {
				uni.removeStorageSync('cateTop');
				this.getIndexList();
			},
			// 跳转至商品分类列表(分类id)
			navToList(id) {
				uni.navigateTo({
					url: `/pages/product/list?cate_id=${id}`
				})
			},
			// 跳转
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			// 跳至广告图指定页面
			indexTopToDetailPage(data, link) {
				let url;
				let type;
				let id;
				if (!link) {
					type = data.type;
					id = data.id;
				} else {
					id = link;
					type = data;
				}
				switch (type) {
					case 'product_view':
						url = `/pages/product/product?id=${id}`;
						break;
					case 'article_view':
						this.$api.msg('article_view');
						break;
					case 'coupon_view':
						url = `/pages/user/coupon/detail?id=${id}`;
						break;
					case 'helper_view':
						this.$api.msg('helper_view');
						break;
					case 'product_list_for_cate':
						url = `/pages/product/list?cate_id=${id}`;
						break;
					default:
						break;
				}
				if (url) {
					uni.navigateTo({
						url,
					})
				}
			},
			// 跳转至商品分类列表(参数)
			toProductList(params) {
				uni.navigateTo({
					url: `/pages/product/list?params=${JSON.stringify(params)}`
				})
			},
			// 获取主页数据
			async getIndexList(type) {
				await this.$get(`${indexList}`, {}).then(async r => {
					this.loading = false;
					// // 获取商户列表
					// this.getMerchantIndex();
					// 获取公告列表
					//this.getNotifyAnnounceIndex();
					
					
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}

					//获取轮播图
					this.getSwiperList();

					// 静态数据
					let goodsList = await this.$api.json('goodsList');
					this.goodsList = goodsList || [];
					// 静态数据end

					this.productCateList = r.data.cate;
					this.carouselList = r.data.adv;
					this.search = r.data.search;
					uni.setStorageSync('search', this.search);
					this.hotSearchDefault = '请输入关键字' + (r.data.search.hot_search_default ? '如:' + r.data.search.hot_search_default :
						'');
					uni.setStorage({
						key: 'hotSearchDefault',
						data: r.data.search.hot_search_default
					});
					this.hotProductList = r.data.product_hot;
					this.recommendProductList = r.data.product_recommend;
					this.guessYouLikeProductList = r.data.guess_you_like;
					this.newProductList = r.data.product_new;
					this.config = r.data.config;
				}).catch(err => {
					this.loading = false;
					console.log(err);
				})






			},
			// 获取商户列表
			async getMerchantIndex() {
				await this.$get(`${merchantIndex}`, {}).then(r => {
					this.merchantList = r.data
					this.index = uni.getStorageSync('merchantIndex') || r.data.length - 1;
				})
			},
			// 获取通知列表
			async getNotifyAnnounceIndex() {
				// await this.$get(`${notifyAnnounceIndex}`, {}).then(r => {
				// 	this.announceList = r.data
				// })
			},
			//获取 轮播图  通知列表
			async getSwiperList() {
				uni.request({
					url: 'http://192.168.5.13:8098/indexapi/indexlist',
					method: 'GET',
					data: {},
					success: res => {
						//轮播图
						let swiperList = res.data.TData.bannerList;
						this.titleNViewBackground = swiperList[0].sBackGround;
						this.swiperLength = swiperList.length;
						this.swiperList = swiperList;
						//通知列表
						this.announceList = res.data.TData.announceList;
						
					},
					fail: () => {},
					complete: () => {}
				});


				// await this.$get(`${carouselList}`, {}).then(r => {
				// 	console.log(r);
				// 	let carouselList = r.data.TData;
				// 	this.titleNViewBackground = carouselList[0].background;
				// 	this.swiperLength = carouselList.length;
				// 	this.carouselList = carouselList;
				// })
			},


			// 跳转至商品详情页
			navToDetailPage(data) {
				const {
					id
				} = data;
				if (!id) return;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			// 跳转至搜索详情页
			toSearch() {
				uni.navigateTo({
					url: `/pages/index/search/search?search=${JSON.stringify(this.search)}`
				})
			},
			// 跳转至分类页
			toCategory() {
				uni.reLaunch({
					url: `/pages/category/category`
				})
			}
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
			this.navToSeach();
		},


		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			const cpage = this;
			if (index === 0) {
				cpage.$api.msg('点击了扫描');
				uni.scanCode({
					success: function(res) {
						console.log('类型：' + res.scanType);
						console.log('内容：' + res.result);

						cpage.$api.msg("(" + res.result + ")" + '不是有效内容');
					}
				})

			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
	}
</script>
<style lang="scss" scoped>
	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 5;
			border-radius: 16upx 16upx 0 0;
			margin-top: -20upx;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */


	page {
		background: #f5f5f5;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}

	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}

	.ad-1 {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}



	.index {
		background-color: $page-color-white;

		/*轮播图*/
		.swiper {
			width: 100%;
			margin-top: 10upx;
			display: flex;
			justify-content: center;

			.swiper-box {
				width: 92%;
				height: 40vw;
				overflow: hidden;
				border-radius: 15upx;
				box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
				//兼容ios，微信小程序
				position: relative;
				z-index: 1;

				swiper {
					width: 100%;
					height: 40vw;

					swiper-item {
						image {
							width: 100%;
							height: 40vw;
						}
					}
				}
			}
		}

		/*轮播图2*/
		.swiper-item-text {
			position: absolute;
			bottom: 16upx;
			left: 30upx;
			height: 48upx;
			line-height: 48upx;
			background: rgba(0, 0, 0, 0.2);
			width: 90%;
			color: $page-color-white;
			border-bottom-left-radius: 12upx;
			padding-left: 20upx;
		}

		/*新闻通知*/
		.swiper-slide-header {
			width: 120upx;
			height: 80upx;
			line-height: 88upx;

			.swiper-slide-image {
				width: 100%;
				height: 30upx;
			}
		}

		/*分类列表*/
		.category-list {
			width: 100%;
			padding: 0 0 30upx 0;
			border-bottom: solid 2upx #f6f6f6;
			display: flex;
			flex-wrap: wrap;

			.category {
				width: 20%;
				margin-top: 50upx;
				display: flex;
				flex-wrap: wrap;

				.img {
					width: 100%;
					display: flex;
					justify-content: center;

					image {
						width: 9vw;
						height: 9vw;
					}
				}

				.text {
					margin-top: 16upx;
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 24upx;
					color: #3c3c3c;
				}
			}
		}

		/*版权显示*/
		.copyright {
			margin: 10upx 0;
			width: 100%;
			text-align: center;
			color: #666;

			a {
				display: block;
				color: #666;
				text-decoration: none;
			}
		}

		/*商户切换*/
		.uni-list {
			padding: $spacing-base 0;

			.uni-list-cell {
				.uni-input {
					padding: 0;
				}
			}
		}
	}
</style>
