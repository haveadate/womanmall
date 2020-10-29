/**
 * @author haveadate@qq.com
 * @date 2020年10月27日
 */

// 将backTop添加到混入
import BackTop from 'components/content/backTop/BackTop'
import {BACK_TOP_MIN_LENGTH, BACK_TOP_SPAN} from 'common/const.js'

export const backTop = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, BACK_TOP_SPAN)
    },
    backTopListener(position) {
      this.isShowBackTop = -position.y > BACK_TOP_MIN_LENGTH
    }
  }
}
