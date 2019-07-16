import React, { Component } from "react";
import { connect } from "react-redux";
import Topic from "./components/Topic";
import List from "./components/List";
import Writer from "./components/Writer";
import Recommend from "./components/Recommend";
import DownloadApp from "./components/DownloadApp";
import { actionCreators } from "./store";

import { HomeWrapper, HomeLeft, HomeRight, BackTop } from "./style";

class Home extends Component {
  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.props.changeScrollTopShow);
  }

  bindEvents() {
    window.addEventListener("scroll", this.props.changeScrollTopShow);
  }

  handleScrollTop() {
    window.scrollTo(0, 0);
  }

  render() {
    const { showScroll } = this.props;

    return (
      <HomeWrapper>
        <HomeLeft>
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <DownloadApp />
          <Writer />
        </HomeRight>
        {showScroll ? (
          <BackTop onClick={this.handleScrollTop}>顶部</BackTop>
        ) : null}
      </HomeWrapper>
    );
  }
}

const mapState = state => ({
  showScroll: state.getIn(["home", "showScroll"]),
  bannerList: state.getIn(["home", "bannerList"]),
  isHover: state.getIn(["home", "isHover"])
});

const mapDispatch = dispatch => ({
  changeHomeData() {
    dispatch(actionCreators.getHomeInfo());
  },
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 300) {
      dispatch(actionCreators.toggleTopShow(true));
    } else {
      dispatch(actionCreators.toggleTopShow(false));
    }
  },

  mouseEnter() {
    dispatch(actionCreators.mouseEnter());
  },

  mouseLeave() {
    dispatch(actionCreators.mouseLeave());
  }
});

export default connect(
  mapState,
  mapDispatch
)(Home);
