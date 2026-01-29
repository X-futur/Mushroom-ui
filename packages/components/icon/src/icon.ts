// 组件相关的属性和ts类型
import { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>,
} as const;

// 抓取类型并导出
export type IconProps = ExtractPropTypes<typeof iconProps>;
