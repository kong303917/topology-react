import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { Avatar, Pagination } from 'antd';

import { list } from '@/services/topology';
import styles from './index.less';

class Index extends React.Component<{}> {

  state = {
    data: {
      list: [],
      count: 0
    },
    search: {
      pageIndex: 1,
      pageCount: 8
    }
  };

  componentDidMount() {
    this.getList();
  }

  async getList(page?: number) {
    const data = await list(page || this.state.search.pageIndex, this.state.search.pageCount);
    this.setState({
      data
    });
  }

  handlePage = (page: number) => {
    this.setState({
      search: {
        pageIndex: page,
        pageCount: 8
      }
    });

    this.getList(page);
  }

  open(data: any) {
    router.push({
      pathname: '/workspace',
      query: {
        id: data.id,
      },
    });
  }

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.nav}>
          <label>热门图文</label>
        </div>
        <div className="flex wrap">
          {this.state.data.list.map((item: any, index) => {
            return (
              <div className={styles.topo} key={index} onClick={() => { this.open(item) }}>
                <div className={styles.image}>
                  <img src={item.image} />
                </div>
                <div className="ph15 pv10">
                  <div className={styles.title} title={item.name}>{item.name}</div>
                  <div className={styles.desc} title={item.desc}>{item.desc}</div>
                  <div className="flex mt5">
                    <div className="full flex middle">
                      <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="small">
                        {item.username[0]}
                      </Avatar>
                      <span className="ml5">{item.username}</span>
                    </div>
                    <div>
                      <span className="hover pointer mr15" title="赞">
                        <i className={item.stared ? 'iconfont icon-appreciatefill' : 'iconfont icon-appreciate'} />
                        <span className="ml5">{item.star || 0}</span>
                      </span>
                      <span className="hover pointer" title="收藏">
                        <i className={item.favorited ? 'iconfont icon-likefill' : 'iconfont icon-like'} />
                        <span className="ml5">{item.hot || 0}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div>
          <Pagination defaultPageSize={8} current={this.state.search.pageIndex} total={this.state.data.count} onChange={this.handlePage} />
        </div>
      </div>
    );
  }
}

export default connect((state: any) => ({ event: state.event }))(Index);