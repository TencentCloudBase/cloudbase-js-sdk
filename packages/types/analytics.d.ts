// report 接口传参结构
export interface IReportData {
    report_type: string, // 上报场景  如电商 mall，游戏 game
    report_data: {
        action_time?: number, // 非必填  行为发生时，客户端的时间点，单位s
        action_type: string, // 必填 行为类型 如 访问 visit_store，分享 share，加入购物车 add_to_cart等
        click_id?: string, // 非必填  广告平台会在URL增加click_id
        action_param?: { // 非必填
            value?: number, // 非必填 行为所带的参数，转化行为价值（例如金额）
            leads_type?: string // 非必填 行为来源，目前支持PHONE（电话直呼），RESERVE（表单预约）
        },
        product_param?: { // 非必填
            product_yun_type?: string, // 非必填  商品 goods ，优惠券 coupon, 搜索词 search_term
            product_yun_id?: string, // 非必填 商品id
            product_yun_category?: string, // 非必填 商品类目 自定义
            product_yun_keywords?: string, // 非必填 商品关键词
            product_yun_price?: number, // 非必填 商品原价
            product_yun_value?: number, // 非必填 商品成交价
            product_yun_name?: string, // 非必填 商品名
            product_yun_id_ad?: string, // 非必填 广告商品库中商品id
            product_yun_category_ad?: string // 非必填 广告商品库中商品类目
        }
    }
}

// 上报数据结构
export interface IAnalyticsDataItem {
    analytics_scene: string, // 上报场景  如电商 mall，游戏 game
    analytics_data: { // 场景模板内容，以电商模板举例
        openid?: string, // 必填  用户openid
        wechat_mini_program_appid?: string, // 必填小程序appid
        action_time: number, // 必填  行为发生时，客户端的时间点，单位s
        action_type: string, // 必填 行为类型 如 访问 visit_store，分享 share，加入购物车 add_to_cart等
        click_id?: string, // 非必填  广告平台会在URL增加click_id
        action_param?: { // 非必填
            value?: number, // 非必填 行为所带的参数，转化行为价值（例如金额）
            leads_type?: string // 非必填 行为来源，目前支持PHONE（电话直呼），RESERVE（表单预约）
        },
        product_param?: { // 非必填
            product_yun_type?: string, // 非必填  商品 goods ，优惠券 coupon, 搜索词 search_term
            product_yun_id?: string, // 非必填 商品id
            product_yun_category?: string, // 非必填 商品类目 自定义
            product_yun_keywords?: string, // 非必填 商品关键词
            product_yun_price?: number, // 非必填 商品原价
            product_yun_value?: number, // 非必填 商品成交价
            product_yun_name?: string, // 非必填 商品名
            product_yun_id_ad?: string, // 非必填 广告商品库中商品id
            product_yun_category_ad?: string // 非必填 广告商品库中商品类目
        }
    }
}